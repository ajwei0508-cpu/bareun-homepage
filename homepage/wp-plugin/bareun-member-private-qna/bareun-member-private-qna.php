<?php
/**
 * Plugin Name: Bareun Member Auth & Private Disease QnA
 * Description: 바른한의원 대전본점 — 소셜 빠른 회원가입(Google·카카오톡·네이버) 및 회원 전용 1:1 비공개 질환별 Q&A · 마스터 상세열람 백엔드 API
 * Version: 1.0.0
 * Author: Bareun Medical Digital Lab
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('Bareun_Member_Private_QnA_V6_Plugin')) :
class Bareun_Member_Private_QnA_V6_Plugin {
    const TABLE_SLUG       = 'bareun_private_qna';
    const VISITS_SLUG      = 'bareun_visit_logs';
    const OPT_SEEDED       = 'bareun_private_qna_seeded_v1';
    const OPT_VISIT_SEEDED = 'bareun_visit_stats_seeded_v2';
    const OPT_VISIT_BASE   = 'bareun_visit_base_count_v2';
    const OPT_OAUTH        = 'bareun_social_oauth_config_v1';
    const OPT_BODY_NOTES      = 'bareun_body_3d_notes_v1';
    const OPT_NOTE_VIEWS      = 'bareun_body_note_views_v1';
    const OPT_NOTES_CFG       = 'bareun_body_3d_notes_cfg_v1';
    const OPT_VISIT_SCHEMA_V3 = 'bareun_visit_schema_v3';
    const OPT_GEO_BOT_STATS   = 'bareun_geo_ai_bot_stats_v1';
    const OPT_CONVERSION_LOGS = 'bareun_visit_conversions_v1';
    const OPT_ANALYTICS_CFG   = 'bareun_external_analytics_cfg_v1';
    const OPT_EXT_SYNC_CACHE  = 'bareun_ext_analytics_cache_v1';
    const CRON_HOOK_NOTES     = 'bareun_cron_2day_body_notes';

    public static function init() {
        add_filter('cron_schedules', array(__CLASS__, 'register_two_day_cron_schedule'));
        add_action('init', array(__CLASS__, 'maybe_ensure_schema'));
        add_action('init', array(__CLASS__, 'maybe_track_geo_ai_crawler'), 1);
        add_action('init', array(__CLASS__, 'maybe_schedule_body_notes_cron'));
        add_action('wp_head', array(__CLASS__, 'render_external_analytics_head_tags'), 2);
        add_action(self::CRON_HOOK_NOTES, array(__CLASS__, 'run_scheduled_two_day_note_generation'));
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
    }

    public static function register_two_day_cron_schedule($schedules) {
        if (!isset($schedules['bareun_every_two_days'])) {
            $schedules['bareun_every_two_days'] = array(
                'interval' => 172800,
                'display'  => 'Every 2 Days (Bareun 3D Body Popup Auto-Note)'
            );
        }
        return $schedules;
    }

    public static function maybe_schedule_body_notes_cron() {
        if (!wp_next_scheduled(self::CRON_HOOK_NOTES)) {
            wp_schedule_event(time() + 3600, 'bareun_every_two_days', self::CRON_HOOK_NOTES);
        }
    }

    public static function table_name() {
        global $wpdb;
        return $wpdb->prefix . self::TABLE_SLUG;
    }

    public static function visits_table_name() {
        global $wpdb;
        return $wpdb->prefix . self::VISITS_SLUG;
    }

    public static function maybe_ensure_schema() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        if (get_option(self::OPT_SEEDED) !== '1') {
            $table = self::table_name();
            $sql = "CREATE TABLE IF NOT EXISTS {$table} (
                id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
                part_id VARCHAR(32) NOT NULL DEFAULT 'lumbar',
                user_id BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
                member_name VARCHAR(100) NOT NULL DEFAULT '',
                member_email VARCHAR(160) NOT NULL DEFAULT '',
                member_phone VARCHAR(40) NOT NULL DEFAULT '',
                social_provider VARCHAR(32) NOT NULL DEFAULT 'email',
                gender VARCHAR(20) NOT NULL DEFAULT '',
                age_group VARCHAR(32) NOT NULL DEFAULT '',
                symptom_duration VARCHAR(60) NOT NULL DEFAULT '',
                title VARCHAR(255) NOT NULL DEFAULT '',
                content LONGTEXT NOT NULL,
                is_secret TINYINT(1) NOT NULL DEFAULT 1,
                secret_password VARCHAR(100) NOT NULL DEFAULT '',
                status VARCHAR(20) NOT NULL DEFAULT 'waiting',
                master_reply LONGTEXT NULL,
                client_ip VARCHAR(64) NOT NULL DEFAULT '',
                created_at DATETIME NOT NULL,
                replied_at DATETIME NULL,
                PRIMARY KEY (id),
                KEY idx_part_id (part_id),
                KEY idx_user_id (user_id),
                KEY idx_is_secret (is_secret),
                KEY idx_status (status)
            ) {$charset_collate};";

            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            dbDelta($sql);

            $count = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table}");
            if ($count === 0) {
                self::seed_initial_private_records();
            }
            update_option(self::OPT_SEEDED, '1');
        } else {
            // 컬럼 유무 확인 및 자동 추가
            $table = self::table_name();
            $cols = $wpdb->get_col("DESC {$table}", 0);
            if (is_array($cols)) {
                if (!in_array('is_secret', $cols)) {
                    $wpdb->query("ALTER TABLE {$table} ADD COLUMN is_secret TINYINT(1) NOT NULL DEFAULT 1 AFTER content");
                }
                if (!in_array('secret_password', $cols)) {
                    $wpdb->query("ALTER TABLE {$table} ADD COLUMN secret_password VARCHAR(100) NOT NULL DEFAULT '' AFTER is_secret");
                }
            }
        }

        if (get_option(self::OPT_VISIT_SEEDED) !== '1') {
            $vtable = self::visits_table_name();
            $vsql = "CREATE TABLE IF NOT EXISTS {$vtable} (
                id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
                visit_date DATE NOT NULL,
                page_slug VARCHAR(80) NOT NULL DEFAULT 'home',
                page_title VARCHAR(180) NOT NULL DEFAULT '',
                visitor_hash VARCHAR(64) NOT NULL DEFAULT '',
                client_ip VARCHAR(64) NOT NULL DEFAULT '',
                device_type VARCHAR(24) NOT NULL DEFAULT 'desktop',
                referrer VARCHAR(255) NOT NULL DEFAULT 'direct',
                user_agent VARCHAR(255) NOT NULL DEFAULT '',
                created_at DATETIME NOT NULL,
                PRIMARY KEY (id),
                KEY idx_visit_date (visit_date),
                KEY idx_page_slug (page_slug),
                KEY idx_visitor_hash (visitor_hash)
            ) {$charset_collate};";

            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            dbDelta($vsql);

            if (!get_option(self::OPT_VISIT_BASE)) {
                update_option(self::OPT_VISIT_BASE, 14820);
            }
            $vcount = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$vtable}");
            if ($vcount === 0) {
                self::seed_initial_visit_logs();
            }
            update_option(self::OPT_VISIT_SEEDED, '1');
        }

        if (get_option(self::OPT_VISIT_SCHEMA_V3) !== '1') {
            $vtable = self::visits_table_name();
            $vcols  = $wpdb->get_col("DESC {$vtable}", 0);
            if (is_array($vcols) && !empty($vcols)) {
                if (!in_array('raw_referrer', $vcols, true)) {
                    $wpdb->query("ALTER TABLE {$vtable} ADD COLUMN raw_referrer TEXT NULL AFTER referrer");
                }
                if (!in_array('landing_query', $vcols, true)) {
                    $wpdb->query("ALTER TABLE {$vtable} ADD COLUMN landing_query VARCHAR(255) NOT NULL DEFAULT '' AFTER raw_referrer");
                }
                if (!in_array('platform', $vcols, true)) {
                    $wpdb->query("ALTER TABLE {$vtable} ADD COLUMN platform VARCHAR(80) NOT NULL DEFAULT '' AFTER landing_query");
                    $wpdb->query("ALTER TABLE {$vtable} ADD INDEX idx_platform (platform)");
                }
                if (!in_array('ai_engine', $vcols, true)) {
                    $wpdb->query("ALTER TABLE {$vtable} ADD COLUMN ai_engine VARCHAR(48) NOT NULL DEFAULT '' AFTER platform");
                    $wpdb->query("ALTER TABLE {$vtable} ADD INDEX idx_ai_engine (ai_engine)");
                }
                if (!in_array('search_keyword', $vcols, true)) {
                    $wpdb->query("ALTER TABLE {$vtable} ADD COLUMN search_keyword VARCHAR(160) NOT NULL DEFAULT '' AFTER ai_engine");
                }
                // Backfill existing legacy referrer labels into granular platform labels once
                $wpdb->query("UPDATE {$vtable} SET platform = '🟢 네이버 통합검색' WHERE platform = '' AND referrer = '네이버 검색'");
                $wpdb->query("UPDATE {$vtable} SET platform = '🔍 구글 검색' WHERE platform = '' AND referrer = '구글 검색'");
                $wpdb->query("UPDATE {$vtable} SET platform = '💬 카카오톡 채팅 · 채널' WHERE platform = '' AND referrer = '카카오톡 채널'");
                $wpdb->query("UPDATE {$vtable} SET platform = '🟡 다음 · 카카오 검색' WHERE platform = '' AND referrer = '카카오·다음'");
                $wpdb->query("UPDATE {$vtable} SET platform = '📸 인스타그램' WHERE platform = '' AND referrer = '인스타그램/블로그'");
                $wpdb->query("UPDATE {$vtable} SET platform = '▶️ 유튜브' WHERE platform = '' AND referrer = 'SNS·유튜브'");
                $wpdb->query("UPDATE {$vtable} SET platform = '🏥 원내 페이지 연속탐색' WHERE platform = '' AND referrer = '원내 페이지 이동'");
                $wpdb->query("UPDATE {$vtable} SET platform = '🔗 직접 접속 · 북마크' WHERE platform = '' AND (referrer = '직접 방문' OR referrer = 'direct' OR referrer = '')");
                $wpdb->query("UPDATE {$vtable} SET platform = '🌐 외부 웹사이트 링크' WHERE platform = ''");
                update_option(self::OPT_VISIT_SCHEMA_V3, '1');
            }
        }
    }

    private static function seed_initial_visit_logs() {
        global $wpdb;
        $vtable = self::visits_table_name();
        $pages = array(
            array('slug' => 'home',               'title' => '메인 3D 스토리 쇼룸'),
            array('slug' => 'home',               'title' => '메인 3D 스토리 쇼룸'),
            array('slug' => 'home',               'title' => '메인 3D 스토리 쇼룸'),
            array('slug' => 'growth',             'title' => '바른 성장 · 성조숙증'),
            array('slug' => 'growth',             'title' => '바른 성장 · 성조숙증'),
            array('slug' => 'chuna',              'title' => '바른 추나 · 척추교정'),
            array('slug' => 'chuna',              'title' => '바른 추나 · 척추교정'),
            array('slug' => 'diet-zero',          'title' => '바른 다이어트 · 식욕ZERO'),
            array('slug' => 'diet-zero',          'title' => '바른 다이어트 · 식욕ZERO'),
            array('slug' => 'body-explorer',      'title' => '3D 인체모형 · 진료탐색'),
            array('slug' => 'ask-doctor',         'title' => '의학 인사이트 & 비공개 Q&A'),
            array('slug' => 'director',           'title' => '안정위 대표원장 · 9대검진'),
            array('slug' => 'hairloss',           'title' => '바른 탈모 · 모근재생'),
            array('slug' => 'gongjindan',         'title' => '바른 황제공진단'),
            array('slug' => 'prostate',           'title' => '바른 전립선 · 남성활력'),
            array('slug' => 'hairloss-male',      'title' => '남성탈모 클리닉'),
            array('slug' => 'hairloss-female',    'title' => '여성탈모 클리닉'),
            array('slug' => 'hairloss-alopecia',  'title' => '원형탈모 클리닉'),
            array('slug' => 'hairloss-seborrheic','title' => '지루성두피염 클리닉'),
            array('slug' => 'lifting-compare',    'title' => '리프팅 윤곽진단')
        );
        $refs = array('네이버 검색', '구글 검색', '카카오톡 채널', '직접 방문', '인스타그램/블로그');
        $devs = array('mobile', 'desktop', 'mobile', 'desktop', 'tablet');
        $ips  = array('211.36.142.18', '175.223.41.90', '118.235.19.44', '223.38.77.12', '59.14.188.63', '121.162.88.105', '210.99.14.201', '112.171.40.82', '14.36.112.9');

        $now_ts = current_time('timestamp');
        $daily_counts = array(42, 48, 45, 53, 61, 58, 67, 74, 69, 78, 85, 81, 92, 64);
        for ($d = 13; $d >= 0; $d--) {
            $day_ts   = $now_ts - ($d * 86400);
            $day_date = date('Y-m-d', $day_ts);
            $cnt      = $daily_counts[13 - $d];
            for ($i = 0; $i < $cnt; $i++) {
                $p    = $pages[($i + $d) % count($pages)];
                $ip   = $ips[($i + $d * 3) % count($ips)];
                $dev  = $devs[($i + $d) % count($devs)];
                $ref  = $refs[($i * 2 + $d) % count($refs)];
                $hour = str_pad((string) (8 + ($i % 13)), 2, '0', STR_PAD_LEFT);
                $min  = str_pad((string) (($i * 7) % 60), 2, '0', STR_PAD_LEFT);
                $sec  = str_pad((string) (($i * 13) % 60), 2, '0', STR_PAD_LEFT);
                $wpdb->insert($vtable, array(
                    'visit_date'   => $day_date,
                    'page_slug'    => $p['slug'],
                    'page_title'   => $p['title'],
                    'visitor_hash' => substr(md5($day_date . '_' . $ip . '_' . ($i % 28)), 0, 16),
                    'client_ip'    => $ip,
                    'device_type'  => $dev,
                    'referrer'     => $ref,
                    'user_agent'   => $dev === 'mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0',
                    'created_at'   => "{$day_date} {$hour}:{$min}:{$sec}"
                ));
            }
        }
    }

    private static function seed_initial_private_records() {
        global $wpdb;
        $table = self::table_name();
        $samples = array(
            array(
                'part_id' => 'knee',
                'member_name' => '김서연',
                'member_email' => 'seoyeon.parent@kakao.member',
                'member_phone' => '010-4821-7390',
                'social_provider' => 'kakao',
                'gender' => '여성',
                'age_group' => '초등 저학년 자녀(보호자)',
                'symptom_duration' => '6개월~1년',
                'title' => '초3 여아 야간 구강호흡과 또래 대비 성장 속도 지연 관련 문의드립니다',
                'content' => '만 9세 여아인데 비염으로 밤마다 입을 벌리고 자며 최근 1년간 키가 3.5cm밖에 자라지 않았습니다. 서파수면과 성장판 골연령 진행 상태를 확인하려면 어떤 생활 교정과 검진이 필요한지 궁금합니다.',
                'status' => 'answered',
                'master_reply' => '소아 내분비학 연구(JCEM)에 따르면 성장호르몬 일일 분비량의 약 70% 이상이 야간 깊은 서파수면(Slow-Wave Sleep) 단계에서 분비됩니다. 구강호흡은 야간 미세각성을 유발해 수면의 질을 떨어뜨리므로 실내 습도 50% 유지, 취침 2시간 전 당류 제한, 비강 호흡 환경 조성이 우선 권장되며 내원 시 무방사선 초음파 및 체성분·비강 상태 점검을 통해 세밀히 안내받으실 수 있습니다.',
                'created_at' => '2026-10-24 14:20:00',
                'replied_at' => '2026-10-24 17:05:00'
            ),
            array(
                'part_id' => 'cervical',
                'member_name' => '박준호',
                'member_email' => 'junho.park88@gmail.com',
                'member_phone' => '010-9234-1182',
                'social_provider' => 'google',
                'gender' => '남성',
                'age_group' => '30대',
                'symptom_duration' => '1년 이상 만성',
                'title' => 'IT 개발직 거북목 긴장과 정수리 열감·모발 가늘어짐 연관성 질문드립니다',
                'content' => '하루 10시간 이상 모니터를 본 뒤로 뒷목이 늘 뻐근하고 저녁이면 두피가 뜨거워지면서 정수리 모발이 눈에 띄게 가늘어졌습니다. 생활 속 두피 온도 관리와 경추 긴장 완화 방법이 궁금합니다.',
                'status' => 'answered',
                'master_reply' => '피부과학 학술지(Nature Reviews Disease Primers · J Invest Dermatol)에서도 모유두(Dermal Papilla) 주변 미세혈류 저하와 국소 미세염증이 모낭 소형화를 가속하는 주요 요인으로 보고됩니다. 모니터 상단을 눈높이에 맞추어 후두하근 압박을 줄이고, 저녁 미온수 세정 후 냉풍 건조 및 취침 전 15분 족욕으로 상부 열쏠림을 완화하는 루틴을 꾸준히 실천해 보시기 바랍니다.',
                'created_at' => '2026-10-24 19:42:00',
                'replied_at' => '2026-10-25 10:15:00'
            ),
            array(
                'part_id' => 'lumbar',
                'member_name' => '이정훈',
                'member_email' => 'jhlee_daejeon@naver.com',
                'member_phone' => '010-3715-6049',
                'social_provider' => 'naver',
                'gender' => '남성',
                'age_group' => '40대',
                'symptom_duration' => '6개월~1년',
                'title' => '장시간 운전 후 반복되는 우측 둔부·종아리 당김 증상 상담 요청드립니다',
                'content' => '하루 3시간 이상 운전하며 출퇴근하는데 허리 자체 통증보다 오른쪽 엉덩이 깊은 곳부터 종아리 바깥쪽까지 저릿하게 당기는 증상이 반복됩니다. 디스크성 방사통과 이상근 증후군을 어떻게 구별하나요?',
                'status' => 'answered',
                'master_reply' => '세계적 의학저널 The Lancet(2018) 및 JAMA 척추 가이드라인에서는 만성 요통·좌골신경통 평가 시 단순 영상 소견뿐 아니라 골반 경사·고관절 외회전근(이상근) 긴장도를 함께 감별할 것을 권고합니다. 기침·배변 시 복압 상승으로 저림이 심해지면 요추 신경근 압박 가능성이 높고, 착석 압박 시 둔부 국소 통증이 두드러지면 이상근 긴장 가능성이 높으므로 50분 간격 기립 신전 스트레칭과 정밀 이학적 평가를 권장합니다.',
                'created_at' => '2026-10-25 09:12:00',
                'replied_at' => '2026-10-25 13:30:00'
            ),
            array(
                'part_id' => 'gongjindan',
                'member_name' => '최은정',
                'member_email' => 'eunjung.choi@kakao.member',
                'member_phone' => '010-6480-2910',
                'social_provider' => 'kakao',
                'gender' => '여성',
                'age_group' => '50대',
                'symptom_duration' => '6개월~1년',
                'title' => '수면 시간은 충분한데도 아침 기상 직후 심한 번아웃과 브레인포그가 지속됩니다',
                'content' => '7시간 이상 자도 아침에 눈을 뜨면 몸이 물먹은 솜처럼 무겁고 오후 2시만 되면 머리가 멍해져 집중이 어렵습니다. 혈액검사는 정상 범위라는데 어떤 생체 지표를 점검해 보아야 할까요?',
                'status' => 'answered',
                'master_reply' => 'Nature Medicine(Furman et al., 2019)에서 제시한 전신 저등급 만성 염증(Systemic Chronic Inflammation) 및 시상하부-뇌하수체-부신(HPA) 축의 코르티솔 일주기 리듬 평탄화가 동반될 때 일반 혈액검사 정상 소견에도 깊은 피로와 브레인포그가 나타날 수 있습니다. 기상 직후 15분 자연광 노출과 오후 카페인 차단을 먼저 실천하시고 자율신경 변이도(HRV) 및 간·대사 지표를 함께 점검해 보시길 권합니다.',
                'created_at' => '2026-10-25 11:25:00',
                'replied_at' => '2026-10-25 15:40:00'
            ),
            array(
                'part_id' => 'syncope',
                'member_name' => '정다은',
                'member_email' => 'daeun.jung@naver.com',
                'member_phone' => '010-5192-8473',
                'social_provider' => 'naver',
                'gender' => '여성',
                'age_group' => '20대',
                'symptom_duration' => '1~6개월',
                'title' => '지하철 출근길 식은땀과 시야 아찔함(미주신경성 전조) 대처법 문의드립니다',
                'content' => '뇌 MRI와 심전도는 모두 정상이라는데 사람이 많고 더운 실내에 오래 서 있으면 속이 메스껍고 귀가 먹먹해지며 눈앞이 하얘집니다. 전조 증상이 올 때 즉각 대처하는 방법을 알고 싶습니다.',
                'status' => 'answered',
                'master_reply' => '유럽심장학회(ESC, European Heart Journal 2018) 실신 진료지침에서는 전조 증상(식은땀·오심·시야 협착) 발생 즉시 바닥에 쪼그려 앉거나 누워 하지 거상을 취하고, 양다리를 교차해 허벅지·둔근에 힘을 주는 등척성 근수축(Physical Counter-pressure Maneuver)을 1차 권고합니다. 평소 기상 시 3단계 완만 기상과 종아리 펌프 운동, 적정 수분 섭취가 재발 예방에 큰 도움이 됩니다.',
                'created_at' => '2026-10-25 14:50:00',
                'replied_at' => '2026-10-25 18:10:00'
            ),
            array(
                'part_id' => 'digest',
                'member_name' => '강민수',
                'member_email' => 'minsu.kang@gmail.com',
                'member_phone' => '010-8342-5519',
                'social_provider' => 'google',
                'gender' => '남성',
                'age_group' => '30대',
                'symptom_duration' => '1년 이상 만성',
                'title' => '위내시경 정상 소견 후에도 계속되는 식후 명치 팽만감과 목 이물감 문의',
                'content' => '최근 위내시경에서 가벼운 표재성 위염 외에 이상이 없다는데 조금만 식사해도 명치가 단단하게 막히고 목에 무언가 걸린 듯 헛기침이 납니다. 위산억제제를 끊으면 바로 재발하는데 이유가 궁금합니다.',
                'status' => 'answered',
                'master_reply' => '소화기 신경생리학 리뷰(Physiological Reviews 2019 · Rome IV 기능성 소화불량 기준)에 따르면 위 점막 손상이 없더라도 위장 평활근의 배출 지연(Delayed Gastric Emptying)과 내장 과민성이 있으면 위 내 가스 압력이 상승해 하부식도괄약근을 자극합니다. 한 입 30회 저작, 식중 수분 제한, 취침 3시간 전 금식, 식후 15분 보행으로 위 배출 리듬부터 회복하는 것이 핵심입니다.',
                'created_at' => '2026-10-25 16:05:00',
                'replied_at' => '2026-10-25 19:20:00'
            ),
            array(
                'part_id' => 'gut',
                'member_name' => '윤지혜',
                'member_email' => 'jihye.yoon@kakao.member',
                'member_phone' => '010-2948-7731',
                'social_provider' => 'kakao',
                'gender' => '여성',
                'age_group' => '30대',
                'symptom_duration' => '1년 이상 만성',
                'title' => '절식 다이어트 반복 후 기초대사량 저하와 복부 냉증·부종이 심해졌습니다',
                'content' => '식사량을 하루 한 끼로 줄여도 체중이 줄지 않고 손발과 아랫배만 차가워지며 저녁마다 종아리가 심하게 붓습니다. 굶지 않고 대사율을 높이는 과학적 원리가 궁금합니다.',
                'status' => 'answered',
                'master_reply' => 'New England Journal of Medicine(Cypess et al., 2009) 및 Cell Metabolism 연구에서 확인되듯 극단적 열량 제한은 갑상선 호르몬 전환과 갈색지방(BAT) 열생산을 억제해 적응성 대사 저하(Adaptive Thermogenesis)를 유발합니다. 끼니를 거르기보다 아침 단백질 섭취, 정제 탄수화물·액상과당 차단, 하체 대근육 저항운동과 심부 체온 유지가 대사 회복의 출발점입니다.',
                'created_at' => '2026-10-26 09:30:00',
                'replied_at' => '2026-10-26 11:45:00'
            ),
            array(
                'part_id' => 'uterus',
                'member_name' => '한소희',
                'member_email' => 'sohee.han@naver.com',
                'member_phone' => '010-7610-3924',
                'social_provider' => 'naver',
                'gender' => '여성',
                'age_group' => '30대',
                'symptom_duration' => '6개월~1년',
                'title' => '배아 이식 준비 중 자궁내막 두께와 골반 혈류 순환 관리에 대해 질문드립니다',
                'content' => '시험관 시술을 준비 중인데 자궁내막이 6mm 내외로 얇은 편이고 평소 아랫배 냉증이 심합니다. 착상 수용성을 높이기 위해 일상에서 실천할 수 있는 근거 기반 관리법이 궁금합니다.',
                'status' => 'answered',
                'master_reply' => '옥스퍼드 생식의학 리뷰(Human Reproduction Update, Craciunas et al., 2019)에서는 자궁내막 두께뿐 아니라 자궁 나선동맥(Spiral Artery) 미세혈류 저항 감소와 내막 수용성 인자 발현이 착상 성공의 핵심 변수임을 강조합니다. 하복부·족부 보온, 하루 30분 골반 순환 걷기, 오메가-3·비타민 D·엽산 균형 섭취 및 수면 코르티솔 안정이 큰 도움을 줍니다.',
                'created_at' => '2026-10-26 10:15:00',
                'replied_at' => '2026-10-26 13:00:00'
            ),
            array(
                'part_id' => 'prostate',
                'member_name' => '송태영',
                'member_email' => 'ty.song54@gmail.com',
                'member_phone' => '010-4091-8826',
                'social_provider' => 'google',
                'gender' => '남성',
                'age_group' => '50대',
                'symptom_duration' => '6개월~1년',
                'title' => '새벽 2~3회 야간뇨로 인한 수면 분절과 낮 시간 잔뇨감 생활관리 문의',
                'content' => '최근 반년 사이 새벽마다 소변 마려움으로 두세 번씩 깨어 깊은 잠을 자지 못하고 낮에도 화장실을 자주 찾게 됩니다. 저녁 수분 섭취와 골반저근 운동을 어떻게 해야 할까요?',
                'status' => 'answered',
                'master_reply' => '유럽비뇨의학회(EAU, European Urology) 하부요로증상(LUTS) 가이드라인에서는 취침 3시간 전 수분·알코올·카페인 제한, 장시간 좌식 회피(골반 울혈 완화), 규칙적인 골반저근 수축·이완 운동, 저녁 시간 하지 부종 완화를 위한 가벼운 보행과 반신욕/온좌욕을 핵심 생활요법으로 권고하고 있습니다.',
                'created_at' => '2026-10-26 11:40:00',
                'replied_at' => '2026-10-26 14:10:00'
            )
        );

        foreach ($samples as $row) {
            $wpdb->insert($table, array(
                'part_id'          => $row['part_id'],
                'user_id'          => 0,
                'member_name'      => $row['member_name'],
                'member_email'     => $row['member_email'],
                'member_phone'     => $row['member_phone'],
                'social_provider'  => $row['social_provider'],
                'gender'           => $row['gender'],
                'age_group'        => $row['age_group'],
                'symptom_duration' => $row['symptom_duration'],
                'title'            => $row['title'],
                'content'          => $row['content'],
                'status'           => $row['status'],
                'master_reply'     => $row['master_reply'],
                'client_ip'        => '127.0.0.1',
                'created_at'       => $row['created_at'],
                'replied_at'       => $row['replied_at']
            ));
        }
    }

    private static function send_nocache() {
        if (!defined('DONOTCACHEPAGE')) {
            define('DONOTCACHEPAGE', true);
        }
        nocache_headers();
    }

    private static function sign_token($payload_arr) {
        $payload_arr['exp'] = time() + (86400 * 30);
        $b64 = rtrim(strtr(base64_encode(wp_json_encode($payload_arr)), '+/', '-_'), '=');
        $sig = hash_hmac('sha256', $b64, wp_salt('auth'));
        return $b64 . '.' . $sig;
    }

    private static function verify_token($token) {
        if (empty($token) || strpos($token, '.') === false) {
            return null;
        }
        list($b64, $sig) = explode('.', $token, 2);
        $expected = hash_hmac('sha256', $b64, wp_salt('auth'));
        if (!hash_equals($expected, $sig)) {
            return null;
        }
        $json = base64_decode(strtr($b64, '-_', '+/'));
        $data = json_decode($json, true);
        if (!is_array($data) || empty($data['exp']) || $data['exp'] < time()) {
            return null;
        }
        return $data;
    }

    private static function get_current_actor(\WP_REST_Request $request) {
        $token = $request->get_header('x-bareun-token');
        if (empty($token)) {
            $auth = $request->get_header('authorization');
            if ($auth && stripos($auth, 'Bearer ') === 0) {
                $token = trim(substr($auth, 7));
            }
        }
        $decoded = self::verify_token($token);
        if ($decoded && !empty($decoded['uid'])) {
            $u = get_user_by('id', (int) $decoded['uid']);
            if ($u) {
                return self::format_user($u, !empty($decoded['isMaster']));
            }
        }
        if (is_user_logged_in()) {
            $u = wp_get_current_user();
            if ($u && $u->ID > 0) {
                return self::format_user($u, user_can($u, 'manage_options'));
            }
        }
        return null;
    }

    private static function format_user($u, $force_master = false) {
        $is_master = $force_master || user_can($u, 'manage_options');
        $provider = get_user_meta($u->ID, 'bareun_social_provider', true);
        if (empty($provider)) {
            $provider = $is_master ? 'master' : 'email';
        }
        return array(
            'id'        => (int) $u->ID,
            'name'      => $u->display_name ? $u->display_name : $u->user_login,
            'email'     => $u->user_email,
            'phone'     => (string) get_user_meta($u->ID, 'bareun_phone', true),
            'gender'    => (string) get_user_meta($u->ID, 'bareun_gender', true),
            'ageGroup'  => (string) get_user_meta($u->ID, 'bareun_age_group', true),
            'provider'  => $provider,
            'joinedAt'  => $u->user_registered,
            'isMaster'  => (bool) $is_master
        );
    }

    private static function mask_name($name) {
        $name = trim((string) $name);
        if ($name === '') {
            return '익명 회원';
        }
        $len = mb_strlen($name, 'UTF-8');
        if ($len <= 1) {
            return $name . '*';
        }
        if ($len === 2) {
            return mb_substr($name, 0, 1, 'UTF-8') . '*';
        }
        return mb_substr($name, 0, 1, 'UTF-8') . '*' . mb_substr($name, $len - 1, 1, 'UTF-8');
    }

    public static function register_routes() {
        register_rest_route('bareun/v1', '/auth/me', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_me'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/auth/social', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_social_auth'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/auth/register', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_register'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/auth/login', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_login'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/auth/master-login', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_master_login'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/qna', array(
            array(
                'methods'             => 'GET',
                'callback'            => array(__CLASS__, 'handle_get_qna'),
                'permission_callback' => '__return_true'
            ),
            array(
                'methods'             => 'POST',
                'callback'            => array(__CLASS__, 'handle_create_qna'),
                'permission_callback' => '__return_true'
            )
        ));
        register_rest_route('bareun/v1', '/qna/reply', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_master_reply'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/qna/unlock', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_unlock_qna'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/qna/delete', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_delete_qna'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/master/members', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_master_members'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/oauth/config', array(
            array(
                'methods'             => 'GET',
                'callback'            => array(__CLASS__, 'handle_get_oauth_config'),
                'permission_callback' => '__return_true'
            ),
            array(
                'methods'             => 'POST',
                'callback'            => array(__CLASS__, 'handle_save_oauth_config'),
                'permission_callback' => '__return_true'
            )
        ));
        register_rest_route('bareun/v1', '/visits', array(
            array(
                'methods'             => 'GET',
                'callback'            => array(__CLASS__, 'handle_get_visits'),
                'permission_callback' => '__return_true'
            ),
            array(
                'methods'             => 'POST',
                'callback'            => array(__CLASS__, 'handle_track_visit'),
                'permission_callback' => '__return_true'
            )
        ));
        register_rest_route('bareun/v1', '/visits/master', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_master_visits'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/visits/adjust', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_adjust_visits'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/visits/event', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_track_visit_event'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/analytics/public-config', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_get_analytics_public_config'),
            'permission_callback' => '__return_true'
        ));
        register_rest_route('bareun/v1', '/analytics/settings', array(
            array(
                'methods'             => 'GET',
                'callback'            => array(__CLASS__, 'handle_get_analytics_settings'),
                'permission_callback' => '__return_true'
            ),
            array(
                'methods'             => 'POST',
                'callback'            => array(__CLASS__, 'handle_save_analytics_settings'),
                'permission_callback' => '__return_true'
            )
        ));
        register_rest_route('bareun/v1', '/body-notes', array(
            array(
                'methods'             => 'GET',
                'callback'            => array(__CLASS__, 'handle_get_body_notes'),
                'permission_callback' => '__return_true'
            ),
            array(
                'methods'             => 'POST',
                'callback'            => array(__CLASS__, 'handle_post_body_notes'),
                'permission_callback' => '__return_true'
            )
        ));
        register_rest_route('bareun/v1', '/body-notes/view', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_increment_body_note_view'),
            'permission_callback' => '__return_true'
        ));
    }

    public static function handle_me(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        return new \WP_REST_Response(array(
            'ok'   => true,
            'user' => $actor
        ), 200);
    }

    public static function handle_social_auth(\WP_REST_Request $request) {
        self::send_nocache();
        $params   = $request->get_json_params();
        $provider = sanitize_key($params['provider'] ?? 'google');
        if (!in_array($provider, array('google', 'kakao', 'naver'), true)) {
            $provider = 'google';
        }
        $name      = sanitize_text_field($params['name'] ?? '');
        $email     = sanitize_email($params['email'] ?? '');
        $phone     = sanitize_text_field($params['phone'] ?? '');
        $gender    = sanitize_text_field($params['gender'] ?? '');
        $age_group = sanitize_text_field($params['ageGroup'] ?? '');

        if (empty($name)) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '성함(또는 닉네임)을 입력해 주세요.'), 400);
        }
        if (empty($email)) {
            $slug_phone = preg_replace('/[^0-9]/', '', $phone);
            $suffix = $slug_phone ? $slug_phone : substr(md5($name . microtime(true)), 0, 8);
            $email = $provider . '_' . $suffix . '@social.bareunhaniwon.com';
        }

        $user = get_user_by('email', $email);
        if (!$user) {
            $login_base = 'mbr_' . $provider . '_' . substr(md5($email), 0, 10);
            $uid = wp_insert_user(array(
                'user_login'   => $login_base,
                'user_pass'    => wp_generate_password(20, true, true),
                'user_email'   => $email,
                'display_name' => $name,
                'nickname'     => $name,
                'role'         => 'subscriber'
            ));
            if (is_wp_error($uid)) {
                return new \WP_REST_Response(array('ok' => false, 'message' => $uid->get_error_message()), 400);
            }
            $user = get_user_by('id', $uid);
        } else {
            if (!user_can($user, 'manage_options') && $name !== '') {
                wp_update_user(array('ID' => $user->ID, 'display_name' => $name, 'nickname' => $name));
            }
        }

        update_user_meta($user->ID, 'bareun_social_provider', $provider);
        if ($phone !== '') update_user_meta($user->ID, 'bareun_phone', $phone);
        if ($gender !== '') update_user_meta($user->ID, 'bareun_gender', $gender);
        if ($age_group !== '') update_user_meta($user->ID, 'bareun_age_group', $age_group);
        update_user_meta($user->ID, 'bareun_last_ip', sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''));

        $is_master = user_can($user, 'manage_options');
        $token = self::sign_token(array('uid' => (int) $user->ID, 'isMaster' => $is_master));

        return new \WP_REST_Response(array(
            'ok'    => true,
            'token' => $token,
            'user'  => self::format_user($user, $is_master)
        ), 200);
    }

    public static function handle_register(\WP_REST_Request $request) {
        self::send_nocache();
        $params    = $request->get_json_params();
        $name      = sanitize_text_field($params['name'] ?? '');
        $email     = sanitize_email($params['email'] ?? '');
        $password  = (string) ($params['password'] ?? '');
        $phone     = sanitize_text_field($params['phone'] ?? '');
        $gender    = sanitize_text_field($params['gender'] ?? '');
        $age_group = sanitize_text_field($params['ageGroup'] ?? '');

        if (empty($name) || empty($email) || strlen($password) < 4) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '성함, 이메일, 비밀번호(4자 이상)를 정확히 입력해 주세요.'), 400);
        }
        if (email_exists($email)) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '이미 가입된 이메일입니다. 로그인 탭을 이용해 주세요.'), 400);
        }

        $login_base = 'mbr_' . substr(md5($email . time()), 0, 12);
        $uid = wp_insert_user(array(
            'user_login'   => $login_base,
            'user_pass'    => $password,
            'user_email'   => $email,
            'display_name' => $name,
            'nickname'     => $name,
            'role'         => 'subscriber'
        ));
        if (is_wp_error($uid)) {
            return new \WP_REST_Response(array('ok' => false, 'message' => $uid->get_error_message()), 400);
        }
        update_user_meta($uid, 'bareun_social_provider', 'email');
        update_user_meta($uid, 'bareun_phone', $phone);
        update_user_meta($uid, 'bareun_gender', $gender);
        update_user_meta($uid, 'bareun_age_group', $age_group);
        update_user_meta($uid, 'bareun_last_ip', sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''));

        $user  = get_user_by('id', $uid);
        $token = self::sign_token(array('uid' => (int) $uid, 'isMaster' => false));

        return new \WP_REST_Response(array(
            'ok'    => true,
            'token' => $token,
            'user'  => self::format_user($user, false)
        ), 200);
    }

    public static function handle_login(\WP_REST_Request $request) {
        self::send_nocache();
        $params   = $request->get_json_params();
        $id_or_em = sanitize_text_field($params['email'] ?? '');
        $password = (string) ($params['password'] ?? '');

        $user = is_email($id_or_em) ? get_user_by('email', $id_or_em) : get_user_by('login', $id_or_em);
        if (!$user || !wp_check_password($password, $user->user_pass, $user->ID)) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '이메일(또는 아이디)과 비밀번호를 다시 확인해 주세요.'), 401);
        }
        $is_master = user_can($user, 'manage_options');
        $token     = self::sign_token(array('uid' => (int) $user->ID, 'isMaster' => $is_master));

        return new \WP_REST_Response(array(
            'ok'    => true,
            'token' => $token,
            'user'  => self::format_user($user, $is_master)
        ), 200);
    }

    public static function handle_master_login(\WP_REST_Request $request) {
        self::send_nocache();
        $params   = $request->get_json_params();
        $username = sanitize_text_field($params['username'] ?? '');
        $password = (string) ($params['password'] ?? '');

        $user = get_user_by('login', $username);
        if (!$user && is_email($username)) {
            $user = get_user_by('email', $username);
        }
        if (!$user || !wp_check_password($password, $user->user_pass, $user->ID) || !user_can($user, 'manage_options')) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 관리자 계정 정보가 올바르지 않습니다.'), 401);
        }

        $token = self::sign_token(array('uid' => (int) $user->ID, 'isMaster' => true));
        return new \WP_REST_Response(array(
            'ok'    => true,
            'token' => $token,
            'user'  => self::format_user($user, true)
        ), 200);
    }

    public static function dispatch_qna_reply_notifications($r, $reply) {
        $email = trim((string)($r['member_email'] ?? ''));
        $phone = preg_replace('/[^0-9]/', '', (string)($r['member_phone'] ?? ''));
        $name  = trim((string)($r['member_name'] ?? '고객'));
        $title = trim((string)($r['title'] ?? ''));
        $qId   = (int)($r['id'] ?? 0);

        // 1. 등록된 이메일로 답변 알림 전송 (WordPress wp_mail)
        if (!empty($email) && is_email($email) && strpos($email, '.member') === false) {
            $subject = sprintf('[바른한의원] %s님의 건강 질문에 대표원장님의 1:1 전문 답변이 등록되었습니다.', $name);
            $message = sprintf(
                "안녕하세요, %s님.\n바른한의원 대전본점 안정위 대표원장실입니다.\n\n남겨주신 건강 질문에 1:1 전문 의학 답변이 등록되었습니다.\n\n▶ 질문 제목: %s\n▶ 답변 내용 미리보기:\n%s\n\n▶ 답변 전문 확인하기:\nhttps://www.bareunhaniwon.com/body-explorer/?tab=qna&qnaId=%d\n\n바른한의원 대전본점 (010-5631-1275)\n대전광역시 대덕구 비래동로7번길 1, 2층",
                $name,
                $title,
                wp_trim_words($reply, 30, '...'),
                $qId
            );
            $headers = array('Content-Type: text/plain; charset=UTF-8', 'From: 바른한의원 대전본점 <master@bareunhaniwon.com>');
            @wp_mail($email, $subject, $message, $headers);
        }

        // 2. 등록된 휴대폰 번호로 카카오톡 알림톡 / SMS 전송 (Solapi API)
        if (!empty($phone) && strlen($phone) >= 10) {
            $apiKey    = 'NCSGZXQKB2DDI8AU';
            $apiSecret = 'DXYGBFMQ78X1RVWBHF1TJDUD3E03B78N';
            $sender    = '01056311275';

            $date = gmdate('Y-m-d\TH:i:s\Z');
            $salt = bin2hex(random_bytes(16));
            $sig  = hash_hmac('sha256', $date . $salt, $apiSecret);
            $authHeader = "HMAC-SHA256 apiKey={$apiKey}, date={$date}, salt={$salt}, signature={$sig}";

            $smsText = sprintf(
                "[바른한의원] %s님, 남겨주신 질문에 안정위 대표원장님의 1:1 답변이 등록되었습니다.\n\n▶ 질문: %s\n▶ 확인: https://www.bareunhaniwon.com/body-explorer/?tab=qna&qnaId=%d\n\n바른한의원 대전본점 010-5631-1275",
                $name,
                mb_substr($title, 0, 25) . '...',
                $qId
            );

            $payload = wp_json_encode(array(
                'message' => array(
                    'to'   => $phone,
                    'from' => $sender,
                    'text' => $smsText
                )
            ));

            wp_remote_post('https://api.solapi.com/messages/v4/send', array(
                'headers' => array(
                    'Authorization' => $authHeader,
                    'Content-Type'  => 'application/json'
                ),
                'body'    => $payload,
                'timeout' => 10
            ));
        }
    }

    public static function handle_get_qna(\WP_REST_Request $request) {
        self::send_nocache();
        self::maybe_ensure_schema();
        global $wpdb;
        $table = self::table_name();
        $actor = self::get_current_actor($request);
        $is_master = $actor && !empty($actor['isMaster']);
        $actor_id  = $actor ? (int) $actor['id'] : 0;

        $part    = sanitize_key($request->get_param('part') ?? 'all');
        $keyword = sanitize_text_field($request->get_param('keyword') ?? '');
        $status  = sanitize_text_field($request->get_param('status') ?? 'all');

        $where = array('1=1');
        $values = array();

        if ($part && $part !== 'all') {
            $where[] = "part_id = %s";
            $values[] = $part;
        }

        if ($status === 'waiting') {
            $where[] = "status != 'answered'";
        } elseif ($status === 'answered') {
            $where[] = "status = 'answered'";
        } elseif ($status === 'secret') {
            $where[] = "(is_secret = 1 OR is_secret IS NULL)";
        } elseif ($status === 'public') {
            $where[] = "is_secret = 0";
        }

        $where_sql = implode(' AND ', $where);
        if (!empty($values)) {
            $sql = $wpdb->prepare("SELECT * FROM {$table} WHERE {$where_sql} ORDER BY id DESC LIMIT 300", $values);
        } else {
            $sql = "SELECT * FROM {$table} WHERE {$where_sql} ORDER BY id DESC LIMIT 300";
        }

        $rows = $wpdb->get_results($sql, ARRAY_A);
        $items = array();

        foreach ((array) $rows as $r) {
            $owner_id  = (int) $r['user_id'];
            $is_mine   = ($actor_id > 0 && $owner_id === $actor_id);
            $is_secret = !isset($r['is_secret']) || (int)$r['is_secret'] === 1;
            $can_read  = $is_master || $is_mine || !$is_secret;

            $entry = array(
                'id'           => (int) $r['id'],
                'partId'       => $r['part_id'],
                'maskedAuthor' => self::mask_name($r['member_name']),
                'provider'     => $r['social_provider'],
                'status'       => $r['status'],
                'createdAt'    => substr($r['created_at'], 0, 16),
                'repliedAt'    => $r['replied_at'] ? substr($r['replied_at'], 0, 16) : null,
                'isSecret'     => $is_secret,
                'hasPassword'  => !empty($r['secret_password']),
                'isMine'       => $is_mine,
                'canRead'      => $can_read
            );

            if ($can_read) {
                $entry['title']           = $r['title'];
                $entry['content']         = $r['content'];
                $entry['symptomDuration'] = $r['symptom_duration'];
                $entry['masterReply']     = $r['master_reply'];
            } else {
                $entry['title'] = '🔒 비밀글입니다 (작성자 본인 · 마스터 전용)';
            }

            if ($is_master) {
                $entry['memberDetail'] = array(
                    'userId'          => $owner_id,
                    'name'            => $r['member_name'],
                    'email'           => $r['member_email'],
                    'phone'           => $r['member_phone'],
                    'provider'        => $r['social_provider'],
                    'gender'          => $r['gender'],
                    'ageGroup'        => $r['age_group'],
                    'symptomDuration' => $r['symptom_duration'],
                    'clientIp'        => $r['client_ip'],
                    'createdAt'       => $r['created_at'],
                    'isSecret'        => $is_secret,
                    'hasPassword'     => !empty($r['secret_password'])
                );
            }

            // Keyword filtering based on raw record fields
            if ($keyword !== '') {
                $haystack = strtolower(implode(' ', array(
                    $r['part_id'] ?? '',
                    $r['member_name'] ?? '',
                    $r['title'] ?? '',
                    $r['content'] ?? '',
                    $r['master_reply'] ?? '',
                    $r['symptom_duration'] ?? ''
                )));
                if (strpos($haystack, strtolower($keyword)) === false) {
                    continue;
                }
            }

            $items[] = $entry;
        }

        return new \WP_REST_Response(array(
            'ok'       => true,
            'isMaster' => $is_master,
            'items'    => $items
        ), 200);
    }

    public static function handle_unlock_qna(\WP_REST_Request $request) {
        self::send_nocache();
        self::maybe_ensure_schema();
        global $wpdb;
        $table = self::table_name();
        $actor = self::get_current_actor($request);
        $is_master = $actor && !empty($actor['isMaster']);
        $actor_id  = $actor ? (int) $actor['id'] : 0;

        $params = $request->get_json_params();
        $id     = (int) ($params['id'] ?? 0);
        $pwd    = sanitize_text_field($params['password'] ?? '');

        $r = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id), ARRAY_A);
        if (!$r) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '질문을 찾을 수 없습니다.'), 404);
        }

        $owner_id  = (int) $r['user_id'];
        $is_mine   = ($actor_id > 0 && $owner_id === $actor_id);
        $is_secret = !isset($r['is_secret']) || (int)$r['is_secret'] === 1;
        $pass_ok   = (!empty($r['secret_password']) && $r['secret_password'] === $pwd);

        if ($is_master || $is_mine || !$is_secret || $pass_ok) {
            return new \WP_REST_Response(array(
                'ok'   => true,
                'item' => array(
                    'id'              => (int) $r['id'],
                    'partId'          => $r['part_id'],
                    'title'           => $r['title'],
                    'content'         => $r['content'],
                    'symptomDuration' => $r['symptom_duration'],
                    'masterReply'     => $r['master_reply'],
                    'maskedAuthor'    => self::mask_name($r['member_name']),
                    'createdAt'       => substr($r['created_at'], 0, 16),
                    'repliedAt'       => $r['replied_at'] ? substr($r['replied_at'], 0, 16) : null,
                    'status'          => $r['status'],
                    'isSecret'        => $is_secret,
                    'canRead'         => true
                )
            ), 200);
        }

        return new \WP_REST_Response(array('ok' => false, 'message' => '비밀번호가 일치하지 않거나 열람 권한이 없습니다.'), 403);
    }

    public static function handle_create_qna(\WP_REST_Request $request) {
        self::send_nocache();
        self::maybe_ensure_schema();
        $actor = self::get_current_actor($request);
        $params    = $request->get_json_params();

        if (!$actor) {
            $guest_name = sanitize_text_field($params['name'] ?? '');
            if (empty($guest_name)) {
                return new \WP_REST_Response(array('ok' => false, 'message' => '성함(또는 닉네임)을 입력하시거나 회원 로그인 후 질문을 등록해 주세요.'), 401);
            }
            $guest_phone = sanitize_text_field($params['phone'] ?? '');
            $guest_email = sanitize_email($params['email'] ?? '');
            if (empty($guest_email)) {
                $guest_email = 'guest_' . time() . '@bareunhaniwon.com';
            }
            $actor = array(
                'id'       => 0,
                'name'     => $guest_name,
                'email'    => $guest_email,
                'phone'    => $guest_phone,
                'provider' => 'guest',
                'gender'   => sanitize_text_field($params['gender'] ?? '미기재'),
                'ageGroup' => sanitize_text_field($params['ageGroup'] ?? '30대'),
                'isMaster' => false
            );
        }

        $part_id   = sanitize_key($params['partId'] ?? 'lumbar');
        $title     = sanitize_text_field($params['title'] ?? '');
        $content   = sanitize_textarea_field($params['content'] ?? '');
        $duration  = sanitize_text_field($params['symptomDuration'] ?? '1~6개월');
        $phone     = sanitize_text_field($params['phone'] ?? $actor['phone']);
        $email     = sanitize_email($params['email'] ?? $actor['email']);
        $age_grp   = sanitize_text_field($params['ageGroup'] ?? $actor['ageGroup']);
        $gender    = sanitize_text_field($params['gender'] ?? $actor['gender']);
        $is_secret = isset($params['isSecret']) ? ($params['isSecret'] ? 1 : 0) : 1;
        $secret_pw = sanitize_text_field($params['secretPassword'] ?? '');

        if (empty($title) || empty($content)) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '질문 제목과 상세 증상 내용을 모두 입력해 주세요.'), 400);
        }

        if ($actor['id'] > 0) {
            if ($phone !== '') update_user_meta($actor['id'], 'bareun_phone', $phone);
            if ($age_grp !== '') update_user_meta($actor['id'], 'bareun_age_group', $age_grp);
            if ($gender !== '') update_user_meta($actor['id'], 'bareun_gender', $gender);
        }

        global $wpdb;
        $table = self::table_name();
        $now   = current_time('mysql');

        $wpdb->insert($table, array(
            'part_id'          => $part_id,
            'user_id'          => (int) $actor['id'],
            'member_name'      => $actor['name'],
            'member_email'     => $email ?: $actor['email'],
            'member_phone'     => $phone,
            'social_provider'  => $actor['provider'],
            'gender'           => $gender,
            'age_group'        => $age_grp,
            'symptom_duration' => $duration,
            'title'            => $title,
            'content'          => $content,
            'is_secret'        => $is_secret,
            'secret_password'  => $secret_pw,
            'status'           => 'waiting',
            'master_reply'     => '',
            'client_ip'        => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
            'created_at'       => $now,
            'replied_at'       => null
        ));

        return new \WP_REST_Response(array(
            'ok'      => true,
            'id'      => (int) $wpdb->insert_id,
            'isSecret'=> (bool)$is_secret,
            'message' => $is_secret ? '비밀글로 안전하게 등록되었습니다.' : '공개 질문으로 안전하게 등록되었습니다.'
        ), 200);
    }

    public static function handle_master_reply(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor || empty($actor['isMaster'])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 권한이 필요합니다.'), 403);
        }

        $params = $request->get_json_params();
        $id     = (int) ($params['id'] ?? 0);
        $reply  = sanitize_textarea_field($params['reply'] ?? '');
        if ($id <= 0) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '유효하지 않은 질문 번호입니다.'), 400);
        }

        global $wpdb;
        $table = self::table_name();
        $status = trim($reply) !== '' ? 'answered' : 'waiting';
        $now_str = trim($reply) !== '' ? current_time('mysql') : null;

        $wpdb->update(
            $table,
            array(
                'master_reply' => $reply,
                'status'       => $status,
                'replied_at'   => $now_str
            ),
            array('id' => $id)
        );

        if ($status === 'answered') {
            $record = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id), ARRAY_A);
            if ($record) {
                self::dispatch_qna_reply_notifications($record, $reply);
            }
        }

        return new \WP_REST_Response(array(
            'ok'      => true,
            'status'  => $status,
            'message' => '1:1 답변이 저장되었으며, 등록된 이메일 및 카카오톡으로 답변 알림이 자동 전송되었습니다.'
        ), 200);
    }

    public static function handle_delete_qna(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '로그인이 필요합니다.'), 401);
        }
        $params = $request->get_json_params();
        $id     = (int) ($params['id'] ?? 0);

        global $wpdb;
        $table = self::table_name();
        $row   = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id), ARRAY_A);
        if (!$row) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '질문을 찾을 수 없습니다.'), 404);
        }
        if (empty($actor['isMaster']) && (int) $row['user_id'] !== (int) $actor['id']) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '삭제 권한이 없습니다.'), 403);
        }
        $wpdb->delete($table, array('id' => $id));
        return new \WP_REST_Response(array('ok' => true), 200);
    }

    public static function handle_master_members(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor || empty($actor['isMaster'])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 권한이 필요합니다.'), 403);
        }

        global $wpdb;
        $table = self::table_name();
        $counts_raw = $wpdb->get_results("SELECT user_id, COUNT(*) as cnt FROM {$table} WHERE user_id > 0 GROUP BY user_id", ARRAY_A);
        $count_map  = array();
        foreach ((array) $counts_raw as $cr) {
            $count_map[(int) $cr['user_id']] = (int) $cr['cnt'];
        }

        $users = get_users(array('orderby' => 'registered', 'order' => 'DESC', 'number' => 200));
        $list  = array();
        foreach ($users as $u) {
            if (user_can($u, 'manage_options')) continue;
            $f = self::format_user($u, false);
            $f['lastIp']        = (string) get_user_meta($u->ID, 'bareun_last_ip', true);
            $f['questionCount'] = $count_map[(int) $u->ID] ?? 0;
            $list[] = $f;
        }

        return new \WP_REST_Response(array(
            'ok'      => true,
            'members' => $list
        ), 200);
    }

    public static function handle_get_oauth_config(\WP_REST_Request $request) {
        self::send_nocache();
        $cfg = get_option(self::OPT_OAUTH, array());
        if (!is_array($cfg)) $cfg = array();
        return new \WP_REST_Response(array(
            'ok' => true,
            'config' => array(
                'googleClientId' => (string) ($cfg['googleClientId'] ?? ''),
                'kakaoJsKey'     => (string) ($cfg['kakaoJsKey'] ?? ''),
                'naverClientId'  => (string) ($cfg['naverClientId'] ?? '')
            )
        ), 200);
    }

    public static function handle_save_oauth_config(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor || empty($actor['isMaster'])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 권한이 필요합니다.'), 403);
        }
        $params = $request->get_json_params();
        $cfg = array(
            'googleClientId' => sanitize_text_field($params['googleClientId'] ?? ''),
            'kakaoJsKey'     => sanitize_text_field($params['kakaoJsKey'] ?? ''),
            'naverClientId'  => sanitize_text_field($params['naverClientId'] ?? '')
        );
        update_option(self::OPT_OAUTH, $cfg);
        return new \WP_REST_Response(array('ok' => true, 'config' => $cfg), 200);
    }

    private static function get_page_title_map() {
        return array(
            'home'               => '메인 3D 스토리 쇼룸',
            'story-3d'           => '메인 3D 스토리 쇼룸',
            'index'              => '메인 3D 스토리 쇼룸',
            'body-explorer'      => '3D 인체모형 · 진료탐색',
            'ask-doctor'         => '의학 인사이트 & 비공개 Q&A',
            'director'           => '안정위 대표원장 · 9대검진',
            'chuna'              => '바른 추나 · 척추교정',
            'growth'             => '바른 성장 · 성조숙증',
            'diet-zero'          => '바른 다이어트 · 식욕ZERO',
            'hairloss'           => '바른 탈모 · 모근재생',
            'hairloss-male'      => '남성탈모 클리닉',
            'hairloss-alopecia'  => '원형탈모 클리닉',
            'hairloss-female'    => '여성탈모 클리닉',
            'hairloss-seborrheic'=> '지루성두피염 클리닉',
            'gongjindan'         => '바른 황제공진단',
            'gongjindan-2'       => '바른 황제공진단',
            'prostate'           => '바른 전립선 · 남성활력',
            'location'           => '오시는길 · 진료시간 · 비급여 안내',
            'lifting-compare'    => '리프팅 윤곽진단',
            'compare'            => '전·후 비교 스튜디오'
        );
    }

    private static function normalize_page_slug($raw) {
        $s = sanitize_key($raw ?: 'home');
        if ($s === 'index' || $s === 'story-3d' || $s === '46-2' || $s === '') {
            return 'home';
        }
        if ($s === 'gongjindan-2') {
            return 'gongjindan';
        }
        return $s;
    }

    public static function detect_geo_ai_crawler($ua) {
        $low = strtolower((string) $ua);
        if ($low === '') return '';
        if (strpos($low, 'oai-searchbot') !== false) return 'OAI-SearchBot (ChatGPT 검색)';
        if (strpos($low, 'chatgpt-user') !== false) return 'ChatGPT-User (실시간 답변 열람)';
        if (strpos($low, 'gptbot') !== false) return 'GPTBot (OpenAI 색인)';
        if (strpos($low, 'perplexitybot') !== false) return 'PerplexityBot (퍼플렉시티 검색)';
        if (strpos($low, 'perplexity-user') !== false) return 'Perplexity-User (실시간 인용)';
        if (strpos($low, 'claude-searchbot') !== false) return 'Claude-SearchBot (클로드 검색)';
        if (strpos($low, 'claude-user') !== false) return 'Claude-User (실시간 답변 열람)';
        if (strpos($low, 'claudebot') !== false || strpos($low, 'anthropic-ai') !== false) return 'ClaudeBot (Anthropic)';
        if (strpos($low, 'google-extended') !== false) return 'Google-Extended (Gemini·AI Overview)';
        if (strpos($low, 'applebot-extended') !== false) return 'Applebot-Extended (Apple AI)';
        if (strpos($low, 'cohere-ai') !== false) return 'Cohere-AI Bot';
        if (strpos($low, 'youbot') !== false) return 'YouBot (You.com AI)';
        if (strpos($low, 'meta-externalagent') !== false) return 'Meta AI Agent';
        return '';
    }

    private static function record_geo_ai_crawler_hit($bot_label, $req_path, $ip) {
        if ($bot_label === '') return;
        $today = current_time('Y-m-d');
        $now_str = current_time('mysql');
        $stats = get_option(self::OPT_GEO_BOT_STATS, array());
        if (!is_array($stats)) $stats = array();

        $stats['totalHits'] = (int) ($stats['totalHits'] ?? 0) + 1;
        if (empty($stats['dailyHits']) || !is_array($stats['dailyHits'])) {
            $stats['dailyHits'] = array();
        }
        $stats['dailyHits'][$today] = (int) ($stats['dailyHits'][$today] ?? 0) + 1;
        if (count($stats['dailyHits']) > 35) {
            ksort($stats['dailyHits']);
            $stats['dailyHits'] = array_slice($stats['dailyHits'], -30, null, true);
        }

        if (empty($stats['byBot']) || !is_array($stats['byBot'])) {
            $stats['byBot'] = array();
        }
        $bcur = $stats['byBot'][$bot_label] ?? array('total' => 0, 'todayDate' => $today, 'today' => 0);
        $bcur['total'] = (int) ($bcur['total'] ?? 0) + 1;
        if (($bcur['todayDate'] ?? '') !== $today) {
            $bcur['todayDate'] = $today;
            $bcur['today'] = 1;
        } else {
            $bcur['today'] = (int) ($bcur['today'] ?? 0) + 1;
        }
        $bcur['lastSeen'] = $now_str;
        $stats['byBot'][$bot_label] = $bcur;

        $clean_path = '/' . ltrim((string) strtok((string) $req_path, '?'), '/');
        if (strlen($clean_path) > 120) {
            $clean_path = substr($clean_path, 0, 120);
        }
        if (empty($stats['byPath']) || !is_array($stats['byPath'])) {
            $stats['byPath'] = array();
        }
        $stats['byPath'][$clean_path] = (int) ($stats['byPath'][$clean_path] ?? 0) + 1;
        if (count($stats['byPath']) > 40) {
            arsort($stats['byPath']);
            $stats['byPath'] = array_slice($stats['byPath'], 0, 30, true);
        }

        if (empty($stats['recentHits']) || !is_array($stats['recentHits'])) {
            $stats['recentHits'] = array();
        }
        array_unshift($stats['recentHits'], array(
            'bot'       => $bot_label,
            'path'      => $clean_path,
            'ip'        => $ip,
            'createdAt' => $now_str
        ));
        if (count($stats['recentHits']) > 50) {
            $stats['recentHits'] = array_slice($stats['recentHits'], 0, 50);
        }

        update_option(self::OPT_GEO_BOT_STATS, $stats, false);
    }

    public static function maybe_track_geo_ai_crawler() {
        static $geo_bot_tracked = false;
        if ($geo_bot_tracked) {
            return;
        }
        if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST) || (defined('DOING_CRON') && DOING_CRON)) {
            return;
        }
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
        $bot = self::detect_geo_ai_crawler($ua);
        if ($bot === '') {
            return;
        }
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        $path_only = strtolower((string) strtok($uri, '?'));
        if (strpos($path_only, '/wp-json/') === 0 || strpos($path_only, '/wp-admin') === 0 || strpos($path_only, '/wp-login') === 0) {
            return;
        }
        if (preg_match('/\.(js|css|png|jpg|jpeg|webp|gif|svg|woff2?|ttf|ico|mp4|glb|wasm|map)$/i', $path_only)) {
            return;
        }
        $ip = sanitize_text_field($_SERVER['HTTP_X_FORWARDED_FOR'] ?? ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'));
        if (strpos($ip, ',') !== false) {
            $ip = trim(explode(',', $ip)[0]);
        }
        $geo_bot_tracked = true;
        self::record_geo_ai_crawler_hit($bot, $uri, $ip);
    }

    private static function extract_query_params_map($query_or_url) {
        $str = trim((string) $query_or_url);
        if ($str === '') return array();
        $qpart = $str;
        if (strpos($str, '://') !== false) {
            $parsed = @parse_url($str, PHP_URL_QUERY);
            $qpart = is_string($parsed) ? $parsed : '';
        } else {
            $qpart = ltrim($str, '?');
        }
        if ($qpart === '') return array();
        $out = array();
        parse_str($qpart, $out);
        return is_array($out) ? $out : array();
    }

    public static function parse_visit_attribution($raw_ref, $ua, $landing_query = '', $client_hint = '') {
        $ref_str   = trim((string) $raw_ref);
        $ref_low   = strtolower($ref_str);
        $ua_low    = strtolower((string) $ua);
        $lq_params = self::extract_query_params_map($landing_query);
        $rf_params = self::extract_query_params_map($ref_str);

        $utm_src = strtolower(trim((string) ($lq_params['utm_source'] ?? ($rf_params['utm_source'] ?? ''))));
        $utm_med = strtolower(trim((string) ($lq_params['utm_medium'] ?? ($rf_params['utm_medium'] ?? ''))));
        $hint_low = strtolower(trim((string) $client_hint));
        $ai_hay = $ref_low . ' ' . $utm_src . ' ' . $utm_med . ' ' . $hint_low;

        $ai_engine = '';
        if (strpos($ai_hay, 'chatgpt.com') !== false || strpos($ai_hay, 'chat.openai.com') !== false || strpos($ai_hay, 'openai.com') !== false || strpos($ai_hay, 'searchgpt') !== false || $utm_src === 'chatgpt') {
            $ai_engine = 'ChatGPT (OpenAI)';
        } elseif (strpos($ai_hay, 'perplexity.ai') !== false || strpos($ai_hay, 'perplexity') !== false) {
            $ai_engine = 'Perplexity AI';
        } elseif (strpos($ai_hay, 'gemini.google.com') !== false || strpos($ai_hay, 'bard.google.com') !== false || strpos($ai_hay, 'aistudio.google.com') !== false || $utm_src === 'gemini') {
            $ai_engine = 'Google Gemini';
        } elseif (strpos($ai_hay, 'claude.ai') !== false || strpos($ai_hay, 'anthropic.com') !== false || $utm_src === 'claude') {
            $ai_engine = 'Claude AI';
        } elseif (strpos($ai_hay, 'copilot.microsoft.com') !== false || strpos($ai_hay, 'edgeservices.bing.com') !== false || strpos($ai_hay, 'sydney.bing.com') !== false || $utm_src === 'copilot') {
            $ai_engine = 'Microsoft Copilot';
        } elseif (strpos($ai_hay, 'cue.search.naver.com') !== false || strpos($ai_hay, 'clova-x.naver.com') !== false || strpos($ai_hay, 'clovax') !== false || strpos($ai_hay, 'naver_cue') !== false) {
            $ai_engine = '네이버 Cue: · CLOVA X';
        } elseif (strpos($ai_hay, 'wrtn.ai') !== false || $utm_src === 'wrtn') {
            $ai_engine = '뤼튼 (Wrtn AI)';
        } elseif (strpos($ai_hay, 'getliner.com') !== false || strpos($ai_hay, 'liner.ai') !== false || $utm_src === 'liner') {
            $ai_engine = '라이너 (Liner AI)';
        } elseif (strpos($ai_hay, 'grok.com') !== false || strpos($ai_hay, 'x.ai') !== false || $utm_src === 'grok') {
            $ai_engine = 'Grok (xAI)';
        } elseif (strpos($ai_hay, 'felo.ai') !== false || strpos($ai_hay, 'genspark.ai') !== false || strpos($ai_hay, 'you.com') !== false || strpos($ai_hay, 'phind.com') !== false || strpos($ai_hay, 'kagi.com') !== false) {
            $ai_engine = 'Felo · Genspark · 기타 AI';
        }

        // Extract search query keyword if available in landing URL or referrer URL
        $kw_keys = array('query', 'q', 'acq', 'n_keyword', 'DMKW', 'utm_term', 'k', 'sword', 'keyword', 'search', 'p');
        $search_kw = '';
        foreach (array($lq_params, $rf_params) as $pmap) {
            foreach ($kw_keys as $kk) {
                if (!empty($pmap[$kk]) && is_string($pmap[$kk])) {
                    $cand = trim(urldecode($pmap[$kk]));
                    if ($cand !== '' && strlen($cand) >= 2 && strpos($cand, 'http://') === false && strpos($cand, 'https://') === false) {
                        $search_kw = mb_substr(sanitize_text_field($cand), 0, 120);
                        break 2;
                    }
                }
            }
        }

        // Determine granular 14-channel platform
        $platform = '🔗 직접 접속 · 북마크';
        if ($ai_engine !== '') {
            $platform = '🤖 GEO AI 검색';
        } elseif (strpos($ref_low, 'place.naver.') !== false || strpos($ref_low, 'map.naver.') !== false || strpos($ref_low, 'naver.me') !== false || strpos($ref_low, 'booking.naver.') !== false || $utm_src === 'naver_place' || $utm_src === 'naver_map') {
            $platform = '📍 네이버 플레이스 · 지도';
        } elseif (strpos($ref_low, 'blog.naver.') !== false || strpos($ref_low, 'cafe.naver.') !== false || strpos($ref_low, 'in.naver.') !== false || strpos($ref_low, 'post.naver.') !== false || $utm_src === 'naver_blog') {
            $platform = '📝 네이버 블로그 · 카페';
        } elseif (strpos($ref_low, 'naver.') !== false || $ref_str === '네이버 검색' || $utm_src === 'naver') {
            $platform = '🟢 네이버 통합검색';
        } elseif (strpos($ua_low, 'naver(inapp') !== false) {
            $platform = '📱 네이버 앱 (인앱·피드)';
        } elseif (strpos($ref_low, 'google.') !== false || strpos($ref_low, 'android-app://com.google') !== false || $ref_str === '구글 검색' || $utm_src === 'google') {
            $platform = '🔍 구글 검색';
        } elseif (strpos($ua_low, 'kakaotalk') !== false || strpos($ref_low, 'pf.kakao.') !== false || strpos($ref_low, 'talk.kakao.') !== false || $ref_str === '카카오톡 채널' || $utm_src === 'kakao' || $utm_src === 'kakaotalk') {
            $platform = '💬 카카오톡 채팅 · 채널';
        } elseif (strpos($ref_low, 'daum.') !== false || strpos($ref_low, 'kakao.') !== false || strpos($ua_low, 'daumapps') !== false || $ref_str === '카카오·다음' || $utm_src === 'daum') {
            $platform = '🟡 다음 · 카카오 검색';
        } elseif (strpos($ref_low, 'threads.net') !== false || strpos($ref_low, 'threads.com') !== false || strpos($ua_low, 'barcelona') !== false || $utm_src === 'threads') {
            $platform = '🧵 스레드 (Threads)';
        } elseif (strpos($ref_low, 'instagram.') !== false || strpos($ua_low, 'instagram') !== false || $ref_str === '인스타그램/블로그' || $utm_src === 'instagram') {
            $platform = '📸 인스타그램';
        } elseif (strpos($ref_low, 'youtube.') !== false || strpos($ref_low, 'youtu.be') !== false || $ref_str === 'SNS·유튜브' || $utm_src === 'youtube') {
            $platform = '▶️ 유튜브';
        } elseif (strpos($ref_low, 'facebook.') !== false || strpos($ref_low, 'fb.com') !== false || strpos($ua_low, 'fban') !== false || strpos($ua_low, 'fbav') !== false || $utm_src === 'facebook') {
            $platform = '📘 페이스북';
        } elseif (strpos($ref_low, 'daangn.') !== false || strpos($ref_low, 'karrot') !== false || strpos($ua_low, 'karrot') !== false || $utm_src === 'daangn') {
            $platform = '🥕 당근 · 지역커뮤니티';
        } elseif (strpos($ref_low, 'bareunhaniwon.com') !== false || strpos($ref_low, 'localhost') !== false || strpos($ref_low, '127.0.0.1') !== false || $ref_str === '원내 페이지 이동') {
            $platform = '🏥 원내 페이지 연속탐색';
        } elseif ($ref_str !== '' && $ref_str !== '직접 방문' && $ref_low !== 'direct') {
            $platform = '🌐 외부 웹사이트 링크';
        }

        $short_ref = $ai_engine !== '' ? ('🤖 ' . $ai_engine) : $platform;

        return array(
            'platform'      => $platform,
            'aiEngine'      => $ai_engine,
            'searchKeyword' => $search_kw,
            'shortRef'      => $short_ref
        );
    }

    private static function classify_clinical_cohort($slug) {
        $s = strtolower((string) $slug);
        if ($s === 'growth' || strpos($s, 'knee') !== false) {
            return '🌱 소아 키성장 · 성조숙증 (30~40대 학부모층)';
        }
        if ($s === 'prostate' || $s === 'hairloss-male' || strpos($s, 'prostate') !== false) {
            return '💪 남성탈모 · 전립선 활력 (30~60대 남성층)';
        }
        if ($s === 'diet-zero' || $s === 'hairloss-female' || $s === 'lifting-compare' || strpos($s, 'uterus') !== false || strpos($s, 'gut') !== false) {
            return '🌸 다이어트 · 여성탈모 · 자궁 (20~50대 여성층)';
        }
        if ($s === 'chuna' || strpos($s, 'lumbar') !== false || strpos($s, 'cervical') !== false) {
            return '🦴 추나 척추교정 · 통증 (직장인 · 중장년층)';
        }
        if ($s === 'gongjindan' || $s === 'director' || strpos($s, 'gongjindan') !== false || strpos($s, 'syncope') !== false || strpos($s, 'digest') !== false) {
            return '👑 황제공진단 · 만성피로 · 소화 (수험생 · 중장년층)';
        }
        return '🌿 두피 · 종합 진료 · 오시는길 (전 연령 공통층)';
    }

    private static function base64url_encode_str($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function get_google_service_access_token($sa_json_str) {
        $raw = trim((string) $sa_json_str);
        if ($raw === '') {
            return array('ok' => false, 'error' => '서비스 계정 JSON이 입력되지 않았습니다.');
        }
        $sa = json_decode($raw, true);
        if (!is_array($sa) || empty($sa['client_email']) || empty($sa['private_key'])) {
            return array('ok' => false, 'error' => '서비스 계정 JSON 형식이 올바르지 않습니다 (client_email / private_key 누락).');
        }
        $cache_key = 'bareun_gapi_tok_v2_' . substr(md5($sa['client_email']), 0, 12);
        $cached = get_transient($cache_key);
        if (is_string($cached) && $cached !== '') {
            return array('ok' => true, 'token' => $cached, 'email' => $sa['client_email']);
        }
        if (!function_exists('openssl_sign')) {
            return array('ok' => false, 'error' => '서버 OpenSSL 서명 기능을 사용할 수 없습니다.');
        }

        $now = time();
        $header = self::base64url_encode_str(wp_json_encode(array('alg' => 'RS256', 'typ' => 'JWT')));
        $claim  = self::base64url_encode_str(wp_json_encode(array(
            'iss'   => $sa['client_email'],
            'scope' => 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters',
            'aud'   => 'https://oauth2.googleapis.com/token',
            'iat'   => $now - 30,
            'exp'   => $now + 3500
        )));
        $unsigned = $header . '.' . $claim;
        $pkey = @openssl_pkey_get_private(str_replace('\\n', "\n", $sa['private_key']));
        if (!$pkey) {
            return array('ok' => false, 'error' => '서비스 계정 private_key 파싱에 실패했습니다.');
        }
        $signature = '';
        $signed_ok = @openssl_sign($unsigned, $signature, $pkey, 'SHA256');
        if (!$signed_ok) {
            return array('ok' => false, 'error' => 'RS256 JWT 서명 생성에 실패했습니다.');
        }
        $jwt = $unsigned . '.' . self::base64url_encode_str($signature);

        $resp = wp_remote_post('https://oauth2.googleapis.com/token', array(
            'timeout' => 12,
            'body'    => array(
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion'  => $jwt
            )
        ));
        if (is_wp_error($resp)) {
            return array('ok' => false, 'error' => '구글 인증 서버 통신 실패: ' . $resp->get_error_message());
        }
        $body = json_decode(wp_remote_retrieve_body($resp), true);
        if (empty($body['access_token'])) {
            $err_msg = isset($body['error_description']) ? $body['error_description'] : (isset($body['error']) ? wp_json_encode($body['error']) : '토큰 발급 응답 오류');
            return array('ok' => false, 'error' => '구글 OAuth 토큰 발급 실패: ' . $err_msg);
        }
        set_transient($cache_key, $body['access_token'], 2700);
        return array('ok' => true, 'token' => $body['access_token'], 'email' => $sa['client_email']);
    }

    public static function ping_gsc_sitemaps_nonblocking() {
        $cfg = get_option(self::OPT_ANALYTICS_CFG, array());
        if (!is_array($cfg)) return;
        $sa_json = trim((string) ($cfg['googleServiceAccountJson'] ?? ''));
        if ($sa_json === '') return;
        $tok = self::get_google_service_access_token($sa_json);
        if (empty($tok['ok']) || empty($tok['token'])) return;
        $access_token = $tok['token'];
        $sites = array(
            'https://www.bareunhaniwon.com/',
            'https://bareunhaniwon.com/',
            'http://www.bareunhaniwon.com/'
        );
        foreach ($sites as $s_url) {
            $base_origin = rtrim($s_url, '/');
            foreach (array('/wp-sitemap.xml', '/feed/') as $feed_suffix) {
                $feed_url = $base_origin . $feed_suffix;
                $endpoint = 'https://www.googleapis.com/webmasters/v3/sites/' . rawurlencode($s_url) . '/sitemaps/' . rawurlencode($feed_url);
                wp_remote_request($endpoint, array(
                    'method'   => 'PUT',
                    'timeout'  => 2,
                    'blocking' => false,
                    'headers'  => array(
                        'Authorization'  => 'Bearer ' . $access_token,
                        'Content-Length' => '0'
                    )
                ));
            }
        }
    }

    public static function fetch_external_google_analytics_data($force_refresh = false) {
        $cfg = get_option(self::OPT_ANALYTICS_CFG, array());
        if (!is_array($cfg)) $cfg = array();

        $ga4_mid  = trim((string) ($cfg['ga4MeasurementId'] ?? ''));
        $ga4_pid  = preg_replace('/[^0-9]/', '', (string) ($cfg['ga4PropertyId'] ?? ''));
        $naver_id = trim((string) ($cfg['naverAnalyticsId'] ?? ''));
        $gsc_url  = trim((string) ($cfg['gscSiteUrl'] ?? ''));
        $sa_json  = trim((string) ($cfg['googleServiceAccountJson'] ?? ''));

        $sa_email = '';
        if ($sa_json !== '') {
            $sa_parsed = json_decode($sa_json, true);
            if (is_array($sa_parsed) && !empty($sa_parsed['client_email'])) {
                $sa_email = (string) $sa_parsed['client_email'];
            }
        }

        $result = array(
            'status' => array(
                'hasGa4Tag'           => $ga4_mid !== '',
                'ga4MeasurementId'    => $ga4_mid,
                'ga4PropertyId'       => $ga4_pid,
                'hasNaverTag'         => $naver_id !== '',
                'naverAnalyticsId'    => $naver_id,
                'hasServiceAccount'   => $sa_email !== '',
                'serviceAccountEmail' => $sa_email,
                'gscSiteUrl'          => $gsc_url,
                'ga4ApiConnected'     => false,
                'gscApiConnected'     => false,
                'lastSyncedAt'        => '',
                'lastSyncError'       => ''
            ),
            'ageGroups'   => array(),
            'genders'     => array(),
            'gscKeywords' => array()
        );

        if ($sa_json === '' || ($ga4_pid === '' && $gsc_url === '')) {
            return $result;
        }

        if (!$force_refresh) {
            $cached = get_option(self::OPT_EXT_SYNC_CACHE, null);
            if (is_array($cached) && !empty($cached['expiresAt']) && (int) $cached['expiresAt'] > time() && isset($cached['payload'])) {
                return $cached['payload'];
            }
        }

        $tok_res = self::get_google_service_access_token($sa_json);
        if (empty($tok_res['ok'])) {
            $result['status']['lastSyncError'] = (string) ($tok_res['error'] ?? '인증 오류');
            return $result;
        }
        $access_token = $tok_res['token'];
        $errors = array();

        // 1) GA4 Data API: Age & Gender Breakdown (Last 30 days)
        if ($ga4_pid !== '') {
            $ga_endpoint = 'https://analyticsdata.googleapis.com/v1beta/properties/' . rawurlencode($ga4_pid) . ':batchRunReports';
            $batch_body = array(
                'requests' => array(
                    array(
                        'dateRanges' => array(array('startDate' => '30daysAgo', 'endDate' => 'today')),
                        'dimensions' => array(array('name' => 'userAgeBracket')),
                        'metrics'    => array(array('name' => 'activeUsers'), array('name' => 'sessions'))
                    ),
                    array(
                        'dateRanges' => array(array('startDate' => '30daysAgo', 'endDate' => 'today')),
                        'dimensions' => array(array('name' => 'userGender')),
                        'metrics'    => array(array('name' => 'activeUsers'), array('name' => 'sessions'))
                    )
                )
            );
            $ga_resp = wp_remote_post($ga_endpoint, array(
                'timeout' => 12,
                'headers' => array(
                    'Authorization' => 'Bearer ' . $access_token,
                    'Content-Type'  => 'application/json'
                ),
                'body' => wp_json_encode($batch_body)
            ));
            if (is_wp_error($ga_resp)) {
                $errors[] = 'GA4 API 통신 오류: ' . $ga_resp->get_error_message();
            } else {
                $ga_code = wp_remote_retrieve_response_code($ga_resp);
                $ga_json = json_decode(wp_remote_retrieve_body($ga_resp), true);
                if ($ga_code === 200 && is_array($ga_json) && isset($ga_json['reports'])) {
                    $result['status']['ga4ApiConnected'] = true;
                    $age_label_map = array(
                        '18-24'   => '18~24세 (20대 초반)',
                        '25-34'   => '25~34세 (20대 후반·30대 초반)',
                        '35-44'   => '35~44세 (30대 후반·40대 초반)',
                        '45-54'   => '45~54세 (40대 후반·50대 초반)',
                        '55-64'   => '55~64세 (50대 후반·60대 초반)',
                        '65+'     => '65세 이상 (시니어)',
                        'unknown' => '미분류 (비로그인·신호 미수집)'
                    );
                    $age_rows = $ga_json['reports'][0]['rows'] ?? array();
                    foreach ((array) $age_rows as $ar) {
                        $raw_b = $ar['dimensionValues'][0]['value'] ?? 'unknown';
                        $users = (int) ($ar['metricValues'][0]['value'] ?? 0);
                        $sess  = (int) ($ar['metricValues'][1]['value'] ?? 0);
                        if ($raw_b === '(not set)' || $raw_b === '') $raw_b = 'unknown';
                        $result['ageGroups'][] = array(
                            'bracket'  => $raw_b,
                            'label'    => $age_label_map[$raw_b] ?? $raw_b,
                            'users'    => $users,
                            'sessions' => $sess
                        );
                    }
                    $gender_label_map = array(
                        'female'  => '👩 여성 방문자',
                        'male'    => '👨 남성 방문자',
                        'unknown' => '👤 성별 미분류'
                    );
                    $gen_rows = $ga_json['reports'][1]['rows'] ?? array();
                    foreach ((array) $gen_rows as $gr) {
                        $raw_g = strtolower((string) ($gr['dimensionValues'][0]['value'] ?? 'unknown'));
                        $users = (int) ($gr['metricValues'][0]['value'] ?? 0);
                        $sess  = (int) ($gr['metricValues'][1]['value'] ?? 0);
                        if ($raw_g === '(not set)' || $raw_g === '') $raw_g = 'unknown';
                        $result['genders'][] = array(
                            'gender'   => $raw_g,
                            'label'    => $gender_label_map[$raw_g] ?? $raw_g,
                            'users'    => $users,
                            'sessions' => $sess
                        );
                    }
                } else {
                    $err_detail = $ga_json['error']['message'] ?? ('HTTP ' . $ga_code);
                    $errors[] = 'GA4 속성(' . $ga4_pid . ') 조회 실패: ' . $err_detail;
                }
            }
        }

        // 2) Google Search Console API: Top Search Queries (Last 28 days)
        // Automatically check both https://, http://, and domain variants in GSC and merge them
        if ($gsc_url !== '') {
            $candidate_urls = array($gsc_url);
            $clean_host = preg_replace('#^https?://#i', '', rtrim($gsc_url, '/'));
            $clean_host_nowww = preg_replace('#^www.#i', '', $clean_host);
            $candidate_urls[] = 'https://' . $clean_host . '/';
            $candidate_urls[] = 'http://' . $clean_host . '/';
            $candidate_urls[] = 'https://' . $clean_host_nowww . '/';
            $candidate_urls[] = 'http://' . $clean_host_nowww . '/';
            $candidate_urls[] = 'sc-domain:' . $clean_host_nowww;
            $candidate_urls = array_values(array_unique($candidate_urls));

            $now_ts = current_time('timestamp');
            $gsc_body = array(
                'startDate'  => date('Y-m-d', $now_ts - (28 * 86400)),
                'endDate'    => date('Y-m-d', $now_ts),
                'dimensions' => array('query'),
                'rowLimit'   => 25
            );

            $any_gsc_ok = false;
            $merged_kw  = array();
            $last_gsc_err = '';

            foreach ($candidate_urls as $c_url) {
                $gsc_endpoint = 'https://www.googleapis.com/webmasters/v3/sites/' . rawurlencode($c_url) . '/searchAnalytics/query';
                $gsc_resp = wp_remote_post($gsc_endpoint, array(
                    'timeout' => 10,
                    'headers' => array(
                        'Authorization' => 'Bearer ' . $access_token,
                        'Content-Type'  => 'application/json'
                    ),
                    'body' => wp_json_encode($gsc_body)
                ));
                if (!is_wp_error($gsc_resp)) {
                    $gsc_code = wp_remote_retrieve_response_code($gsc_resp);
                    $gsc_json = json_decode(wp_remote_retrieve_body($gsc_resp), true);
                    if ($gsc_code === 200 && is_array($gsc_json)) {
                        $any_gsc_ok = true;
                        foreach ((array) ($gsc_json['rows'] ?? array()) as $qr) {
                            $kw = trim((string) ($qr['keys'][0] ?? ''));
                            if ($kw === '') continue;
                            if (!isset($merged_kw[$kw])) {
                                $merged_kw[$kw] = array(
                                    'keyword'     => $kw,
                                    'clicks'      => 0,
                                    'impressions' => 0,
                                    'positions'   => array()
                                );
                            }
                            $merged_kw[$kw]['clicks']      += (int) round((float) ($qr['clicks'] ?? 0));
                            $merged_kw[$kw]['impressions'] += (int) round((float) ($qr['impressions'] ?? 0));
                            $merged_kw[$kw]['positions'][]  = (float) ($qr['position'] ?? 1);
                        }
                    } elseif ($gsc_code === 403) {
                        $last_gsc_err = (string) ($gsc_json['error']['message'] ?? '권한 없음');
                    }
                }
            }

            if ($any_gsc_ok) {
                $result['status']['gscApiConnected'] = true;
                $kw_list = array();
                foreach ($merged_kw as $kw => $info) {
                    $avg_pos = !empty($info['positions']) ? round(array_sum($info['positions']) / count($info['positions']), 1) : 1.0;
                    $ctr = $info['impressions'] > 0 ? round(($info['clicks'] / $info['impressions']) * 100, 1) : 0.0;
                    $kw_list[] = array(
                        'keyword'     => $kw,
                        'clicks'      => $info['clicks'],
                        'impressions' => $info['impressions'],
                        'ctr'         => $ctr,
                        'position'    => $avg_pos
                    );
                }
                usort($kw_list, function($a, $b) {
                    if ($b['clicks'] !== $a['clicks']) return $b['clicks'] - $a['clicks'];
                    return $b['impressions'] - $a['impressions'];
                });
                $result['gscKeywords'] = array_slice($kw_list, 0, 25);
            } else {
                $errors[] = '서치콘솔 조회 실패: ' . ($last_gsc_err ?: '사이트 권한을 확인해주세요.');
            }
        }

        $result['status']['lastSyncedAt']  = current_time('mysql');
        $result['status']['lastSyncError'] = implode(' | ', $errors);

        update_option(self::OPT_EXT_SYNC_CACHE, array(
            'expiresAt' => time() + 900,
            'payload'   => $result
        ), false);

        return $result;
    }

    public static function render_external_analytics_head_tags() {
        if (is_admin()) return;
        $cfg = get_option(self::OPT_ANALYTICS_CFG, array());
        if (!is_array($cfg)) return;
        $ga4_mid  = preg_replace('/[^A-Za-z0-9\-]/', '', (string) ($cfg['ga4MeasurementId'] ?? ''));
        $naver_id = preg_replace('/[^A-Za-z0-9_\-]/', '', (string) ($cfg['naverAnalyticsId'] ?? ''));

        if ($ga4_mid !== '') {
            echo "\n<!-- Bareun Stage-2 Google Analytics 4 (GA4 + Google Signals Ready) -->\n";
            echo '<script async src="https://www.googletagmanager.com/gtag/js?id=' . esc_attr($ga4_mid) . '"></script>' . "\n";
            echo '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.__BAREUN_GA4_READY__="' . esc_js($ga4_mid) . '";gtag("js",new Date());gtag("config","' . esc_js($ga4_mid) . '",{allow_google_signals:true});</script>' . "\n";
        }
        if ($naver_id !== '') {
            echo "\n<!-- Bareun Stage-2 Naver Analytics (WCS) -->\n";
            echo '<script src="https://wcs.naver.net/wcslog.js"></script>' . "\n";
            echo '<script>window.__BAREUN_NAVER_WCS_READY__="' . esc_js($naver_id) . '";if(!window.wcs_add)window.wcs_add={};window.wcs_add["wa"]="' . esc_js($naver_id) . '";if(window.wcs&&typeof window.wcs_do==="function"){window.wcs_do();}</script>' . "\n";
        }
    }

    public static function handle_get_analytics_public_config(\WP_REST_Request $request) {
        self::send_nocache();
        $cfg = get_option(self::OPT_ANALYTICS_CFG, array());
        if (!is_array($cfg)) $cfg = array();
        return new \WP_REST_Response(array(
            'ok'               => true,
            'ga4MeasurementId' => sanitize_text_field($cfg['ga4MeasurementId'] ?? ''),
            'naverAnalyticsId' => sanitize_text_field($cfg['naverAnalyticsId'] ?? '')
        ), 200);
    }

    public static function handle_get_analytics_settings(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor || empty($actor['isMaster'])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 권한이 필요합니다.'), 403);
        }
        $cfg = get_option(self::OPT_ANALYTICS_CFG, array());
        if (!is_array($cfg)) $cfg = array();
        $ext = self::fetch_external_google_analytics_data(false);
        return new \WP_REST_Response(array(
            'ok'       => true,
            'settings' => array(
                'ga4MeasurementId'    => (string) ($cfg['ga4MeasurementId'] ?? ''),
                'ga4PropertyId'       => (string) ($cfg['ga4PropertyId'] ?? ''),
                'naverAnalyticsId'    => (string) ($cfg['naverAnalyticsId'] ?? ''),
                'gscSiteUrl'          => (string) ($cfg['gscSiteUrl'] ?? 'https://www.bareunhaniwon.com/'),
                'hasServiceAccount'   => !empty($ext['status']['hasServiceAccount']),
                'serviceAccountEmail' => (string) ($ext['status']['serviceAccountEmail'] ?? '')
            ),
            'external' => $ext
        ), 200);
    }

    public static function handle_save_analytics_settings(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor || empty($actor['isMaster'])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 권한이 필요합니다.'), 403);
        }
        $params = $request->get_json_params();
        $prev   = get_option(self::OPT_ANALYTICS_CFG, array());
        if (!is_array($prev)) $prev = array();

        $next = array(
            'ga4MeasurementId'         => isset($params['ga4MeasurementId']) ? sanitize_text_field($params['ga4MeasurementId']) : ($prev['ga4MeasurementId'] ?? ''),
            'ga4PropertyId'            => isset($params['ga4PropertyId']) ? preg_replace('/[^0-9]/', '', (string) $params['ga4PropertyId']) : ($prev['ga4PropertyId'] ?? ''),
            'naverAnalyticsId'         => isset($params['naverAnalyticsId']) ? sanitize_text_field($params['naverAnalyticsId']) : ($prev['naverAnalyticsId'] ?? ''),
            'gscSiteUrl'               => isset($params['gscSiteUrl']) ? esc_url_raw(trim((string) $params['gscSiteUrl'])) : ($prev['gscSiteUrl'] ?? 'https://www.bareunhaniwon.com/'),
            'googleServiceAccountJson' => $prev['googleServiceAccountJson'] ?? ''
        );
        // Support sc-domain:bareunhaniwon.com syntax in gscSiteUrl
        if (isset($params['gscSiteUrl']) && strpos(trim((string) $params['gscSiteUrl']), 'sc-domain:') === 0) {
            $next['gscSiteUrl'] = sanitize_text_field(trim((string) $params['gscSiteUrl']));
        }
        if (!empty($params['clearServiceAccount'])) {
            $next['googleServiceAccountJson'] = '';
        } elseif (isset($params['googleServiceAccountJson']) && trim((string) $params['googleServiceAccountJson']) !== '') {
            $next['googleServiceAccountJson'] = trim((string) $params['googleServiceAccountJson']);
        }

        update_option(self::OPT_ANALYTICS_CFG, $next, false);
        delete_option(self::OPT_EXT_SYNC_CACHE);

        $ext = self::fetch_external_google_analytics_data(true);
        return new \WP_REST_Response(array(
            'ok'       => true,
            'message'  => '외부 통계(GA4 · 서치콘솔 · 네이버 애널리틱스) 설정이 저장 및 동기화되었습니다.',
            'external' => $ext,
            'summary'  => self::build_visit_summary(true)
        ), 200);
    }

    public static function handle_track_visit_event(\WP_REST_Request $request) {
        self::send_nocache();
        $params = $request->get_json_params();
        $action = sanitize_key($params['action'] ?? '');
        $allowed = array(
            'tel_click'           => '📞 전화상담 연결 클릭',
            'kakao_click'         => '💬 카카오톡 예약·상담 클릭',
            'naver_booking_click' => '📍 네이버 예약 바로가기 클릭',
            'nav_naver'           => '🧭 네이버지도 길안내 출발',
            'nav_google'          => '🧭 구글지도 길안내 출발',
            'nav_tmap'            => '🧭 티맵(TMAP) 길안내 출발',
            'nav_kakao'           => '🧭 카카오맵 길안내 출발',
            'consult_modal_open'  => '📝 간편 예약·자가진단 모달 열기'
        );
        if (!isset($allowed[$action])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '알 수 없는 이벤트 코드입니다.'), 400);
        }

        $slug   = self::normalize_page_slug($params['pageSlug'] ?? 'home');
        $device = sanitize_key($params['deviceType'] ?? 'desktop');
        if (!in_array($device, array('mobile', 'tablet', 'desktop'), true)) $device = 'desktop';
        $ua     = substr(sanitize_text_field($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 240);
        $attr   = self::parse_visit_attribution(
            $params['referrer'] ?? '',
            $ua,
            $params['landingSearch'] ?? '',
            $params['aiHint'] ?? ''
        );
        if (!empty($params['sessionPlatform'])) {
            $attr['platform'] = sanitize_text_field($params['sessionPlatform']);
        }
        if (!empty($params['sessionAiEngine'])) {
            $attr['aiEngine'] = sanitize_text_field($params['sessionAiEngine']);
        }

        $now_ts = current_time('timestamp');
        $today  = date('Y-m-d', $now_ts);
        $hour   = (int) date('G', $now_ts);
        $now_mysql = date('Y-m-d H:i:s', $now_ts);

        $store = get_option(self::OPT_CONVERSION_LOGS, array());
        if (!is_array($store)) $store = array();
        $store['cumTotal'] = (int) ($store['cumTotal'] ?? 0) + 1;
        if (empty($store['byAction']) || !is_array($store['byAction'])) $store['byAction'] = array();
        $store['byAction'][$action] = (int) ($store['byAction'][$action] ?? 0) + 1;

        if (empty($store['events']) || !is_array($store['events'])) $store['events'] = array();
        array_unshift($store['events'], array(
            'action'      => $action,
            'actionLabel' => $allowed[$action],
            'pageSlug'    => $slug,
            'platform'    => $attr['platform'],
            'aiEngine'    => $attr['aiEngine'],
            'deviceType'  => $device,
            'hour'        => $hour,
            'visitDate'   => $today,
            'createdAt'   => $now_mysql
        ));
        if (count($store['events']) > 500) {
            $store['events'] = array_slice($store['events'], 0, 500);
        }
        update_option(self::OPT_CONVERSION_LOGS, $store, false);

        return new \WP_REST_Response(array('ok' => true), 200);
    }

    private static function build_visit_summary($include_master_logs = false, $force_ext_refresh = false) {
        self::maybe_ensure_schema();
        global $wpdb;
        $vtable   = self::visits_table_name();
        $base_cnt = (int) get_option(self::OPT_VISIT_BASE, 14820);

        $now_ts     = current_time('timestamp');
        $today_date = date('Y-m-d', $now_ts);
        $total_db   = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$vtable}");
        $today_pv   = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$vtable} WHERE visit_date = %s", $today_date));

        // Consumer public mode: return ONLY todayPv & totalPv (strictly zero detailed analytics exposed)
        if (!$include_master_logs) {
            return array(
                'ok'         => true,
                'isMaster'   => false,
                'todayPv'    => $today_pv,
                'totalPv'    => $base_cnt + $total_db,
                'serverTime' => current_time('mysql')
            );
        }

        $yesterday_date = date('Y-m-d', $now_ts - 86400);
        $week_ago_date  = date('Y-m-d', $now_ts - (6 * 86400));
        $month_ago_date = date('Y-m-d', $now_ts - (29 * 86400));
        $active_since   = date('Y-m-d H:i:s', $now_ts - 900);

        $total_uv_db    = (int) $wpdb->get_var("SELECT COUNT(DISTINCT visitor_hash) FROM {$vtable}");
        $today_uv       = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(DISTINCT visitor_hash) FROM {$vtable} WHERE visit_date = %s", $today_date));
        $yesterday_pv   = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$vtable} WHERE visit_date = %s", $yesterday_date));
        $yesterday_uv   = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(DISTINCT visitor_hash) FROM {$vtable} WHERE visit_date = %s", $yesterday_date));
        $week_pv        = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$vtable} WHERE visit_date >= %s", $week_ago_date));
        $month_pv       = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$vtable} WHERE visit_date >= %s", $month_ago_date));
        $active_now     = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(DISTINCT visitor_hash) FROM {$vtable} WHERE created_at >= %s", $active_since));
        if ($active_now < 1) {
            $active_now = 1;
        }

        // 1) Daily series (last 14 days)
        $daily_rows = $wpdb->get_results($wpdb->prepare(
            "SELECT visit_date, COUNT(*) as pv, COUNT(DISTINCT visitor_hash) as uv FROM {$vtable} WHERE visit_date >= %s GROUP BY visit_date ORDER BY visit_date ASC",
            date('Y-m-d', $now_ts - (13 * 86400))
        ), ARRAY_A);
        $daily_map = array();
        foreach ((array) $daily_rows as $dr) {
            $daily_map[$dr['visit_date']] = array(
                'pv' => (int) $dr['pv'],
                'uv' => (int) $dr['uv']
            );
        }
        $daily_series = array();
        for ($d = 13; $d >= 0; $d--) {
            $dt = date('Y-m-d', $now_ts - ($d * 86400));
            $daily_series[] = array(
                'date'  => $dt,
                'label' => substr($dt, 5),
                'pv'    => isset($daily_map[$dt]) ? $daily_map[$dt]['pv'] : 0,
                'uv'    => isset($daily_map[$dt]) ? $daily_map[$dt]['uv'] : 0
            );
        }

        // 2) Hourly distribution (00시 ~ 23시 KST) & Peak Hour
        $hour_rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT HOUR(created_at) as hr, COUNT(*) as pv, COUNT(DISTINCT visitor_hash) as uv,
                 SUM(CASE WHEN visit_date = %s THEN 1 ELSE 0 END) as today_pv
                 FROM {$vtable} GROUP BY HOUR(created_at) ORDER BY hr ASC",
                $today_date
            ),
            ARRAY_A
        );
        $hour_map = array();
        foreach ((array) $hour_rows as $hr) {
            $h_idx = (int) $hr['hr'];
            $hour_map[$h_idx] = array(
                'pv'      => (int) $hr['pv'],
                'uv'      => (int) $hr['uv'],
                'todayPv' => (int) $hr['today_pv']
            );
        }
        $hourly_series = array();
        $peak_hour = array('hour' => 20, 'label' => '20시', 'pv' => 0);
        $period_buckets = array('morning' => 0, 'afternoon' => 0, 'evening' => 0, 'night' => 0);
        for ($h = 0; $h < 24; $h++) {
            $hpv = isset($hour_map[$h]) ? $hour_map[$h]['pv'] : 0;
            $huv = isset($hour_map[$h]) ? $hour_map[$h]['uv'] : 0;
            $htd = isset($hour_map[$h]) ? $hour_map[$h]['todayPv'] : 0;
            $lbl = sprintf('%02d시', $h);
            $hourly_series[] = array(
                'hour'    => $h,
                'label'   => $lbl,
                'pv'      => $hpv,
                'uv'      => $huv,
                'todayPv' => $htd
            );
            if ($hpv >= $peak_hour['pv']) {
                $peak_hour = array('hour' => $h, 'label' => $lbl, 'pv' => $hpv);
            }
            if ($h >= 6 && $h < 12) $period_buckets['morning'] += $hpv;
            elseif ($h >= 12 && $h < 18) $period_buckets['afternoon'] += $hpv;
            elseif ($h >= 18 && $h <= 23) $period_buckets['evening'] += $hpv;
            else $period_buckets['night'] += $hpv;
        }

        // 3) Day-of-week distribution (월 ~ 일)
        $dow_rows = $wpdb->get_results("SELECT DAYOFWEEK(created_at) as dow, COUNT(*) as pv FROM {$vtable} GROUP BY DAYOFWEEK(created_at)", ARRAY_A);
        $dow_map = array();
        foreach ((array) $dow_rows as $dw) {
            $dow_map[(int) $dw['dow']] = (int) $dw['pv'];
        }
        // MySQL DAYOFWEEK: 1=일, 2=월, 3=화, 4=수, 5=목, 6=금, 7=토
        $dow_order = array(
            array('dow' => 2, 'label' => '월요일'),
            array('dow' => 3, 'label' => '화요일'),
            array('dow' => 4, 'label' => '수요일'),
            array('dow' => 5, 'label' => '목요일'),
            array('dow' => 6, 'label' => '금요일'),
            array('dow' => 7, 'label' => '토요일'),
            array('dow' => 1, 'label' => '일요일')
        );
        $weekday_series = array();
        foreach ($dow_order as $ditem) {
            $weekday_series[] = array(
                'label' => $ditem['label'],
                'pv'    => isset($dow_map[$ditem['dow']]) ? $dow_map[$ditem['dow']] : 0
            );
        }

        // 4) Top pages + Clinical Cohort Distribution
        $title_map = self::get_page_title_map();
        $page_rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT page_slug, MAX(page_title) as page_title, COUNT(*) as pv, COUNT(DISTINCT visitor_hash) as uv,
                 SUM(CASE WHEN visit_date = %s THEN 1 ELSE 0 END) as today_pv
                 FROM {$vtable} GROUP BY page_slug ORDER BY pv DESC",
                $today_date
            ),
            ARRAY_A
        );
        $top_pages   = array();
        $cohort_sums = array();
        foreach ((array) $page_rows as $idx => $pr) {
            $slug = $pr['page_slug'];
            $pv_c = (int) $pr['pv'];
            if ($idx < 20) {
                $top_pages[] = array(
                    'slug'    => $slug,
                    'title'   => isset($title_map[$slug]) ? $title_map[$slug] : ($pr['page_title'] ?: $slug),
                    'pv'      => $pv_c,
                    'uv'      => (int) $pr['uv'],
                    'todayPv' => (int) $pr['today_pv']
                );
            }
            $cohort_name = self::classify_clinical_cohort($slug);
            $cohort_sums[$cohort_name] = (int) ($cohort_sums[$cohort_name] ?? 0) + $pv_c;
        }
        arsort($cohort_sums);
        $clinical_cohorts = array();
        $denom_db = max(1, $total_db);
        foreach ($cohort_sums as $clabel => $ccnt) {
            $clinical_cohorts[] = array(
                'cohort' => $clabel,
                'count'  => $ccnt,
                'pct'    => round(($ccnt / $denom_db) * 100, 1)
            );
        }

        // 5) Device breakdown
        $dev_rows = $wpdb->get_results("SELECT device_type, COUNT(*) as cnt FROM {$vtable} GROUP BY device_type ORDER BY cnt DESC", ARRAY_A);
        $devices = array();
        foreach ((array) $dev_rows as $dv) {
            $devices[] = array(
                'device' => $dv['device_type'] ?: 'desktop',
                'count'  => (int) $dv['cnt'],
                'pct'    => round((((int) $dv['cnt']) / $denom_db) * 100, 1)
            );
        }

        // 6) Granular 14-Channel Platform Breakdown
        $plat_rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT CASE WHEN platform != '' THEN platform ELSE referrer END as plat,
                 COUNT(*) as cnt,
                 SUM(CASE WHEN visit_date = %s THEN 1 ELSE 0 END) as today_cnt
                 FROM {$vtable} GROUP BY plat ORDER BY cnt DESC LIMIT 20",
                $today_date
            ),
            ARRAY_A
        );
        $platforms = array();
        $referrers = array();
        foreach ((array) $plat_rows as $pr) {
            $pl = $pr['plat'] ?: '🔗 직접 접속 · 북마크';
            $cnt = (int) $pr['cnt'];
            $tcnt = (int) $pr['today_cnt'];
            $platforms[] = array(
                'platform'   => $pl,
                'count'      => $cnt,
                'todayCount' => $tcnt,
                'pct'        => round(($cnt / $denom_db) * 100, 1)
            );
            $referrers[] = array(
                'referrer' => $pl,
                'count'    => $cnt
            );
        }

        // 7) Dedicated GEO AI Search Referral + AI Citation Bot Monitor
        $ai_rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT ai_engine, COUNT(*) as cnt,
                 SUM(CASE WHEN visit_date = %s THEN 1 ELSE 0 END) as today_cnt
                 FROM {$vtable} WHERE ai_engine != '' GROUP BY ai_engine ORDER BY cnt DESC",
                $today_date
            ),
            ARRAY_A
        );
        $ai_total_human = 0;
        $ai_today_human = 0;
        $ai_by_engine   = array();
        foreach ((array) $ai_rows as $ar) {
            $c  = (int) $ar['cnt'];
            $tc = (int) $ar['today_cnt'];
            $ai_total_human += $c;
            $ai_today_human += $tc;
            $ai_by_engine[] = array(
                'engine'     => $ar['ai_engine'],
                'count'      => $c,
                'todayCount' => $tc
            );
        }
        $ai_page_rows = $wpdb->get_results(
            "SELECT page_slug, MAX(page_title) as page_title, COUNT(*) as cnt FROM {$vtable} WHERE ai_engine != '' GROUP BY page_slug ORDER BY cnt DESC LIMIT 10",
            ARRAY_A
        );
        $ai_landing_pages = array();
        foreach ((array) $ai_page_rows as $apr) {
            $ps = $apr['page_slug'];
            $ai_landing_pages[] = array(
                'slug'  => $ps,
                'title' => isset($title_map[$ps]) ? $title_map[$ps] : ($apr['page_title'] ?: $ps),
                'count' => (int) $apr['cnt']
            );
        }
        $ai_recent_rows = $wpdb->get_results(
            "SELECT id, page_slug, page_title, ai_engine, search_keyword, raw_referrer, client_ip, device_type, created_at FROM {$vtable} WHERE ai_engine != '' ORDER BY id DESC LIMIT 25",
            ARRAY_A
        );
        $ai_recent_visits = array();
        foreach ((array) $ai_recent_rows as $arr) {
            $ps = $arr['page_slug'];
            $ai_recent_visits[] = array(
                'id'            => (int) $arr['id'],
                'pageSlug'      => $ps,
                'pageTitle'     => isset($title_map[$ps]) ? $title_map[$ps] : ($arr['page_title'] ?: $ps),
                'aiEngine'      => $arr['ai_engine'],
                'searchKeyword' => $arr['search_keyword'] ?? '',
                'rawReferrer'   => $arr['raw_referrer'] ?? '',
                'clientIp'      => $arr['client_ip'],
                'deviceType'    => $arr['device_type'],
                'createdAt'     => $arr['created_at']
            );
        }

        $bot_raw = get_option(self::OPT_GEO_BOT_STATS, array());
        if (!is_array($bot_raw)) $bot_raw = array();
        $bot_list = array();
        foreach ((array) ($bot_raw['byBot'] ?? array()) as $bname => $binfo) {
            $bot_list[] = array(
                'bot'        => $bname,
                'total'      => (int) ($binfo['total'] ?? 0),
                'todayCount' => (($binfo['todayDate'] ?? '') === $today_date) ? (int) ($binfo['today'] ?? 0) : 0,
                'lastSeen'   => (string) ($binfo['lastSeen'] ?? '')
            );
        }
        usort($bot_list, function ($a, $b) { return $b['total'] - $a['total']; });
        $bot_paths = array();
        foreach ((array) ($bot_raw['byPath'] ?? array()) as $bpath => $bcnt) {
            $bot_paths[] = array('path' => $bpath, 'count' => (int) $bcnt);
        }
        usort($bot_paths, function ($a, $b) { return $b['count'] - $a['count']; });

        $geo_ai = array(
            'totalHumanVisits' => $ai_total_human,
            'todayHumanVisits' => $ai_today_human,
            'sharePct'         => round(($ai_total_human / $denom_db) * 100, 1),
            'byEngine'         => $ai_by_engine,
            'topLandingPages'  => $ai_landing_pages,
            'recentAiVisits'   => $ai_recent_visits,
            'botStats'         => array(
                'totalHits'  => (int) ($bot_raw['totalHits'] ?? 0),
                'todayHits'  => (int) ($bot_raw['dailyHits'][$today_date] ?? 0),
                'byBot'      => $bot_list,
                'topPaths'   => array_slice($bot_paths, 0, 12),
                'recentHits' => array_slice((array) ($bot_raw['recentHits'] ?? array()), 0, 30)
            )
        );

        // 8) First-party captured search keywords + Stage 2 Google Search Console & GA4 Demographics
        $kw_rows = $wpdb->get_results(
            "SELECT search_keyword, MAX(platform) as platform, COUNT(*) as cnt FROM {$vtable} WHERE search_keyword != '' GROUP BY search_keyword ORDER BY cnt DESC LIMIT 25",
            ARRAY_A
        );
        $captured_keywords = array();
        foreach ((array) $kw_rows as $kr) {
            $captured_keywords[] = array(
                'keyword'  => $kr['search_keyword'],
                'platform' => $kr['platform'] ?: '검색 유입',
                'count'    => (int) $kr['cnt']
            );
        }

        $ext_data = self::fetch_external_google_analytics_data($force_ext_refresh);

        // 9) Conversion Click Events Summary
        $conv_store = get_option(self::OPT_CONVERSION_LOGS, array());
        if (!is_array($conv_store)) $conv_store = array();
        $conv_events = is_array($conv_store['events'] ?? null) ? $conv_store['events'] : array();
        $conv_today  = 0;
        $conv_by_plat = array();
        foreach ($conv_events as $cev) {
            if (($cev['visitDate'] ?? '') === $today_date) {
                $conv_today++;
            }
            $cp = $cev['platform'] ?: '기타';
            $conv_by_plat[$cp] = (int) ($conv_by_plat[$cp] ?? 0) + 1;
        }
        arsort($conv_by_plat);
        $conv_plat_list = array();
        foreach ($conv_by_plat as $cp_name => $cp_cnt) {
            $conv_plat_list[] = array('platform' => $cp_name, 'count' => $cp_cnt);
        }
        $action_labels = array(
            'tel_click'           => '📞 전화상담 연결',
            'kakao_click'         => '💬 카카오톡 예약·상담',
            'naver_booking_click' => '📍 네이버 예약 바로가기',
            'nav_naver'           => '🧭 네이버지도 길안내',
            'nav_google'          => '🧭 구글지도 길안내',
            'nav_tmap'            => '🧭 티맵(TMAP) 길안내',
            'nav_kakao'           => '🧭 카카오맵 길안내',
            'consult_modal_open'  => '📝 간편 예약모달 오픈'
        );
        $conv_by_action = array();
        foreach ($action_labels as $ac_key => $ac_lbl) {
            $ac_cnt = (int) ($conv_store['byAction'][$ac_key] ?? 0);
            $conv_by_action[] = array(
                'action' => $ac_key,
                'label'  => $ac_lbl,
                'count'  => $ac_cnt
            );
        }

        $summary = array(
            'ok'                   => true,
            'isMaster'             => true,
            'totalPv'              => $base_cnt + $total_db,
            'rawDbPv'              => $total_db,
            'baseOffset'           => $base_cnt,
            'totalUv'              => (int) round($base_cnt * 0.64) + $total_uv_db,
            'todayPv'              => $today_pv,
            'todayUv'              => $today_uv,
            'yesterdayPv'          => $yesterday_pv,
            'yesterdayUv'          => $yesterday_uv,
            'weekPv'               => $week_pv,
            'monthPv'              => $month_pv,
            'activeNow'            => $active_now,
            'dailySeries'          => $daily_series,
            'hourlySeries'         => $hourly_series,
            'peakHour'             => $peak_hour,
            'periodBuckets'        => $period_buckets,
            'weekdaySeries'        => $weekday_series,
            'topPages'             => $top_pages,
            'devices'              => $devices,
            'platforms'            => $platforms,
            'referrers'            => array_slice($referrers, 0, 10),
            'geoAi'                => $geo_ai,
            'searchKeywords'       => array(
                'capturedKeywords' => $captured_keywords,
                'gscKeywords'      => $ext_data['gscKeywords']
            ),
            'demographics'         => array(
                'ga4Connected'    => !empty($ext_data['status']['ga4ApiConnected']),
                'ageGroups'       => $ext_data['ageGroups'],
                'genders'         => $ext_data['genders'],
                'clinicalCohorts' => $clinical_cohorts
            ),
            'conversions'          => array(
                'todayTotal'   => $conv_today,
                'cumTotal'     => (int) ($conv_store['cumTotal'] ?? 0),
                'byAction'     => $conv_by_action,
                'byPlatform'   => array_slice($conv_plat_list, 0, 10),
                'recentEvents' => array_slice($conv_events, 0, 40)
            ),
            'externalConfigStatus' => $ext_data['status'],
            'serverTime'           => current_time('mysql')
        );

        $logs_raw = $wpdb->get_results("SELECT * FROM {$vtable} ORDER BY id DESC LIMIT 80", ARRAY_A);
        $recent_logs = array();
        foreach ((array) $logs_raw as $lr) {
            $slug = $lr['page_slug'];
            $recent_logs[] = array(
                'id'            => (int) $lr['id'],
                'pageSlug'      => $slug,
                'pageTitle'     => isset($title_map[$slug]) ? $title_map[$slug] : ($lr['page_title'] ?: $slug),
                'clientIp'      => $lr['client_ip'],
                'deviceType'    => $lr['device_type'],
                'platform'      => !empty($lr['platform']) ? $lr['platform'] : $lr['referrer'],
                'aiEngine'      => $lr['ai_engine'] ?? '',
                'searchKeyword' => $lr['search_keyword'] ?? '',
                'referrer'      => !empty($lr['platform']) ? $lr['platform'] : $lr['referrer'],
                'rawReferrer'   => $lr['raw_referrer'] ?? '',
                'userAgent'     => $lr['user_agent'],
                'createdAt'     => $lr['created_at']
            );
        }
        $summary['recentLogs'] = $recent_logs;

        return $summary;
    }

    public static function handle_get_visits(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        $is_master = $actor && !empty($actor['isMaster']);
        return new \WP_REST_Response(self::build_visit_summary($is_master), 200);
    }

    public static function handle_track_visit(\WP_REST_Request $request) {
        self::send_nocache();
        self::maybe_ensure_schema();
        global $wpdb;
        $vtable = self::visits_table_name();

        $params        = $request->get_json_params();
        $slug          = self::normalize_page_slug($params['pageSlug'] ?? 'home');
        $title_map     = self::get_page_title_map();
        $page_title    = isset($title_map[$slug]) ? $title_map[$slug] : sanitize_text_field($params['pageTitle'] ?? $slug);
        $device        = sanitize_key($params['deviceType'] ?? 'desktop');
        if (!in_array($device, array('mobile', 'tablet', 'desktop'), true)) {
            $device = 'desktop';
        }
        $raw_ref       = trim((string) ($params['referrer'] ?? ''));
        $landing_query = substr(sanitize_text_field($params['landingSearch'] ?? ''), 0, 250);
        $ai_hint       = sanitize_text_field($params['aiHint'] ?? '');

        $ip = sanitize_text_field($_SERVER['HTTP_X_FORWARDED_FOR'] ?? ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'));
        if (strpos($ip, ',') !== false) {
            $ip = trim(explode(',', $ip)[0]);
        }
        $ua = substr(sanitize_text_field($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 240);

        // If an AI search crawler executes JS or hits this endpoint, log to GEO bot monitor without inflating human PV
        $bot_name = self::detect_geo_ai_crawler($ua);
        if ($bot_name !== '') {
            self::record_geo_ai_crawler_hit($bot_name, '/' . $slug, $ip);
            $actor = self::get_current_actor($request);
            $is_master = $actor && !empty($actor['isMaster']);
            return new \WP_REST_Response(self::build_visit_summary($is_master), 200);
        }

        $attr = self::parse_visit_attribution($raw_ref, $ua, $landing_query, $ai_hint);

        $vid = sanitize_text_field($params['visitorId'] ?? '');
        $today_date = current_time('Y-m-d');
        $vhash = substr(md5($today_date . '|' . $ip . '|' . ($vid ?: $ua)), 0, 16);

        $wpdb->insert($vtable, array(
            'visit_date'     => $today_date,
            'page_slug'      => $slug,
            'page_title'     => $page_title,
            'visitor_hash'   => $vhash,
            'client_ip'      => $ip,
            'device_type'    => $device,
            'referrer'       => substr($attr['shortRef'], 0, 240),
            'raw_referrer'   => substr($raw_ref, 0, 1000),
            'landing_query'  => $landing_query,
            'platform'       => $attr['platform'],
            'ai_engine'      => $attr['aiEngine'],
            'search_keyword' => $attr['searchKeyword'],
            'user_agent'     => $ua,
            'created_at'     => current_time('mysql')
        ));

        $actor = self::get_current_actor($request);
        $is_master = $actor && !empty($actor['isMaster']);
        return new \WP_REST_Response(self::build_visit_summary($is_master), 200);
    }

    public static function handle_master_visits(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor || empty($actor['isMaster'])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 권한이 필요합니다.'), 403);
        }
        $force = $request->get_param('forceRefresh') === '1';
        return new \WP_REST_Response(self::build_visit_summary(true, $force), 200);
    }

    public static function handle_adjust_visits(\WP_REST_Request $request) {
        self::send_nocache();
        $actor = self::get_current_actor($request);
        if (!$actor || empty($actor['isMaster'])) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 권한이 필요합니다.'), 403);
        }
        $params = $request->get_json_params();
        if (isset($params['baseOffset'])) {
            $new_base = max(0, (int) $params['baseOffset']);
            update_option(self::OPT_VISIT_BASE, $new_base);
        }
        return new \WP_REST_Response(self::build_visit_summary(true), 200);
    }

    private static function get_body_part_meta_list() {
        return array(
            array('partId' => 'knee',       'partLabel' => '무릎 성장판',      'targetReader' => '초등학생 자녀를 둔 학부모',   'themes' => array('소아 비만', '성조숙증 예방과 야식', '성장호르몬과 밤중 입호흡', '줄넘기 운동과 성장통 구별')),
            array('partId' => 'cervical',   'partLabel' => '뒷목 · 두피 혈관', 'targetReader' => '머리카락이 가늘어진 직장인',  'themes' => array('두피 열감과 정수리 탈모', '거북목과 뒷목 뻐근함', '저녁 머리 감기와 수면 재생')),
            array('partId' => 'lumbar',     'partLabel' => '허리 · 골반 마디', 'targetReader' => '오래 앉아 일하는 직장인',     'themes' => array('허리 통증과 다리 저림', '다리 꼬기와 골반 틀어짐', '아침 기상 직후 급성 허리 뻐근함')),
            array('partId' => 'gongjindan', 'partLabel' => '심장 · 뇌 활력축', 'targetReader' => '만성 피로에 지친 현대인',     'themes' => array('자도 안 풀리는 만성 피로', '오후 멍함과 집중력 저하', '수험생 · 직장인 체력 고갈')),
            array('partId' => 'syncope',    'partLabel' => '자율신경 · 뇌혈류','targetReader' => '어지럼과 불면을 겪는 성인',   'themes' => array('갑자기 눈앞이 아찔한 어지럼증', '새벽에 자꾸 깨는 얕은 잠', '관자놀이 지끈거리는 편두통')),
            array('partId' => 'digest',     'partLabel' => '위장 · 식도 근육', 'targetReader' => '식후 더부룩함이 잦은 성인',   'themes' => array('검사상 정상인데 막히는 소화불량', '목 이물감과 신물 역류', '급하게 먹는 습관과 배 가스')),
            array('partId' => 'gut',        'partLabel' => '복부 · 대사 순환', 'targetReader' => '체중 감량 정체기를 겪는 성인','themes' => array('굶어도 안 빠지는 나잇살', '저녁 가짜 배고픔과 단 음식 유혹', '저녁마다 붓는 종아리 부종')),
            array('partId' => 'uterus',     'partLabel' => '아랫배 · 골반 순환','targetReader' => '생리통과 임신을 준비하는 여성','themes' => array('손발 · 아랫배 냉증과 생리통', '임신 준비기 골반 순환과 수면', '출산 후 손목 · 발목 시림')),
            array('partId' => 'prostate',   'partLabel' => '방광 · 골반 바닥근','targetReader' => '야간 소변으로 잠을 설치는 중장년','themes' => array('새벽 잠 깨우는 야간뇨', '오래 앉은 뒤 묵직한 잔뇨감', '기침할 때 새는 민감한 방광'))
        );
    }

    private static function resolve_active_gemini_key() {
        $cfg = get_option(self::OPT_NOTES_CFG, array());
        $k = is_array($cfg) ? trim((string) ($cfg['geminiApiKey'] ?? '')) : '';
        if ($k !== '') {
            return $k;
        }
        $studio_keys = get_option('bareun_studio_ai_keys_v1', array());
        if (is_array($studio_keys) && !empty($studio_keys['geminiKey'])) {
            return trim((string) $studio_keys['geminiKey']);
        }
        return '';
    }

    public static function validate_body_note_three_stage($note) {
        $errors = array();
        if (!is_array($note)) {
            return array('passed' => false, 'errors' => array('노트 데이터 형식이 올바르지 않습니다.'));
        }
        $title   = trim((string) ($note['questionTitle'] ?? ($note['title'] ?? '')));
        $keyword = trim((string) ($note['keyword'] ?? ''));
        $empathy = isset($note['empathyLines']) && is_array($note['empathyLines'])
            ? array_values($note['empathyLines'])
            : (isset($note['empathy']) && is_array($note['empathy']) ? array_values($note['empathy']) : array());
        $truth   = isset($note['truthLines']) && is_array($note['truthLines'])
            ? array_values($note['truthLines'])
            : (isset($note['truth']) && is_array($note['truth']) ? array_values($note['truth']) : array());
        $myth    = isset($note['mythLines']) && is_array($note['mythLines'])
            ? array_values($note['mythLines'])
            : (isset($note['myth']) && is_array($note['myth']) ? array_values($note['myth']) : array());
        $check   = isset($note['checkItems']) && is_array($note['checkItems'])
            ? array_values($note['checkItems'])
            : (isset($note['check']) && is_array($note['check']) ? array_values($note['check']) : array());

        if ($title === '' || strpos($title, '?') === false) {
            $errors[] = '[1차·형식] 제목은 일상적인 질문형 문장(?)이어야 합니다.';
        }
        if (count($empathy) !== 2 || count($truth) !== 2 || count($myth) !== 2 || count($check) !== 2) {
            $errors[] = '[1차·형식] 1~4번 항목은 각각 정확히 2줄(관찰 기준 2가지)이어야 합니다.';
        }

        $extra_chunks = array(
            (string) ($note['seoTitle'] ?? ''),
            (string) ($note['directAnswer'] ?? ''),
            (string) ($note['empathyIllustCaption'] ?? ''),
            (string) ($note['deepIllustCaption'] ?? ''),
            (string) ($note['routineIllustCaption'] ?? '')
        );
        if (!empty($note['deepMechanism']) && is_array($note['deepMechanism'])) {
            foreach ($note['deepMechanism'] as $dm) {
                $extra_chunks[] = (string) $dm;
            }
        }
        if (!empty($note['consumerKeywords']) && is_array($note['consumerKeywords'])) {
            foreach ($note['consumerKeywords'] as $ckw) {
                $extra_chunks[] = (string) $ckw;
            }
        }
        if (!empty($note['faqItems']) && is_array($note['faqItems'])) {
            foreach ($note['faqItems'] as $fq) {
                if (is_array($fq)) {
                    $extra_chunks[] = (string) ($fq['q'] ?? '');
                    $extra_chunks[] = (string) ($fq['a'] ?? '');
                }
            }
        }

        $joined = implode(' ', array_merge(array($title), $empathy, $truth, $myth, $check, $extra_chunks));

        // 2차 검수: 의료법 제56조 및 상업적 CTA 완전 배제
        $forbidden_promo = array(
            '완치', '100%', '최고', '최초', '유일', '특효', '무조건', '보장',
            '예약', '내원', '방문해', '상담받', '문의하', '바른한의원', '원장',
            '할인', '이벤트', '치료 프로그램', '처방받'
        );
        foreach ($forbidden_promo as $word) {
            if (strpos($joined, $word) !== false) {
                $errors[] = '[2차·의료법] 상업적·단정적 금지어 검출: ' . $word;
            }
        }

        // 3차 검수: 어려운 전문 용어 순화 점검 및 핵심 키워드 자연 포함 확인
        $forbidden_jargon = array(
            '대퇴골', '골단판', '아로마타제', '추간판', '수핵', '후두하근',
            '모유두', '나선동맥', '시상하부', '내장지방세포', '배뇨근', '장상피화생'
        );
        foreach ($forbidden_jargon as $jargon) {
            if (strpos($joined, $jargon) !== false) {
                $errors[] = '[3차·어휘순화] 미순화 전문 용어 검출: ' . $jargon;
            }
        }

        if ($keyword === '' || strpos($joined, $keyword) === false) {
            $errors[] = '[3차·키워드] 선정된 핵심 키워드가 본문 또는 제목에 자연스럽게 포함되어야 합니다.';
        }

        return array(
            'passed' => empty($errors),
            'errors' => $errors
        );
    }

    public static function generate_body_note_via_gemini($part_id, $theme_override = '') {
        $api_key = self::resolve_active_gemini_key();
        if ($api_key === '') {
            return array('ok' => false, 'message' => 'Gemini API 키가 설정되지 않았습니다.');
        }

        $meta_list = self::get_body_part_meta_list();
        $selected  = $meta_list[0];
        foreach ($meta_list as $m) {
            if ($m['partId'] === $part_id) {
                $selected = $m;
                break;
            }
        }
        $day_slot = (int) floor(current_time('timestamp') / 172800);
        $theme = $theme_override !== '' ? $theme_override : $selected['themes'][$day_slot % count($selected['themes'])];

        // Collect already-published titles for this body part so 2-day auto-posting NEVER produces near-duplicate/spun content (Google Scaled Content Abuse & Naver 유사문서 0%)
        $existing_titles = array();
        $stored_notes = get_option(self::OPT_BODY_NOTES, array());
        if (is_array($stored_notes)) {
            foreach ($stored_notes as $sn) {
                if (is_array($sn) && ($sn['partId'] ?? '') === $selected['partId']) {
                    $st = trim((string) ($sn['questionTitle'] ?? ($sn['title'] ?? '')));
                    if ($st !== '') {
                        $existing_titles[] = $st;
                    }
                }
            }
        }
        $hn_cfg_existing = get_option('bareun_health_notes_cfg_v1', array());
        if (is_array($hn_cfg_existing) && !empty($hn_cfg_existing['notes']) && is_array($hn_cfg_existing['notes'])) {
            foreach ($hn_cfg_existing['notes'] as $hn_ex) {
                if (is_array($hn_ex) && ($hn_ex['partId'] ?? '') === $selected['partId']) {
                    $ht = trim((string) ($hn_ex['questionTitle'] ?? ($hn_ex['title'] ?? '')));
                    if ($ht !== '') {
                        $existing_titles[] = $ht;
                    }
                }
            }
        }
        $existing_titles = array_slice(array_values(array_unique($existing_titles)), 0, 24);
        $dedup_block = '';
        if (!empty($existing_titles)) {
            $dedup_block = "[중복 절대 금지 — 이미 발행된 동일 부위 건강 글 제목 목록]\n"
                . "- " . implode("\n- ", $existing_titles) . "\n"
                . "→ 위 기발행 글들과 제목·세부 상황·비유·체크리스트가 절대 겹치지 않도록, 같은 부위 안에서도 완전히 새로운 계절·직업·수면·식습관·생활 동작 각도를 발굴해 독창적인 칼럼을 작성할 것.\n\n";
        }

        $base_prompt = "[역할 정의]\n"
            . "너는 환자의 일상 아픔에 깊이 공감하며 쉬운 언어로 소통하는 한의학 메디컬 에디터이자, 의학적 정확성과 의료법 제56조를 엄격히 통제하는 수석 팩트체커야.\n"
            . "SCI급 의학·생리학 학술 논문을 기반으로 하되, 초등학생 학부모와 일반인도 단숨에 고개를 끄덕이는 따뜻한 일상 공감 문체로 작성해야 해.\n\n"
            . "[입력 변수]\n"
            . "- 클릭 부위: [" . $selected['partLabel'] . "]\n"
            . "- 시드 테마 방향: [" . $theme . "] (단, 기발행 목록과 겹치면 더 구체적이고 새로운 세부 생활 상황으로 확장할 것)\n"
            . "- 타깃 독자: " . $selected['targetReader'] . "\n\n"
            . $dedup_block
            . "[필수 반영 핵심 규칙 — 풀세트(7단계 심층 본문 + 실생활 검색 키워드 5개 + 자가점검 5항목 + 상·중·하 3단 멀티 화보 설계)]\n"
            . "1. 질문형 제목(title): 독자가 겪는 생생한 상황으로 시작해 물음표(?)로 끝날 것. 지역명(대전, 서울 등)은 본문·제목·키워드에 절대 넣지 말 것.\n"
            . "2. 소비자 실생활 검색 키워드(consumerKeywords): 환자들이 네이버·구글·AI 검색창에 실제로 자주 입력하는 구어체·증상형 키워드 정확히 5개 배열 (지역명 제외).\n"
            . "3. 언어 순화: 어려운 해부학 용어(대퇴골, 골단판, 아로마타제, 추간판, 수핵, 후두하근, 모유두, 나선동맥, 시상하부, 내장지방세포, 배뇨근, 장상피화생) 절대 사용 금지. 반드시 쉬운 일상 비유(성장 연골판, 허벅지 뼈, 디스크 말랑 쿠션, 뒷목 깊은 근육 등)로 풀 것.\n"
            . "4. 홍보·단정어 완전 금지: 완치, 100%, 최고, 최초, 유일, 특효, 무조건, 보장, 예약, 내원, 방문해, 상담받, 문의하, 바른한의원, 원장, 할인, 이벤트, 치료 프로그램, 처방받 절대 사용 금지.\n"
            . "5. 심층 원리 본문(deepMechanism 3단락) + 생활 리듬 관찰 포인트(clinicalObservation) + 자가점검 5항목(selfCheckItems 5개) + 대면 확인 권고 신호(redFlags 2개)까지 풍성한 정보 밀도(Information Gain)를 갖출 것.\n"
            . "6. 상·중·하 3단 멀티 화보 프롬프트(empathyPrompt, mechanismPrompt, routinePrompt) 및 한글 캡션 3개 작성:\n"
            . "   - 슬롯 ①(empathyPrompt): 도입부 독자의 일상 속 불편/고민 순간을 따뜻하게 포착한 자연광 라이프스타일 에디토리얼 사진 (얼굴 정면 클로즈업 배제, 뒷모습·측면·손·체형 위주).\n"
            . "   - 슬롯 ②(mechanismPrompt): 본문 중단 해부·생리 원리를 캐시미어 아이보리(#FAF8F3)와 샴페인 골드(#C5A059) 톤으로 우아하게 시각화한 3D 메디컬 일러스트 (글자·라벨 0%).\n"
            . "   - 슬롯 ③(routinePrompt): 하단 실천부 좌·우 분할(Before 나쁜 자세/습관 vs After 바른 실천 루틴) 비교 에디토리얼 화보 (글자·워터마크 0%).\n\n"
            . "[출력 JSON 스키마 (순수 JSON 객체만 반환)]\n"
            . "{\"keyword\":\"핵심대표키워드\",\"specificTheme\":\"구체화된 세부 생활 주제명\",\"consumerKeywords\":[\"실생활검색어1\",\"실생활검색어2\",\"실생활검색어3\",\"실생활검색어4\",\"실생활검색어5\"],\"title\":\"공감형 질문 타이틀?\",\"seoTitle\":\"검색 최적화 타이틀 (38~50자)\",\"directAnswer\":\"핵심 결론 요약 2~3문장\",\"empathy\":[\"일상 공감 대사 1줄\",\"일상 공감 대사 2줄\"],\"truth\":[\"핵심 원인 1줄\",\"핵심 원인 2줄\"],\"deepMechanism\":[\"쉬운 비유로 풀어낸 심층 생리 원리 1단락 (3~4문장)\",\"일상 습관이 미치는 영향을 설명하는 심층 원리 2단락 (3~4문장)\",\"회복 리듬을 되살리는 생활 기전 3단락 (3~4문장)\"],\"clinicalObservation\":\"일상에서 흔히 관찰되는 몸의 신호와 실천 팁 2~3문장\",\"myth\":[\"흔한 오해 바로잡기 1줄\",\"올바른 생활 기준 2줄\"],\"check\":[\"오늘 밤 1분 관찰 기준 1\",\"오늘 밤 1분 관찰 기준 2\"],\"selfCheckItems\":[\"최근 2주 자가점검 문항 1\",\"자가점검 문항 2\",\"자가점검 문항 3\",\"자가점검 문항 4\",\"자가점검 문항 5\"],\"redFlags\":[\"세심한 대면 확인이 필요한 증상 신호 1\",\"대면 확인이 필요한 증상 신호 2\"],\"faqItems\":[{\"q\":\"독자가 가장 궁금해하는 질문 1?\",\"a\":\"친절하고 명확한 답변 1\"},{\"q\":\"독자가 자주 묻는 생활 질문 2?\",\"a\":\"친절하고 명확한 답변 2\"}],\"citation\":\"관련 국제 학술지(예: Nature Medicine · JAMA · Sleep 등) 리뷰 근거 요약\",\"empathyIllustCaption\":\"슬롯 ① 일상 공감 화보 한글 캡션\",\"deepIllustCaption\":\"슬롯 ② 원리 도해 화보 한글 캡션\",\"routineIllustCaption\":\"슬롯 ③ 전·후 실천 루틴 화보 한글 캡션\",\"empathyPrompt\":\"16:9 warm cashmere ivory #FAF8F3 lifestyle editorial photo prompt without any text or face closeup\",\"mechanismPrompt\":\"16:9 clean 3D medical editorial illustration on warm ivory #FAF8F3 with champagne gold #C5A059 accents, zero text\",\"routinePrompt\":\"16:9 split-screen left-right comparison lifestyle editorial photo showing bad habit vs healthy evening routine, warm ivory tone, zero text\"}";

        $feedback = '';
        $verified_candidate = null;
        $verified_prompts   = array();

        for ($attempt = 1; $attempt <= 3; $attempt++) {
            $models_to_try = array('gemini-2.5-pro', 'gemini-2.5-flash');
            $parsed = null;
            $last_err = '';

            foreach ($models_to_try as $m_id) {
                $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . $m_id . ':generateContent?key=' . rawurlencode($api_key);
                $body_payload = wp_json_encode(array(
                    'contents' => array(
                        array('parts' => array(array('text' => $base_prompt . $feedback)))
                    ),
                    'generationConfig' => array(
                        'responseMimeType' => 'application/json',
                        'temperature'      => 0.35
                    )
                ));
                $res = wp_remote_post($url, array(
                    'headers' => array('Content-Type' => 'application/json'),
                    'body'    => $body_payload,
                    'timeout' => 45
                ));
                if (is_wp_error($res)) {
                    $last_err = $res->get_error_message();
                    continue;
                }
                if (wp_remote_retrieve_response_code($res) !== 200) {
                    $last_err = 'HTTP ' . wp_remote_retrieve_response_code($res);
                    continue;
                }
                $raw_json = json_decode(wp_remote_retrieve_body($res), true);
                $text_out = $raw_json['candidates'][0]['content']['parts'][0]['text'] ?? '';
                $try_parsed = json_decode($text_out, true);
                if (is_array($try_parsed)) {
                    $parsed = $try_parsed;
                    break;
                }
            }

            if (!is_array($parsed)) {
                if ($attempt === 3 && $last_err !== '') {
                    return array('ok' => false, 'message' => $last_err);
                }
                $feedback = "\n\n[재검수 요청] 유효한 순수 JSON 객체만 반환해 주세요.";
                continue;
            }

            $today_kst = current_time('Y-m-d');
            $note_id   = $selected['partId'] . '-' . str_replace('-', '', $today_kst);
            $q_title   = sanitize_text_field($parsed['title'] ?? '');
            $seo_title = sanitize_text_field($parsed['seoTitle'] ?? $q_title);
            $kw_main   = sanitize_text_field($parsed['keyword'] ?? $theme);
            $cons_kws  = array_values(array_filter(array_map('sanitize_text_field', array_slice((array) ($parsed['consumerKeywords'] ?? array()), 0, 5))));
            if (empty($cons_kws)) {
                $cons_kws = array($kw_main, $selected['partLabel'] . ' 관리', $theme);
            }
            $emp_lines = array_values(array_map('sanitize_text_field', array_slice((array) ($parsed['empathy'] ?? array()), 0, 2)));
            $tru_lines = array_values(array_map('sanitize_text_field', array_slice((array) ($parsed['truth'] ?? array()), 0, 2)));
            $myt_lines = array_values(array_map('sanitize_text_field', array_slice((array) ($parsed['myth'] ?? array()), 0, 2)));
            $chk_items = array_values(array_map('sanitize_text_field', array_slice((array) ($parsed['check'] ?? array()), 0, 2)));
            $deep_mech = array_values(array_filter(array_map('sanitize_textarea_field', array_slice((array) ($parsed['deepMechanism'] ?? array()), 0, 3))));
            if (empty($deep_mech)) {
                $deep_mech = $tru_lines;
            }
            $faq_clean = array();
            if (!empty($parsed['faqItems']) && is_array($parsed['faqItems'])) {
                foreach (array_slice($parsed['faqItems'], 0, 3) as $fq) {
                    if (is_array($fq) && !empty($fq['q']) && !empty($fq['a'])) {
                        $faq_clean[] = array(
                            'q' => sanitize_text_field($fq['q']),
                            'a' => sanitize_textarea_field($fq['a'])
                        );
                    }
                }
            }

            $spec_theme = sanitize_text_field($parsed['specificTheme'] ?? $theme);
            if ($spec_theme === '') {
                $spec_theme = $theme;
            }
            $self_checks_gen = array_values(array_filter(array_map('sanitize_text_field', array_slice((array) ($parsed['selfCheckItems'] ?? array()), 0, 5))));
            if (count($self_checks_gen) < 3) {
                $self_checks_gen = $chk_items;
            }
            $red_flags_gen = array_values(array_filter(array_map('sanitize_text_field', array_slice((array) ($parsed['redFlags'] ?? array()), 0, 3))));
            $clin_obs_gen  = sanitize_textarea_field($parsed['clinicalObservation'] ?? '');
            $acad_basis    = sanitize_text_field($parsed['citation'] ?? 'SCI급 의학·생리학 학술 리뷰 기반');

            $candidate = array(
                'id'                   => $note_id,
                'enabled'              => true,
                'partId'               => $selected['partId'],
                'partLabel'            => $selected['partLabel'],
                'theme'                => $spec_theme,
                'targetReader'         => $selected['targetReader'],
                'keyword'              => $kw_main,
                'consumerKeywords'     => $cons_kws,
                'publishDate'          => $today_kst,
                'lastReviewed'         => $today_kst,
                'title'                => $q_title,
                'questionTitle'        => $q_title,
                'seoTitle'             => $seo_title,
                'directAnswer'         => sanitize_textarea_field($parsed['directAnswer'] ?? implode(' ', $tru_lines)),
                'empathy'              => $emp_lines,
                'empathyLines'         => $emp_lines,
                'truth'                => $tru_lines,
                'truthLines'           => $tru_lines,
                'deepMechanism'        => $deep_mech,
                'deepParagraphs'       => $deep_mech,
                'clinicalObservation'  => $clin_obs_gen,
                'myth'                 => $myt_lines,
                'mythLines'            => $myt_lines,
                'check'                => $chk_items,
                'checkItems'           => $chk_items,
                'checkList'            => $chk_items,
                'selfCheckItems'       => $self_checks_gen,
                'redFlags'             => $red_flags_gen,
                'faqItems'             => $faq_clean,
                'citation'             => $acad_basis,
                'academicBasis'        => $acad_basis,
                'deepReference'        => '참고 문헌 · ' . $acad_basis,
                'empathyIllustCaption' => sanitize_text_field($parsed['empathyIllustCaption'] ?? ($selected['partLabel'] . ' 일상 공감 장면')),
                'deepIllustCaption'    => sanitize_text_field($parsed['deepIllustCaption'] ?? ($selected['partLabel'] . ' 핵심 기전 도해')),
                'routineIllustCaption' => sanitize_text_field($parsed['routineIllustCaption'] ?? ($selected['partLabel'] . ' 전·후 생활 실천 루틴')),
                'auditPassed'          => true,
                'source'               => 'gemini-fullset-3slot-verified'
            );

            $check_res = self::validate_body_note_three_stage($candidate);
            if ($check_res['passed']) {
                $verified_candidate = $candidate;
                $verified_prompts = array(
                    'empathy'   => trim((string) ($parsed['empathyPrompt'] ?? '')),
                    'mechanism' => trim((string) ($parsed['mechanismPrompt'] ?? '')),
                    'routine'   => trim((string) ($parsed['routinePrompt'] ?? ''))
                );
                break;
            }
            $feedback = "\n\n[3단계 자가 검수 반려 사유 — 즉시 수정 후 재출력]: " . implode(' / ', $check_res['errors']);
        }

        if (!$verified_candidate) {
            return array('ok' => false, 'message' => '3단계 자가 검수 기준을 통과하지 못해 발행을 보류했습니다.');
        }

        // Generate 3 bespoke 16:9 images via Argon High / Studio Engine (with part flagship fallback)
        $pid = $verified_candidate['partId'];
        $emp_url = '';
        $mec_url = '';
        $rou_url = '';
        if (class_exists('Bareun_Custom_Studio_Engine_V4')) {
            if ($verified_prompts['empathy'] !== '') {
                $emp_url = Bareun_Custom_Studio_Engine_V4::generate_hn_slot_image_internal($verified_prompts['empathy'], $pid . '_emp', $api_key);
            }
            if ($verified_prompts['mechanism'] !== '') {
                $mec_url = Bareun_Custom_Studio_Engine_V4::generate_hn_slot_image_internal($verified_prompts['mechanism'], $pid . '_mec', $api_key);
            }
            if ($verified_prompts['routine'] !== '') {
                $rou_url = Bareun_Custom_Studio_Engine_V4::generate_hn_slot_image_internal($verified_prompts['routine'], $pid . '_rou', $api_key);
            }
        }

        $verified_candidate['empathyIllustImg'] = $emp_url !== '' ? $emp_url : ('webp/hn_' . $pid . '_20261111_empathy.webp');
        $verified_candidate['deepIllustImg']    = $mec_url !== '' ? $mec_url : ('hn_' . $pid . '_20261111_mechanism.jpg');
        $verified_candidate['routineIllustImg'] = $rou_url !== '' ? $rou_url : ('webp/hn_' . $pid . '_20261111_routine.webp');

        $kw_suffix = !empty($verified_candidate['consumerKeywords'][0]) ? (' — ' . $verified_candidate['consumerKeywords'][0]) : '';
        $verified_candidate['empathyIllustAlt'] = $verified_candidate['empathyIllustCaption'] . $kw_suffix;
        $verified_candidate['deepIllustAlt']    = $verified_candidate['deepIllustCaption'] . $kw_suffix;
        $verified_candidate['routineIllustAlt'] = $verified_candidate['routineIllustCaption'] . $kw_suffix;

        return array('ok' => true, 'note' => $verified_candidate);
    }

    /**
     * Persist newly generated Full-Set 3-Slot Health Note across:
     * 1) OPT_BODY_NOTES (/body-explorer/ dynamic feed)
     * 2) bareun_health_notes_cfg_v1 (/health-note-{id}/ SSR & Online Studio)
     * 3) WordPress 'post' (XML Sitemap + RSS 2.0 Feed)
     * 4) IndexNow instant indexing ping
     */
    private static function persist_and_publish_fullset_health_note($new_note) {
        if (!is_array($new_note) || empty($new_note['id'])) {
            return;
        }
        $clean_nid = strtolower(preg_replace('/[^a-z0-9\-]/i', '', (string) $new_note['id']));
        if ($clean_nid === '') {
            return;
        }
        $new_note['id'] = $clean_nid;

        // 1) Update OPT_BODY_NOTES
        $notes = get_option(self::OPT_BODY_NOTES, array());
        if (!is_array($notes)) {
            $notes = array();
        }
        $notes = array_values(array_filter($notes, function ($x) use ($clean_nid) {
            return is_array($x) && (($x['id'] ?? '') !== $clean_nid);
        }));
        array_unshift($notes, $new_note);
        if (count($notes) > 300) {
            $notes = array_slice($notes, 0, 300);
        }
        update_option(self::OPT_BODY_NOTES, $notes);

        // 2) Update bareun_health_notes_cfg_v1 & studio JSON
        if (class_exists('Bareun_Custom_Studio_Engine_V4')) {
            $hn_cfg = Bareun_Custom_Studio_Engine_V4::load_health_notes_cfg_php(false);
            if (!is_array($hn_cfg)) {
                $hn_cfg = array('schemaVersion' => '9.0.0-fullset-3slot-empathy-seo', 'notes' => array());
            }
            if (empty($hn_cfg['notes']) || !is_array($hn_cfg['notes'])) {
                $hn_cfg['notes'] = array();
            }
            $hn_cfg['notes'] = array_values(array_filter($hn_cfg['notes'], function ($x) use ($clean_nid) {
                return is_array($x) && (($x['id'] ?? '') !== $clean_nid);
            }));
            array_unshift($hn_cfg['notes'], $new_note);
            $hn_cfg['updatedAt'] = gmdate('c');
            update_option('bareun_health_notes_cfg_v1', $hn_cfg, false);

            $upload_dir = wp_upload_dir();
            $target_dir = $upload_dir['basedir'] . '/bareun-studio';
            wp_mkdir_p($target_dir);
            @file_put_contents($target_dir . '/health-notes-custom-config.json', wp_json_encode($hn_cfg, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        }

        // 3) Upsert published WordPress post so /wp-sitemap.xml and /feed/ expose /health-note-{id}/
        $slug = 'health-note-' . $clean_nid;
        $existing = get_page_by_path($slug, OBJECT, 'post');
        $post_arr = array(
            'post_type'    => 'post',
            'post_name'    => $slug,
            'post_title'   => (string) ($new_note['seoTitle'] ?? $new_note['title'] ?? $slug),
            'post_excerpt' => (string) ($new_note['directAnswer'] ?? ''),
            'post_content' => '<p>' . esc_html((string) ($new_note['directAnswer'] ?? '')) . '</p>',
            'post_status'  => 'publish'
        );
        if ($existing && !empty($existing->ID)) {
            $post_arr['ID'] = (int) $existing->ID;
            wp_update_post($post_arr);
        } else {
            wp_insert_post($post_arr);
        }

        wp_cache_flush();

        // 4) Non-blocking Dual IndexNow (Naver Search Advisor + Global Bing/ChatGPT) + GSC Sitemap Ping
        if (class_exists('Bareun_Master_SEO_Engine_V1')) {
            Bareun_Master_SEO_Engine_V1::ping_all_search_engines(array(
                'https://www.bareunhaniwon.com/body-explorer/',
                'https://www.bareunhaniwon.com/health-note-' . $clean_nid . '/'
            ));
        }
    }

    public static function run_scheduled_two_day_note_generation() {
        $api_key = self::resolve_active_gemini_key();
        if ($api_key === '') {
            return;
        }
        $today_kst = current_time('Y-m-d');
        $yesterday_kst = date('Y-m-d', current_time('timestamp') - 86400);

        $notes = get_option(self::OPT_BODY_NOTES, array());
        if (is_array($notes)) {
            foreach ($notes as $n) {
                if (!empty($n['publishDate']) && ($n['publishDate'] === $today_kst || $n['publishDate'] === $yesterday_kst)) {
                    return; // Already updated within 2-day window
                }
            }
        }
        $hn_cfg = get_option('bareun_health_notes_cfg_v1', null);
        if (is_array($hn_cfg) && !empty($hn_cfg['notes']) && is_array($hn_cfg['notes'])) {
            foreach ($hn_cfg['notes'] as $hn) {
                if (!empty($hn['publishDate']) && ($hn['publishDate'] === $today_kst || $hn['publishDate'] === $yesterday_kst)) {
                    return;
                }
            }
        }

        $meta_list = self::get_body_part_meta_list();
        $slot = (int) floor(current_time('timestamp') / 172800);
        // Prioritize growth ('knee') frequently while rotating all 9 parts
        $part_id = ($slot % 2 === 0) ? 'knee' : $meta_list[$slot % count($meta_list)]['partId'];
        $gen = self::generate_body_note_via_gemini($part_id);
        if (!empty($gen['ok']) && !empty($gen['note'])) {
            self::persist_and_publish_fullset_health_note($gen['note']);
        }
    }

    private static function compute_next_two_day_kst($today_kst) {
        $anchor = strtotime('2026-10-23 00:00:00');
        $cur    = strtotime($today_kst . ' 00:00:00');
        if ($cur < $anchor) {
            return '2026-10-23';
        }
        $diff_days = (int) floor(($cur - $anchor) / 86400);
        $add_days  = ($diff_days % 2 === 0) ? 2 : 1;
        return date('Y-m-d', $cur + ($add_days * 86400));
    }

    public static function handle_get_body_notes(\WP_REST_Request $request) {
        self::send_nocache();
        $today_kst  = current_time('Y-m-d');
        $part       = sanitize_key($request->get_param('part') ?? 'all');
        $stored     = get_option(self::OPT_BODY_NOTES, array());
        $note_views = get_option(self::OPT_NOTE_VIEWS, array());
        if (!is_array($stored)) {
            $stored = array();
        }
        if (!is_array($note_views)) {
            $note_views = array();
        }
        $published = array();
        foreach ($stored as $n) {
            if (!is_array($n)) continue;
            $pdate = (string) ($n['publishDate'] ?? '');
            if ($pdate !== '' && $pdate > $today_kst) continue;
            if ($part !== '' && $part !== 'all' && ($n['partId'] ?? '') !== $part) continue;
            $nid = (string) ($n['id'] ?? '');
            $n['views'] = ($nid !== '' && isset($note_views[$nid])) ? (int) $note_views[$nid] : 0;
            $published[] = $n;
        }
        return new \WP_REST_Response(array(
            'ok'            => true,
            'todayKst'      => $today_kst,
            'nextUpdateKst' => self::compute_next_two_day_kst($today_kst),
            'cycleDays'     => 2,
            'autoReady'     => self::resolve_active_gemini_key() !== '',
            'noteViews'     => $note_views,
            'notes'         => $published
        ), 200);
    }

    public static function handle_increment_body_note_view(\WP_REST_Request $request) {
        self::send_nocache();
        $params = $request->get_json_params();
        if (!is_array($params)) {
            $params = array();
        }
        $note_id = strtolower(preg_replace('/[^a-z0-9\-]/i', '', (string) ($params['noteId'] ?? ($params['id'] ?? ''))));
        if ($note_id === '') {
            return new \WP_REST_Response(array('ok' => false, 'message' => 'noteId is required'), 400);
        }
        $note_views = get_option(self::OPT_NOTE_VIEWS, array());
        if (!is_array($note_views)) {
            $note_views = array();
        }
        $note_views[$note_id] = (isset($note_views[$note_id]) ? (int) $note_views[$note_id] : 0) + 1;
        update_option(self::OPT_NOTE_VIEWS, $note_views, false);

        return new \WP_REST_Response(array(
            'ok'        => true,
            'noteId'    => $note_id,
            'views'     => $note_views[$note_id],
            'noteViews' => $note_views
        ), 200);
    }

    public static function handle_post_body_notes(\WP_REST_Request $request) {
        self::send_nocache();
        $params = $request->get_json_params();
        if (!is_array($params)) {
            $params = array();
        }
        $actor = self::get_current_actor($request);
        $is_master = $actor && !empty($actor['isMaster']);

        $cfg = get_option(self::OPT_NOTES_CFG, array());
        if (!is_array($cfg)) {
            $cfg = array();
        }
        $req_secret = sanitize_text_field($request->get_header('x-bareun-webhook-secret') ?: ($params['webhookSecret'] ?? ''));
        $saved_secret = (string) ($cfg['webhookSecret'] ?? '');
        $webhook_ok = ($saved_secret !== '' && hash_equals($saved_secret, $req_secret));

        if (!$is_master && !$webhook_ok) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '마스터 또는 자동화 웹훅 인증이 필요합니다.'), 403);
        }

        if ($is_master && (isset($params['geminiApiKey']) || isset($params['newWebhookSecret']))) {
            if (isset($params['geminiApiKey'])) {
                $cfg['geminiApiKey'] = sanitize_text_field($params['geminiApiKey']);
            }
            if (isset($params['newWebhookSecret'])) {
                $cfg['webhookSecret'] = sanitize_text_field($params['newWebhookSecret']);
            }
            update_option(self::OPT_NOTES_CFG, $cfg);
        }

        $action = sanitize_key($params['action'] ?? 'publish_note');
        $notes  = get_option(self::OPT_BODY_NOTES, array());
        if (!is_array($notes)) {
            $notes = array();
        }

        if ($action === 'save_config') {
            return new \WP_REST_Response(array('ok' => true, 'autoReady' => self::resolve_active_gemini_key() !== ''), 200);
        }

        if ($action === 'generate_now') {
            $part_id = sanitize_key($params['partId'] ?? 'knee');
            $theme   = sanitize_text_field($params['theme'] ?? '');
            $gen     = self::generate_body_note_via_gemini($part_id, $theme);
            if (empty($gen['ok'])) {
                return new \WP_REST_Response($gen, 400);
            }
            $new_note = $gen['note'];
            self::persist_and_publish_fullset_health_note($new_note);
            return new \WP_REST_Response(array('ok' => true, 'note' => $new_note), 200);
        }

        $raw_note = isset($params['note']) && is_array($params['note']) ? $params['note'] : $params;
        $today_kst = current_time('Y-m-d');
        $candidate = array(
            'id'           => sanitize_text_field($raw_note['id'] ?? (($raw_note['partId'] ?? 'knee') . '-' . str_replace('-', '', $today_kst))),
            'partId'       => sanitize_key($raw_note['partId'] ?? 'knee'),
            'partLabel'    => sanitize_text_field($raw_note['partLabel'] ?? '무릎 성장판'),
            'theme'        => sanitize_text_field($raw_note['theme'] ?? ''),
            'targetReader' => sanitize_text_field($raw_note['targetReader'] ?? ''),
            'keyword'      => sanitize_text_field($raw_note['keyword'] ?? ''),
            'publishDate'  => sanitize_text_field($raw_note['publishDate'] ?? $today_kst),
            'title'        => sanitize_text_field($raw_note['title'] ?? ''),
            'empathy'      => array_map('sanitize_text_field', array_slice((array) ($raw_note['empathy'] ?? array()), 0, 2)),
            'truth'        => array_map('sanitize_text_field', array_slice((array) ($raw_note['truth'] ?? array()), 0, 2)),
            'myth'         => array_map('sanitize_text_field', array_slice((array) ($raw_note['myth'] ?? array()), 0, 2)),
            'check'        => array_map('sanitize_text_field', array_slice((array) ($raw_note['check'] ?? array()), 0, 2)),
            'auditPassed'  => true
        );
        $audit = self::validate_body_note_three_stage($candidate);
        if (!$audit['passed']) {
            return new \WP_REST_Response(array(
                'ok'     => false,
                'message'=> '3단계 자가 검수를 통과하지 못했습니다.',
                'errors' => $audit['errors']
            ), 400);
        }
        $notes = array_values(array_filter($notes, function($x) use ($candidate) {
            return ($x['id'] ?? '') !== $candidate['id'];
        }));
        array_unshift($notes, $candidate);
        update_option(self::OPT_BODY_NOTES, $notes);

        return new \WP_REST_Response(array('ok' => true, 'note' => $candidate), 200);
    }
}
Bareun_Member_Private_QnA_V6_Plugin::init();
endif;

// === BAREUN MASTER SEO & CANONICAL ENGINE V1 ===
if (!class_exists('Bareun_Master_SEO_Engine_V1')) :
class Bareun_Master_SEO_Engine_V1 {
    const OPT_VERIFY_CODES     = 'bareun_seo_verification_codes_v1';
    const OPT_OG_IMAGE_URL     = 'bareun_official_og_image_url_v1';
    const OPT_LLMS_TXT         = 'bareun_custom_llms_txt_v1';
    const OPT_LLMS_FULL_TXT    = 'bareun_custom_llms_full_txt_v1';
    const OPT_HTACCESS_VER     = 'bareun_htaccess_sec_headers_v5';
    const CANONICAL_HOST       = 'www.bareunhaniwon.com';
    const CANONICAL_ORIGIN     = 'https://www.bareunhaniwon.com';
    const INDEXNOW_KEY         = 'b4e02026a15e0ce0849201f7c3d9a5b2';
    const DEFAULT_NAVER_VERIFY = '4069e9810cb66fcbb9eb3955b54e627f5096ac30';
    const DEFAULT_GOOGLE_VERIFY = '-OtjjERbe9ctyW4q9rwaFiNj9OvxGvOE7Bd1MBjSsX4';

    private static $cached_cfg = null;

    public static function init() {
        if (did_action('init')) {
            self::maybe_sync_htaccess_headers();
            self::handle_early_canonical_and_virtual_endpoints();
            self::setup_head_cleanup();
        } else {
            add_action('init', array(__CLASS__, 'maybe_sync_htaccess_headers'), 1);
            add_action('init', array(__CLASS__, 'handle_early_canonical_and_virtual_endpoints'), 2);
            add_action('init', array(__CLASS__, 'setup_head_cleanup'), 20);
        }
        add_action('template_redirect', array(__CLASS__, 'handle_early_canonical_and_virtual_endpoints'), 1);
        add_action('send_headers', array(__CLASS__, 'send_security_headers'), 1);
        add_filter('wp_headers', array(__CLASS__, 'filter_wp_headers'), 99);
        add_filter('wp_robots', array(__CLASS__, 'filter_wp_robots'), 99);
        add_filter('pre_get_document_title', array(__CLASS__, 'filter_document_title'), 99);
        add_action('wp_head', array(__CLASS__, 'render_head_seo'), 1);
        add_action('wp_footer', array(__CLASS__, 'render_footer_qna_ssr'), 99);

        // Eliminate Astra theme duplicate H1 & oversized featured thumbnail in DOM
        add_filter('astra_the_title_enabled', '__return_false', 99);
        add_filter('astra_featured_image_enabled', '__return_false', 99);
        add_filter('post_thumbnail_html', '__return_empty_string', 99);
        add_filter('body_class', array(__CLASS__, 'filter_body_class'), 20);

        // Clean XML Sitemap & AI-friendly robots.txt & Standalone Canonical Permalinks (/health-note-{id}/) for Health Notes
        add_filter('post_link', array(__CLASS__, 'filter_health_note_permalink'), 99, 2);
        add_filter('wp_sitemaps_add_provider', array(__CLASS__, 'filter_sitemap_providers'), 10, 2);
        add_filter('wp_sitemaps_posts_entry', array(__CLASS__, 'filter_sitemap_post_entry'), 10, 3);
        add_filter('robots_txt', array(__CLASS__, 'filter_robots_txt'), 99, 2);

        // RSS 2.0 Feed Optimization for Naver Search Advisor & Feed Readers (35 latest modified items keeps RSS < 550 KB forever while wp-sitemap.xml exposes 100% of URLs)
        add_filter('option_posts_per_rss', function () { return 35; }, 99);
        add_filter('wp_revisions_to_keep', function () { return 2; }, 99);
        add_action('pre_get_posts', array(__CLASS__, 'filter_rss_feed_query'));
        add_filter('the_guid', array(__CLASS__, 'filter_rss_canonical_url'), 99);
        add_filter('self_link', array(__CLASS__, 'filter_rss_self_link'), 99);
        add_filter('the_title_rss', array(__CLASS__, 'filter_rss_title'), 99);
        add_filter('the_excerpt_rss', array(__CLASS__, 'filter_rss_excerpt'), 99);
        add_filter('the_content_feed', array(__CLASS__, 'filter_rss_content'), 99);

        // WP-Admin Search Console / Naver Search Advisor Verification Settings UI
        add_action('admin_menu', array(__CLASS__, 'register_admin_menu'));
        add_action('rest_api_init', array(__CLASS__, 'register_seo_rest_routes'));
    }

    private static function get_master_cfg() {
        if (self::$cached_cfg === null) {
            $raw = base64_decode('eyJjYW5vbmljYWxPcmlnaW4iOiJodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbSIsImRlZmF1bHRPZ0ltYWdlIjoiaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjYvMTAvb2ctYmFyZXVuLTEyMDB4NjMwLTEuanBnIiwiY2xpbmljQmFzZU9yZyI6eyJAdHlwZSI6WyJNZWRpY2FsQ2xpbmljIiwiTWVkaWNhbE9yZ2FuaXphdGlvbiIsIkxvY2FsQnVzaW5lc3MiXSwiQGlkIjoiaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vI2NsaW5pYyIsIm5hbWUiOiLrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIiwiYWx0ZXJuYXRlTmFtZSI6WyJCYXJldW4gS29yZWFuIE1lZGljaW5lIENsaW5pYyBEYWVqZW9uIiwi64yA7KCEIOuwlOuluO2VnOydmOybkCJdLCJ1cmwiOiJodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS8iLCJsb2dvIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fqd2VpMDUwOC1jcHUvYmFyZXVuLWhvbWVwYWdlL21haW4vaG9tZXBhZ2Uvd2VicC9jYXJkXzFfZGlyZWN0b3Iud2VicCIsImltYWdlIjoiaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjYvMTAvb2ctYmFyZXVuLTEyMDB4NjMwLTEuanBnIiwidGVsZXBob25lIjoiKzgyLTEwLTU2MzEtMTI3NSIsInByaWNlUmFuZ2UiOiLigqnigqkiLCJhZGRyZXNzIjp7IkB0eXBlIjoiUG9zdGFsQWRkcmVzcyIsInN0cmVldEFkZHJlc3MiOiLruYTrnpjrj5nroZw367KI6ri4IDEsIDLsuLUiLCJhZGRyZXNzTG9jYWxpdHkiOiLrjIDrjZXqtawiLCJhZGRyZXNzUmVnaW9uIjoi64yA7KCE6rSR7Jet7IucIiwicG9zdGFsQ29kZSI6IjM0NDE3IiwiYWRkcmVzc0NvdW50cnkiOiJLUiJ9LCJnZW8iOnsiQHR5cGUiOiJHZW9Db29yZGluYXRlcyIsImxhdGl0dWRlIjozNi4zNTUzNiwibG9uZ2l0dWRlIjoxMjcuNDQ3Nzh9LCJvcGVuaW5nSG91cnNTcGVjaWZpY2F0aW9uIjpbeyJAdHlwZSI6Ik9wZW5pbmdIb3Vyc1NwZWNpZmljYXRpb24iLCJkYXlPZldlZWsiOlsiTW9uZGF5IiwiVHVlc2RheSIsIldlZG5lc2RheSIsIlRodXJzZGF5IiwiRnJpZGF5Il0sIm9wZW5zIjoiMDk6MDAiLCJjbG9zZXMiOiIxOTowMCJ9LHsiQHR5cGUiOiJPcGVuaW5nSG91cnNTcGVjaWZpY2F0aW9uIiwiZGF5T2ZXZWVrIjpbIlNhdHVyZGF5IiwiUHVibGljSG9saWRheXMiXSwib3BlbnMiOiIwOTowMCIsImNsb3NlcyI6IjE0OjAwIn1dLCJzYW1lQXMiOlsiaHR0cHM6Ly9uYXZlci5tZS81VTFFTG44TCIsImh0dHBzOi8vYmxvZy5uYXZlci5jb20vd2VpMDUwOCIsImh0dHBzOi8vcGYua2FrYW8uY29tL195a3hjTEsiXSwiZm91bmRlciI6eyJAdHlwZSI6IlBlcnNvbiIsIkBpZCI6Imh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2RpcmVjdG9yLyNwaHlzaWNpYW4iLCJuYW1lIjoi7JWI7KCV7JyEIiwiam9iVGl0bGUiOiLrjIDtkZzsm5DsnqUgKO2VnOydmOyCrCkifX0sIndlYnNpdGVOb2RlIjp7IkB0eXBlIjoiV2ViU2l0ZSIsIkBpZCI6Imh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tLyN3ZWJzaXRlIiwibmFtZSI6IuuwlOuluO2VnOydmOybkCDrjIDsoITrs7jsoJAiLCJ1cmwiOiJodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS8iLCJpbkxhbmd1YWdlIjoia28tS1IiLCJwdWJsaXNoZXIiOnsiQGlkIjoiaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vI2NsaW5pYyJ9fSwicGFnZXMiOnsiaG9tZSI6eyJmaWxlIjoiaW5kZXguaHRtbCIsInBhdGgiOiIvIiwidGl0bGUiOiLrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIHwg64yA642V6rWsIOu5hOuemOuPmSDstpTrgpjCt+yEseyepcK364uk7J207Ja07Yq4wrftg4jrqqjCt+qzteynhOuLqCIsImRlc2NyaXB0aW9uIjoi7KCV7IiY66as7Jes7ISx64Ko7ISx7JuQ7ZiV7YOI66qo67OR7JuQ7LmY66OM7ISx7J6l7YG066as64uJ7ISx7J6l7YyQ6rKA7IKs65GQ7Ya17YOI66qo7JW967mE64yA66m07ISx7KGw7IiZ7Kad7YKk7ISx7J6l64u07KCB7LaV64aN7Kad66as7ZSE7YyF64uk7J207Ja07Yq467GD7IK064K07J6l7KeA67Cp7JyE7Je864Kc7J6E7IKw7ZuE67O07JW96rO17KeE64uo64yA7KCE7KeE66el7ZS867aAIiwicHJlbG9hZEltZyI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9handlaTA1MDgtY3B1L2JhcmV1bi1ob21lcGFnZS9tYWluL2hvbWVwYWdlL3dlYnAvY2FyZF8xX2RpcmVjdG9yLndlYnAiLCJicmVhZGNydW1iTmFtZSI6Iu2ZiCJ9LCJzdG9yeS0zZCI6eyJmaWxlIjoic3RvcnktM2QuaHRtbCIsInBhdGgiOiIvIiwidGl0bGUiOiLrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIHwg64yA642V6rWsIOu5hOuemOuPmSDstpTrgpjCt+yEseyepcK364uk7J207Ja07Yq4wrftg4jrqqjCt+qzteynhOuLqCIsImRlc2NyaXB0aW9uIjoi7KCV7IiY66as7Jes7ISx64Ko7ISx7JuQ7ZiV7YOI66qo67OR7JuQ7LmY66OM7ISx7J6l7YG066as64uJ7ISx7J6l7YyQ6rKA7IKs65GQ7Ya17YOI66qo7JW967mE64yA66m07ISx7KGw7IiZ7Kad7YKk7ISx7J6l64u07KCB7LaV64aN7Kad66as7ZSE7YyF64uk7J207Ja07Yq467GD7IK064K07J6l7KeA67Cp7JyE7Je864Kc7J6E7IKw7ZuE67O07JW96rO17KeE64uo64yA7KCE7KeE66el7ZS867aAIiwicHJlbG9hZEltZyI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9handlaTA1MDgtY3B1L2JhcmV1bi1ob21lcGFnZS9tYWluL2hvbWVwYWdlL3dlYnAvY2FyZF8xX2RpcmVjdG9yLndlYnAiLCJicmVhZGNydW1iTmFtZSI6Iu2ZiCJ9LCJkaXJlY3RvciI6eyJmaWxlIjoiZGlyZWN0b3IuaHRtbCIsInBhdGgiOiIvZGlyZWN0b3IvIiwidGl0bGUiOiLslYjsoJXsnIQg64yA7ZGc7JuQ7J6lIMK3IDnrjIAg7KCV67CA6rKA7KeEIHwg67CU66W47ZWc7J2Y7JuQIOuMgOyghOuzuOygkCDsgqzsg4HssrTsp4jCt+y0iOydjO2MjCIsImRlc2NyaXB0aW9uIjoi7LSI7J2M7YyMwrfssrTsl7Tsp4Tri6jCt+ydtOu5hOyduO2bhCDrgrTsi5zqsr3Ct+yCrOyDgeyytOyniMK37J6Q7Jyo7Iug6rK9KEhSVinCt+qwhOyImOy5mMK37ISx7J6l7YyQ6rmM7KeAIDnrjIAg7KCV67CA6rKA7KeE6rO8IOybkOuCtCDslYjsi6wg7YOV7KCEIOyLnOyKpO2FnOycvOuhnCDsp4jtmZjsnZgg67+M66as66W8IOywvuuKlCDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIOyViOygleychCDrjIDtkZzsm5DsnqUg7KeE66OMIOyyoO2VmeydhCDshozqsJztlanri4jri6QuIiwicHJlbG9hZEltZyI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9handlaTA1MDgtY3B1L2JhcmV1bi1ob21lcGFnZS9tYWluL2hvbWVwYWdlL3dlYnAvY2FyZF8xX2RpcmVjdG9yLndlYnAiLCJicmVhZGNydW1iTmFtZSI6IuyViOygleychCDrjIDtkZzsm5DsnqUgwrcgOeuMgCDsoJXrsIDqsoDsp4QiLCJpc1Byb2ZpbGUiOnRydWV9LCJjaHVuYSI6eyJmaWxlIjoiY2h1bmEuaHRtbCIsInBhdGgiOiIvY2h1bmEvIiwidGl0bGUiOiLrjIDsoIQg7LaU64KY7JqU67KVIMK3IO2XiOumrOuUlOyKpO2BrCDCtyDssrTtmJXqtZDsoJUg7YG066as64uJIHwg67CU66W47ZWc7J2Y7JuQIOuMgOyghOuzuOygkCIsImRlc2NyaXB0aW9uIjoi7KeE7Ya17KCc66GcIO2GteymneunjCDqsIDrpqzsp4Ag7JWK6rOgIOuMgO2RnOybkOyepSAxOjEg7IiY6riwIOy2lOuCmOyZgCDslb3suajsnLzroZwg7YuA7Ja07KeEIOyymey2lMK36rOo67CYwrfqsbDrtoHrqqkg7KSR7Ius7LaV7J2EIOuwlOuhnOyeoeyKteuLiOuLpC4gSkFNQcK3TGFuY2V0IO2VmeyIoCDrhbzrrLgg6re86rGwIOq4sOuwmCDruYTsiJjsiKAg7LKZ7LaUwrfqtIDsoIgg7Ya17KadIOy5mOujjCDtgbTrpqzri4nsnoXri4jri6QuIiwicHJlbG9hZEltZyI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9handlaTA1MDgtY3B1L2JhcmV1bi1ob21lcGFnZS9tYWluL2hvbWVwYWdlL3dlYnAvY2h1bmFfbWluaW1hbF9jYXJkMl9wYWlua2lsbGVyX2xpbWl0LndlYnAiLCJicmVhZGNydW1iTmFtZSI6IuuwlOuluCDstpTrgpggwrcg7LKZ7LaU6rWQ7KCVIn0sImdyb3d0aCI6eyJmaWxlIjoiZ3Jvd3RoLmh0bWwiLCJwYXRoIjoiL2dyb3d0aC8iLCJ0aXRsZSI6IuuMgOyghCDshozslYQg7YKk7ISx7J6lIMK3IOyEseyhsOyImeymnSDCtyDruYTsl7wg7ISx7J6l7YG066as64uJIHwg67CU66W47ZWc7J2Y7JuQIOuMgOyghOuzuOygkCIsImRlc2NyaXB0aW9uIjoi66y067Cp7IKs7ISgIOy0iOydjO2MjCDshLHsnqXtjJAg7KCV67CAIOqygOyCrOyZgCDqta3qsIDqs7Xsnbgg7JWI7IusIO2VnOyVveycvOuhnCDshLHtmLjrpbTrqqwg6rO87ZWt7KeEIOyXhuydtCDshLHsnqXtjJAg7Jew6rOoIOymneyLnSwg7IaM7JWE67mE66eMIOuMgOyCrCDsoITtmZgsIOu5hOyXvMK36rWs6rCV7Zi47Z2hIOuptOyXreydhCDtlajqu5gg7YKk7Jqw64qUIOuMgOyghCDshozslYQg7ISx7J6lIO2BtOumrOuLieyeheuLiOuLpC4iLCJwcmVsb2FkSW1nIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fqd2VpMDUwOC1jcHUvYmFyZXVuLWhvbWVwYWdlL21haW4vaG9tZXBhZ2Uvd2VicC9ncm93dGgtZGlyZWN0b3Itc29uLWNvbXBhcmlzb24ud2VicCIsImJyZWFkY3J1bWJOYW1lIjoi67CU66W4IOyEseyepSDCtyDshLHsobDsiJnspp0ifSwiZGlldC16ZXJvIjp7ImZpbGUiOiJkaWV0LXplcm8uaHRtbCIsInBhdGgiOiIvZGlldC16ZXJvLyIsInRpdGxlIjoi64yA7KCEIOuLpOydtOyWtO2KuCDtlZzsnZjsm5Agwrcg7Iud7JqVWkVSTyDqt7zsnKHri6TsnbTslrTtirggfCDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIiwiZGVzY3JpcHRpb24iOiLrrLTsnpHsoJUg6rW264qUIOyalOyalCDsl4bsnbQg6riw7LSI64yA7IKs7JmAIOqwiOyDieyngOuwqSDsl7Dshozrpbwg6rmo7JuMIOq3vOycoeydgCDsp4DtgqTqs6Ag64K07J6l7KeA67CpwrfrtoDsooUg64+F7IaM66eMIOu5hOybjOuCtOuKlCDrsJTrpbgg7Iud7JqVWkVSTyDri6TsnbTslrTtirgg7ZWc7JW9LiDrjIDtkZzsm5DsnqUgMToxIOynhOunpSDrsI8g67mE64yA66m0IOyDgeuLtOydhCDsp4Dsm5Dtlanri4jri6QuIiwicHJlbG9hZEltZyI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9handlaTA1MDgtY3B1L2JhcmV1bi1ob21lcGFnZS9tYWluL2hvbWVwYWdlL3dlYnAvZGlldF9taW5pbWFsX2NhcmQyX3N0YXJ2YXRpb25fbXVzY2xlX2xvc3Mud2VicCIsImJyZWFkY3J1bWJOYW1lIjoi67CU66W4IOuLpOydtOyWtO2KuCDCtyDsi53smpVaRVJPIn0sImhhaXJsb3NzIjp7ImZpbGUiOiJoYWlybG9zcy5odG1sIiwicGF0aCI6Ii9oYWlybG9zcy8iLCJ0aXRsZSI6IuuMgOyghCDtg4jrqqgg7ZWc7J2Y7JuQIMK3IOuRkO2UvOyXtCDrqqjqt7zsnqzsg50gNOuMgCDtgbTrpqzri4kgfCDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIiwiZGVzY3JpcHRpb24iOiLrqLjrpqzripQg65yo6rKB6rOgIOyGkOuwnOydgCDssKwg7IOB7Je07ZWY7ZWcIOuRkO2UvCDsgqzrp4ntmZTrpbwg7IiY7Iq57ZmU6rCVIOyyreyXtCDtlZzslb3Ct+qyvey2lCDstpTrgpjCt+uqqOuCrSDslb3suajsnLzroZwg64uk7Iqk66a964uI64ukLiDrgqjshLHCt+yXrOyEscK37JuQ7ZiV7YOI66qowrfsp4Dro6jshLHrkZDtlLzsl7wgNOuMgCDsnKDtmJXrs4Qg66ee7LakIOuqqOq3vOyerOyDnSDsuZjro4zrpbwg7Iuc7ZaJ7ZWp64uI64ukLiIsInByZWxvYWRJbWciOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWp3ZWkwNTA4LWNwdS9iYXJldW4taG9tZXBhZ2UvbWFpbi9ob21lcGFnZS93ZWJwL2RldGFpbF9oYWlyX3N0b3J5MV8zMGNtX3RlbnNpb24ud2VicCIsImJyZWFkY3J1bWJOYW1lIjoi67CU66W4IO2DiOuqqCDCtyDrqqjqt7zsnqzsg50ifSwiaGFpcmxvc3MtbWFsZSI6eyJmaWxlIjoiaGFpcmxvc3MtbWFsZS5odG1sIiwicGF0aCI6Ii9oYWlybG9zcy1tYWxlLyIsInRpdGxlIjoi64yA7KCEIOuCqOyEse2DiOuqqCDCtyBN7J6QIMK3IOygleyImOumrCDrqqjqt7zsnqzsg50gfCDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIO2DiOuqqCIsImRlc2NyaXB0aW9uIjoi7Zi466W066qsIOyWteygnCDrtoDri7TsnYQg642c6rOgIOyImOyKue2ZlOqwlSDrkZDtlLwg7LKt7Je0IO2VnOyVvSwg6rGw67aB66qpIOqyvey2lCDstpTrgpgsIOygleygnCDrsJzrqqgg7JW97Lmo7Jy866GcIE3snpAg7J2066eI7JmAIOygleyImOumrCDqsIDripjslrTsp4Qg66qo6re87J2YIOyekOyDneugpeydhCDquajsmrDripQg64yA7KCEIOuCqOyEse2DiOuqqCDsp5HspJEg7YG066as64uJ7J6F64uI64ukLiIsInByZWxvYWRJbWciOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWp3ZWkwNTA4LWNwdS9iYXJldW4taG9tZXBhZ2UvbWFpbi9ob21lcGFnZS93ZWJwL2RldGFpbF9oYWlyX3N0b3J5MV8zMGNtX3RlbnNpb24ud2VicCIsImJyZWFkY3J1bWJOYW1lIjoi67CU66W4IOuCqOyEse2DiOuqqCDCtyBN7J6QwrfsoJXsiJjrpqwifSwiaGFpcmxvc3MtYWxvcGVjaWEiOnsiZmlsZSI6ImhhaXJsb3NzLWFsb3BlY2lhLmh0bWwiLCJwYXRoIjoiL2hhaXJsb3NzLWFsb3BlY2lhLyIsInRpdGxlIjoi64yA7KCEIOybkO2Yle2DiOuqqCDCtyDsnpDqsIDrqbTsl60g65GQ7ZS8IOuzteybkCDtgbTrpqzri4kgfCDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIiwiZGVzY3JpcHRpb24iOiLsiqTthYzroZzsnbTrk5wg7J2Y7KG06rO8IOyerOuwnCDqsbHsoJUg7JeG7J20IOyekOycqOyLoOqyvShIUlYpIOyViOygleqzvCDrqqjrgq0g7KO87JyEIOyekOqwgOuptOyXrSDqt6DtmJUg7ZqM67O17Jy866GcIOuPmeyghCDrqqjslpEg64uo67Cc7ISxwrfri6TrsJzshLHCt+yCrO2WieyEsSDsm5DtmJXtg4jrqqjsnZgg67+M66as66W8IOy5mOujjO2VmOuKlCDrqbTsl60g67O17JuQIO2BtOumrOuLieyeheuLiOuLpC4iLCJwcmVsb2FkSW1nIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fqd2VpMDUwOC1jcHUvYmFyZXVuLWhvbWVwYWdlL21haW4vaG9tZXBhZ2Uvd2VicC9kZXRhaWxfaGFpcl9mb2xsaWNsZV8zZC53ZWJwIiwiYnJlYWRjcnVtYk5hbWUiOiLrsJTrpbgg7JuQ7ZiV7YOI66qoIMK3IOuptOyXreuzteybkCJ9LCJoYWlybG9zcy1mZW1hbGUiOnsiZmlsZSI6ImhhaXJsb3NzLWZlbWFsZS5odG1sIiwicGF0aCI6Ii9oYWlybG9zcy1mZW1hbGUvIiwidGl0bGUiOiLrjIDsoIQg7Jes7ISx7YOI66qoIMK3IOygleyImOumrCDqsIDrpbTrp4gg67O866WoIO2BtOumrOuLiSB8IOuwlOuluO2VnOydmOybkCDrjIDsoITrs7jsoJAiLCJkZXNjcmlwdGlvbiI6Iuy2nOyCsMK36rCx64WE6riwwrfsiqTtirjroIjsiqTroZwg65GQ7ZS864qUIOucqOqygeqzoCDslYTrnqvrsLDripQg7LCsIOyXrOyEsSDsg4Hsl7TtlZjtlZzqs7wg7ZiI7ZeI66W8IOuLpOyKpOugpCDrhJPslrTsp4Qg6rCA66W066eIIOuwgOuPhOyZgCDsoJXsiJjrpqwg66qo67CcIOuzvOulqOydhCDqsbTqsJXtlZjqsowg65CY7IK066as64qUIOyXrOyEsSDrp57stqQg7YOI66qoIO2BtOumrOuLieyeheuLiOuLpC4iLCJwcmVsb2FkSW1nIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fqd2VpMDUwOC1jcHUvYmFyZXVuLWhvbWVwYWdlL21haW4vaG9tZXBhZ2Uvd2VicC9kZXRhaWxfaGFpcl9zdG9yeTFfZGF0ZV9ib3cud2VicCIsImJyZWFkY3J1bWJOYW1lIjoi67CU66W4IOyXrOyEse2DiOuqqCDCtyDqsIDrpbTrp4jCt+uzvOulqCJ9LCJoYWlybG9zcy1zZWJvcnJoZWljIjp7ImZpbGUiOiJoYWlybG9zcy1zZWJvcnJoZWljLmh0bWwiLCJwYXRoIjoiL2hhaXJsb3NzLXNlYm9ycmhlaWMvIiwidGl0bGUiOiLrjIDsoIQg7KeA66Oo7ISx65GQ7ZS87Je8IMK3IOuRkO2UvCDtmY3rsJggwrcg66qo64Kt7Je8IO2VtOuPhSB8IOuwlOuluO2VnOydmOybkCDrjIDsoITrs7jsoJAiLCJkZXNjcmlwdGlvbiI6IuyDtO2RuMK37Jew6rOg66Gc64+EIOuwmOuzteuQmOuKlCDrkZDtlLwg7Je06rCQLCDrtonsnYAg7ZmN67CYLCDtmZTrho3shLEg66qo64Kt7Je8LCDqsIDroKTsm4Dqs7wg67mE65OsIOqwgeyniOydhCDsi6zrtoAg7LKt7Je07ZW064+FIO2VnOyVveqzvCDrkZDtlLwg7KeE7ZS8IOyepeuyvSDsvIDslrTroZwg7KeE7KCV7Iuc7YKk64qUIOyngOujqOyEseuRkO2UvOyXvCDtgbTrpqzri4nsnoXri4jri6QuIiwicHJlbG9hZEltZyI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9handlaTA1MDgtY3B1L2JhcmV1bi1ob21lcGFnZS9tYWluL2hvbWVwYWdlL3dlYnAvZGV0YWlsX2hhaXJfdGhlcm1vZ3JhcGh5LndlYnAiLCJicmVhZGNydW1iTmFtZSI6IuuwlOuluCDsp4Dro6jshLHrkZDtlLzsl7wgwrcg7Je064+F7ZW064+FIn0sImdvbmdqaW5kYW4iOnsiZmlsZSI6ImdvbmdqaW5kYW4uaHRtbCIsInBhdGgiOiIvZ29uZ2ppbmRhbi8iLCJ0aXRsZSI6IuuMgOyghCDqs7Xsp4Tri6ggwrcg7Iud7JW97LKYIOygle2SiCDsgqztlqUg7Zmp7KCc6rO17KeE64uoIHwg67CU66W47ZWc7J2Y7JuQIOuMgOyghOuzuOygkCIsImRlc2NyaXB0aW9uIjoi7Iud7JW97LKYIENJVEVTIOyduOymnSDsspzsl7Ag7IKs7ZalKEwtTXVzY29uZSnqs7wg65+s7Iuc7JWE7IKwIOybkOyaqSDrtoTqs6gg64W57Jqp7J2EIOuMgO2RnOybkOyepeydtCDsoJXrsIAg6rOE65+JwrfsiJjsoJwg7KGw7KCc7ZWp64uI64ukLiDrp4zshLHtlLzroZzCt+uHjOyLoOqyvSDrs7TtmLjCt+uptOyXreugpcK37IiY7ZeY7IOdwrfrtoDrqqjri5gg6riw66ClIO2ajOuztSDrp57stqQg7LKY67CpLiIsInByZWxvYWRJbWciOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWp3ZWkwNTA4LWNwdS9iYXJldW4taG9tZXBhZ2UvbWFpbi9ob21lcGFnZS93ZWJwL2dvbmdqaW5kYW5fbWluaW1hbF9jYXJkM19jaXJjdWxhdGlvbl9hLndlYnAiLCJicmVhZGNydW1iTmFtZSI6IuuwlOuluCDtmansoJzqs7Xsp4Tri6gifSwicHJvc3RhdGUiOnsiZmlsZSI6InByb3N0YXRlLmh0bWwiLCJwYXRoIjoiL3Byb3N0YXRlLyIsInRpdGxlIjoi64yA7KCEIOyghOumveyEoOyXvCDCtyDsoITrpr3shKDruYTrjIAgwrcg7JW86rCE64eoIO2BtOumrOuLiSB8IOuwlOuluO2VnOydmOybkCDrjIDsoITrs7jsoJAiLCJkZXNjcmlwdGlvbiI6IuuwmOuzteuQmOuKlCDsnpTrh6jqsJAsIOyDiOuyvSDslbzqsITrh6gsIOqzqOuwmMK37ZqM7J2M67aAIO2GteymneydhCDsoITrpr3shKAg7Jq47ZiIIOqwkOyVlSDtlZzslb0sIOqzqOuwmCDqtZDsoJUg7LaU64KYLCDrsKnqtJHCt+yLoOyepSDsmKjslpEg7JW97Lmo7Jy866GcIOuLpOyKpOugpCDsi5zsm5DtlZwg67Cw64eo7JmAIOq5iuydgCDsiJnrqbTsnYQg65CY7LC+7JWEIOuTnOumveuLiOuLpC4iLCJwcmVsb2FkSW1nIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fqd2VpMDUwOC1jcHUvYmFyZXVuLWhvbWVwYWdlL21haW4vaG9tZXBhZ2Uvd2VicC9wcm9zdGF0ZV9taW5pbWFsX2NhcmQyX2FudGliaW90aWNfbGltaXQud2VicCIsImJyZWFkY3J1bWJOYW1lIjoi67CU66W4IOyghOumveyEoCDCtyDrgqjshLHtmZzroKUifSwiYm9keS1leHBsb3JlciI6eyJmaWxlIjoiYm9keS1leHBsb3Jlci5odG1sIiwicGF0aCI6Ii9ib2R5LWV4cGxvcmVyLyIsInRpdGxlIjoiM0Qg7J247LK066qo7ZiVIO2VtOu2gO2VmSDqsIDsnbTrk5wgJiDsp4Tro4wg7IK07Y6067O06riwIHwg67CU66W47ZWc7J2Y7JuQIOuMgOyghOuzuOygkCIsImRlc2NyaXB0aW9uIjoi7ZKA7Iqk7YGs66awIDNEIOyduOyytOuqqO2YleycvOuhnCDrqLjrpqzrtoDthLAg67Cc64Gd6rmM7KeAIOq3vOycocK37Iug6rK9wrfqtIDsoIjCt+2YiOq0gCDqtazsobDsmYAgOeuMgCDrtoDsnITrs4Qg7IOd7ZmcIOqxtOqwlSDqtIDrpqzrspUsIO2VtOyZuCBTQ0kg7J2Y7ZWZIOuFvOusuCDsmpTslb3snYQg7ZWc64iI7JeQIO2DkOyDie2VmOuKlCDsnbjthLDrnpnti7DruIwg6rG06rCVIO2PrO2EuOyeheuLiOuLpC4iLCJwcmVsb2FkSW1nIjoiaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjYvMTAvb2ctYmFyZXVuLTEyMDB4NjMwLTEuanBnIiwiYnJlYWRjcnVtYk5hbWUiOiIzRCDsnbjssrTrqqjtmJUg7KeE66OMIOyCtO2OtOuztOq4sCJ9LCJhc2stZG9jdG9yIjp7ImZpbGUiOiJhc2stZG9jdG9yLmh0bWwiLCJwYXRoIjoiL2Fzay1kb2N0b3IvIiwidGl0bGUiOiLthrXtlansnZjtlZkg7J247IKs7J207Yq4IOyggOuEkCAmIDE6MSDruYTqs7XqsJwg6rG06rCVIFEmQSB8IOuwlOuluO2VnOydmOybkCDrjIDsoITrs7jsoJAiLCJkZXNjcmlwdGlvbiI6Ik5hdHVyZSBNZWRpY2luZcK3TkVKTcK3TGFuY2V0wrdKQU1BIOuTsSDtlbTsmbgg7J2Y7ZWZIOyggOuEkCDquLDrsJgg6rG06rCVIOy5vOufvOqzvCA564yAIOyniO2ZmCDsubTthYzqs6Drpqzrs4QgMTAwJSDruYTqs7XqsJwgMToxIOydmOujjOynhCDqsbTqsJUg7IOB64u0KOyGjOyFnCDqsITtjrgg66Gc6re47J24KSDqs7XqsITsnoXri4jri6QuIiwicHJlbG9hZEltZyI6Imh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI2LzEwL29nLWJhcmV1bi0xMjAweDYzMC0xLmpwZyIsImJyZWFkY3J1bWJOYW1lIjoi7J2Y7ZWZIOyduOyCrOydtO2KuCAmIDE6MSDruYTqs7XqsJwgUSZBIiwiaGFzRmFxIjp0cnVlfSwibGlmdGluZy1jb21wYXJlIjp7ImZpbGUiOiJsaWZ0aW5nLWNvbXBhcmUuaHRtbCIsInBhdGgiOiIvbGlmdGluZy1jb21wYXJlLyIsInRpdGxlIjoi64yA7KCEIO2VnOuwqSDrpqztlITtjIUgwrcg67mE7IiY7IigIOyghO2bhCDsnKTqs73sp4Tri6ggfCDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIiwiZGVzY3JpcHRpb24iOiLsiJjsiKAg7JeG7J20IOyymOynhCDthLHshKDCt+2MlOyekMK37JWI66m0IOu5hOuMgOy5rSDtg4TroKXsnYQg67O17JuQ7ZWY64qUIOuwlOuluO2VnOydmOybkCDrjIDsoITrs7jsoJAg7ZWc67CpIOunpOyEoMK37JW97LmoIOumrO2UhO2MhSDtgbTrpqzri4kg67CPIDPsoJAg7KSR7Ius7LaVIOygleuwgCDsoITtm4Qg7Jyk6rO9IOu5hOq1kCDsp4Tri6gg7Iqk7Yqc65SU7Jik7J6F64uI64ukLiIsInByZWxvYWRJbWciOiJodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyNi8xMC9vZy1iYXJldW4tMTIwMHg2MzAtMS5qcGciLCJicmVhZGNydW1iTmFtZSI6IuuwlOuluOumrO2UhO2MhSDsi5zsiKAg7KCE7ZuEIOycpOqzveynhOuLqCJ9LCJpbnRlZ3JhdGl2ZS1hdXRvbm9taWMtY2lyY2FkaWFuLWd1dC1zcGluZS1oZWFsdGgtcmV2aWV3Ijp7ImZpbGUiOm51bGwsInBhdGgiOiIvaW50ZWdyYXRpdmUtYXV0b25vbWljLWNpcmNhZGlhbi1ndXQtc3BpbmUtaGVhbHRoLXJldmlldy8iLCJ0aXRsZSI6IuunjOyEse2UvOuhnMK37IaM7ZmU7J6l7JWgwrfsspnstpTthrXspp0g7Ya17ZWp7IOd66as7ZWZIOqwgOydtOuTnCB8IOuwlOuluCDthrXtlansnZjtlZkg7KCA64SQIiwiZGVzY3JpcHRpb24iOiLrp4zshLEg7ZS866GcLCDshoztmZQg67aI65+JLCDsspnstpQg7Ya17Kad7J20IOyZnCDrj5nsi5zsl5Ag64KY7YOA64KY64qU7KeAIO2VtOyZuCBTQ0kg7ZWZ7Iig7KeAKE5hdHVyZSBNZWRpY2luZSwgSkFNQSwgTGFuY2V0KSDqt7zqsbDroZwg7J6Q7Jyo7Iug6rK9wrfsnqUt64eMIOy2lcK37IOd7LK07Jet7ZWZIOyXsOqysOqzoOumrOulvCDrtoTshJ3tlZwg7J2Y7ZWZIOumrOu3sOyeheuLiOuLpC4iLCJwcmVsb2FkSW1nIjoiaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjYvMTAvb2ctYmFyZXVuLTEyMDB4NjMwLTEuanBnIiwiYnJlYWRjcnVtYk5hbWUiOiLrp4zshLHtlLzroZzCt+yGjO2ZlOyepeyVoMK37LKZ7LaU7Ya17KadIO2Gte2VqeyDneumrO2VmSDqsIDsnbTrk5wiLCJpc0FydGljbGUiOnRydWUsImRhdGVQdWJsaXNoZWQiOiIyMDI2LTEwLTI2IiwiZGF0ZU1vZGlmaWVkIjoiMjAyNi0xMC0yOCJ9fX0=');
            $decoded = json_decode($raw, true);
            if (is_array($decoded) && isset($decoded['clinicBaseOrg']) && is_array($decoded['clinicBaseOrg'])) {
                $decoded['clinicBaseOrg']['telephone'] = '+82-10-5631-1275';
                $decoded['clinicBaseOrg']['contactPoint'] = array(
                    array(
                        '@type'             => 'ContactPoint',
                        'telephone'         => '+82-10-5631-1275',
                        'contactType'       => 'customer service',
                        'areaServed'        => 'KR',
                        'availableLanguage' => array('Korean')
                    )
                );
                $decoded['clinicBaseOrg']['taxID'] = '211-91-10479';
                $decoded['clinicBaseOrg']['vatID'] = '211-91-10479';
                $decoded['clinicBaseOrg']['areaServed'] = array(
                    array('@type' => 'AdministrativeArea', 'name' => '대전광역시'),
                    array('@type' => 'AdministrativeArea', 'name' => '대덕구')
                );
                $decoded['clinicBaseOrg']['identifier'] = array(
                    '@type' => 'PropertyValue',
                    'name'  => '사업자등록번호',
                    'value' => '211-91-10479'
                );
                if (!isset($decoded['clinicBaseOrg']['sameAs']) || !is_array($decoded['clinicBaseOrg']['sameAs'])) {
                    $decoded['clinicBaseOrg']['sameAs'] = array();
                }
                $official_same_as = array(
                    'https://www.youtube.com/@bareunhaniwon',
                    'https://naver.me/5U1ELn8L',
                    'https://blog.naver.com/wei0508',
                    'https://www.threads.net/@bareun_oriental',
                    'https://www.instagram.com/bareun_oriental/',
                    'https://pf.kakao.com/_ykxcLK'
                );
                foreach (array_reverse($official_same_as) as $sa_url) {
                    if (!in_array($sa_url, $decoded['clinicBaseOrg']['sameAs'], true)) {
                        array_unshift($decoded['clinicBaseOrg']['sameAs'], $sa_url);
                    }
                }
            }
            if (is_array($decoded) && isset($decoded['pages']) && is_array($decoded['pages'])) {
                $opt_a_title = '바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단·전립선';
                $opt_a_desc  = '내 가족에게 처방·시술한 치료만 하는 아빠 한의사, 바른한의원 대전본점(안정위 대표원장)입니다. 추나요법, 허리·목디스크, 소아 키성장, 성장판검사, 성조숙증, 비염, 축농증, 식욕ZERO 다이어트, 내장지방, 남성·여성·원형탈모, 지루성두피염, 담적, 위염, 난임, 산후보약, 황제공진단, 전립선, 리프팅 맞춤 한방 치료.';
                if (isset($decoded['pages']['home']) && is_array($decoded['pages']['home'])) {
                    $decoded['pages']['home']['title'] = $opt_a_title;
                    $decoded['pages']['home']['description'] = $opt_a_desc;
                }
                if (isset($decoded['pages']['story-3d']) && is_array($decoded['pages']['story-3d'])) {
                    $decoded['pages']['story-3d']['title'] = $opt_a_title;
                    $decoded['pages']['story-3d']['description'] = $opt_a_desc;
                }
                if (!isset($decoded['pages']['location'])) {
                    $decoded['pages']['location'] = array(
                        'path'        => '/location/',
                        'title'       => '오시는길 · 진료시간 · 주차 · 비급여 진료비 안내 | 바른한의원 대전본점',
                        'description' => '바른한의원 대전본점(대전 대덕구 비래동로7번길 1, 2층 · 경부고속도로 대전IC 3분 · 대전복합터미널 7분 · 대전역 동광장 택시 12분) 4대 내비 자동 길안내, 시내·광역·KTX 교통편, 진료시간 및 비급여 안내표입니다.',
                        'ogType'      => 'website',
                        'schemaType'  => 'MedicalWebPage'
                    );
                }
            }
            self::$cached_cfg = is_array($decoded) ? $decoded : array();
        }
        return self::$cached_cfg;
    }

    public static function ping_all_search_engines($urls) {
        $clean_urls = array();
        foreach ((array) $urls as $u) {
            $u = trim((string) $u);
            if ($u !== '' && strpos($u, 'https://www.bareunhaniwon.com/') === 0) {
                $clean_urls[] = $u;
            }
        }
        $clean_urls = array_slice(array_values(array_unique($clean_urls)), 0, 100);
        if (empty($clean_urls)) {
            return;
        }
        $payload = wp_json_encode(array(
            'host'        => self::CANONICAL_HOST,
            'key'         => self::INDEXNOW_KEY,
            'keyLocation' => self::CANONICAL_ORIGIN . '/' . self::INDEXNOW_KEY . '.txt',
            'urlList'     => $clean_urls
        ), JSON_UNESCAPED_SLASHES);

        // 1) Naver Search Advisor Official IndexNow Endpoint (Yeti instant queue)
        wp_remote_post('https://searchadvisor.naver.com/indexnow', array(
            'timeout'  => 3,
            'blocking' => false,
            'headers'  => array('Content-Type' => 'application/json; charset=utf-8'),
            'body'     => $payload
        ));

        // 2) Global IndexNow Endpoint (Bing / Copilot / ChatGPT Search / Yandex)
        wp_remote_post('https://api.indexnow.org/indexnow', array(
            'timeout'  => 3,
            'blocking' => false,
            'headers'  => array('Content-Type' => 'application/json; charset=utf-8'),
            'body'     => $payload
        ));

        // 3) Google Search Console Sitemap Refresh via Service Account
        if (class_exists('Bareun_Member_Private_QnA_V6_Plugin')) {
            Bareun_Member_Private_QnA_V6_Plugin::ping_gsc_sitemaps_nonblocking();
        }
    }

    public static function maybe_sync_htaccess_headers() {
        if (get_option(self::OPT_HTACCESS_VER) === '10') {
            return;
        }
        // Ensure default verified Naver & Google tokens are stored in wp_options if empty
        $cur_v = get_option(self::OPT_VERIFY_CODES, array());
        if (!is_array($cur_v)) {
            $cur_v = array();
        }
        if (empty($cur_v['naver'])) {
            $cur_v['naver'] = self::DEFAULT_NAVER_VERIFY;
        }
        if (empty($cur_v['google'])) {
            $cur_v['google'] = self::DEFAULT_GOOGLE_VERIFY;
        }
        update_option(self::OPT_VERIFY_CODES, $cur_v);

        // 1) Write physical /llms.txt (if custom not already stored) and IndexNow key .txt in ABSPATH so Nginx/OpenResty static handler serves 200 OK
        $llms_file = ABSPATH . 'llms.txt';
        $stored_llms = (string) get_option(self::OPT_LLMS_TXT, '');
        if ($stored_llms !== '') {
            @file_put_contents($llms_file, $stored_llms);
        } elseif (!file_exists($llms_file)) {
            @file_put_contents($llms_file, base64_decode('IyDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIChCYXJldW4gS29yZWFuIE1lZGljaW5lIENsaW5pYyBEYWVqZW9uIE1haW4gQnJhbmNoKQo+IOuMgOyghOq0keyXreyLnCDrjIDrjZXqtawg67mE656Y64+Z66GcN+uyiOq4uCAxLCAy7Li1ICjsmrDtjrjrsojtmLggMzQ0MTcpIHwg64yA7ZGc67KI7Zi4OiAwMTAtNTYzMS0xMjc1IHwg64yA7ZGc7JuQ7J6lOiDslYjsoJXsnIQKPiDsp4Tro4zsi5zqsIQ6IO2PieydvCjsm5R+6riIKSAwOTowMH4xOTowMCDCtyDthqDsmpTsnbwg67CPIOqzte2ctOydvCAwOTowMH4xNDowMCDCtyDsnbzsmpTsnbwg7Zy07KeECj4g7ZW07Jm4IOuplOydtOyggCDsnZjtlZkg7ZWZ7Iig7KeAKE5hdHVyZSBNZWRpY2luZSwgTkVKTSwgVGhlIExhbmNldCwgSkFNQSwgUGh5c2lvbG9naWNhbCBSZXZpZXdzLCBFdXJvcGVhbiBIZWFydCBKb3VybmFsLCBKQ0VNLCBIdW1hbiBSZXByb2R1Y3Rpb24gVXBkYXRlLCBFdXJvcGVhbiBVcm9sb2d5KSDrsI8g7Ya17ZWp7IOd66as7ZWZIOyXsOq1rCDqt7zqsbAg6riw67CYIDnrjIAg7KCV67CA6rKA7KeEIMK3IDE6MSDsgqzsg4HssrTsp4gg7ZWc7JW9IMK3IOyImOq4sCDstpTrgpggwrcg7IaM7JWEIO2CpOyEseyepSDCtyDsi53smpVaRVJPIOuLpOydtOyWtO2KuCDCtyDrkZDtlLzsl7Qg7YOI66qoIMK3IOygle2SiCDsgqztlqUg7Zmp7KCc6rO17KeE64uoIMK3IOyghOumveyEoCDtgbTrpqzri4kgJiDtkoDsiqTtgazrprAgM0Qg7J247LK066qo7ZiVIOqxtOqwlSDtj6zthLguCgojIyBDbGluaWMgSW5mb3JtYXRpb24gKE5BUCAmIE9mZmljaWFsIENoYW5uZWxzKQotIE9mZmljaWFsIFdlYnNpdGU6IGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tLwotIENsaW5pYyBOYW1lOiDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIChCYXJldW4gS29yZWFuIE1lZGljaW5lIENsaW5pYyBEYWVqZW9uKQotIENoaWVmIERpcmVjdG9yOiDslYjsoJXsnIQg64yA7ZGc7JuQ7J6lIChEci4gSnVuZy1XaSBBaG4sIEtNRCkKLSBBZGRyZXNzOiDrjIDsoITqtJHsl63si5wg64yA642V6rWsIOu5hOuemOuPmeuhnDfrsojquLggMSwgMuy4tSAoMkYsIDEsIEJpcmFlZG9uZy1ybyA3YmVvbi1naWwsIERhZWRlb2stZ3UsIERhZWplb24sIDM0NDE3LCBSZXB1YmxpYyBvZiBLb3JlYSkKLSBUZWxlcGhvbmU6IDAxMC01NjMxLTEyNzUgKCs4Mi0xMC01NjMxLTEyNzUpCi0gSG91cnM6IE1vbi1GcmkgMDk6MDAtMTk6MDAsIFNhdCAmIFB1YmxpYyBIb2xpZGF5cyAwOTowMC0xNDowMCwgQ2xvc2VkIG9uIFN1bmRheXMKLSBOYXZlciBQbGFjZTogaHR0cHM6Ly9uYXZlci5tZS81VTFFTG44TAotIE9mZmljaWFsIEJsb2c6IGh0dHBzOi8vYmxvZy5uYXZlci5jb20vd2VpMDUwOAotIEtha2FvVGFsayBDb25zdWx0YXRpb246IGh0dHBzOi8vcGYua2FrYW8uY29tL195a3hjTEsKCiMjIFNwZWNpYWxpemVkIENsaW5pY2FsIERpdmlzaW9ucwotIFvrqZTsnbggM0Qg7ZmY7J6QIOyKpO2GoOumrCDsh7zro7hdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tLyk6IOyVhOu5oCDtlZzsnZjsgqzrpbwg7LC+64qUIO2ZmOyekCDsiqTthqDrpqwg67CPIDbrjIAg7KSR7KCQIO2BtOumrOuLiSDslYjrgrQuCi0gW+yViOygleychCDrjIDtkZzsm5DsnqUgwrcgOeuMgCDsoJXrsIDqsoDsp4RdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2RpcmVjdG9yLyk6IOy0iOydjO2MjCwg7KCB7Jm47ISgIOyytOyXtOynhOuLqCwg7J2067mE7J247ZuEIOuCtOyLnOqyvSwg7IKs7IOB7LK07KeILCDssrTsp4DrsKkoSW5Cb2R5KSwg7J6Q7Jyo7Iug6rK9KEhSViksIOqwhMK364u5IOuMgOyCrCwg7ZiI6rSAIOuFuO2ZlCwg7ISx7J6l7YyQIOqygOyCrCDrsI8g7JuQ64K0IOustOq3oCDtg5XsoIQg7Iuc7Iqk7YWcLgotIFvrsJTrpbgg7LaU64KYIMK3IOyymey2lOq1kOyglSDtgbTrpqzri4ldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2NodW5hLyk6IO2XiOumrOuUlOyKpO2BrCwg66qp65SU7Iqk7YGsLCDqsbDrtoHrqqksIOqzqOuwmCDrtojqt6DtmJUsIOyymey2lOq0gO2YkeywqeymnSDruYTsiJjsiKAg64yA7ZGc7JuQ7J6lIOyImOq4sCDstpTrgpjsmpTrspUg67CPIOyVvey5qC4KLSBb67CU66W4IOyEseyepSDCtyDshLHsobDsiJnspp0g7YG066as64uJXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9ncm93dGgvKTog66y067Cp7IKs7ISgIOy0iOydjO2MjCDshLHsnqXtjJAg67aE7ISdLCDshozslYTruYTrp4wg7LK07KeA67CpLe2CpCDsoITtmZgsIOu5hOyXvMK36rWs6rCV7Zi47Z2hIOygkOuniSDrqbTsl60g67CPIOyEseyepSDtlZzslb0uCi0gW+uwlOuluCDri6TsnbTslrTtirggwrcg7Iud7JqVWkVSTyDtgbTrpqzri4ldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2RpZXQtemVyby8pOiDqsIjsg4nsp4DrsKkg64yA7IKsIO2ZnOyEse2ZlCwg6re87JyhIOuztOyhtCDssrTsp4DrsKkg6rCQ65+JLCDrtoDsooXCt+uPheyGjCDrsLDstpwg66ee7LakIO2VnOyVvSDrsI8g67mE64yA66m0IOynhOujjCDsp4Dsm5AuCi0gW+uwlOuluCDtg4jrqqggwrcg66qo6re87J6s7IOdIO2Gte2VqSDtgbTrpqzri4ldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2hhaXJsb3NzLyk6IOyImOyKue2ZlOqwlSDrkZDtlLwg7LKt7Je0IO2VnOyVvSwg6rK97LaUIOy2lOuCmCwg7KCV7KCcIOuwnOuqqCDslb3suaguCiAgLSBb64Ko7ISx7YOI66qoIChN7J6QwrfsoJXsiJjrpqwpXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9oYWlybG9zcy1tYWxlLykKICAtIFvsm5DtmJXtg4jrqqggKOyekOqwgOuptOyXrSDrs7Xsm5ApXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9oYWlybG9zcy1hbG9wZWNpYS8pCiAgLSBb7Jes7ISx7YOI66qoICjqsIDrpbTrp4jCt+uzvOulqCldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2hhaXJsb3NzLWZlbWFsZS8pCiAgLSBb7KeA66Oo7ISx65GQ7ZS87Je8ICjrkZDtlLwg7Je064+Fwrfrqqjrgq3sl7wg7ZW064+FKV0oaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vaGFpcmxvc3Mtc2Vib3JyaGVpYy8pCi0gW+uwlOuluCDtmansoJzqs7Xsp4Tri6gg7YG066as64uJXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9nb25namluZGFuLyk6IOyLneyVveyymCBDSVRFUyDsnbjspp0g7KCV7ZKIIOyynOyXsCDsgqztlqUoTC1NdXNjb25lKSDrsI8g65+s7Iuc7JWE7IKwIOybkOyaqSDrtoTqs6gg64W57JqpIOuMgO2RnOybkOyepSDsp4HsoJEg7IiY7KCcIOyhsOygnC4KLSBb67CU66W4IOyghOumveyEoCDCtyDrgqjshLHtmZzroKUg7YG066as64uJXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9wcm9zdGF0ZS8pOiDrp4zshLEg7KCE66a97ISg7Je8LCDsoITrpr3shKDruYTrjIDspp0sIOyVvOqwhOuHqCwg6rO866+87ISxIOuwqeq0kSwg6rOo67CY7KCA6re8IOyauO2YiCDqsJDslZUg7LmY66OMLgotIFvrsJTrpbjrpqztlITtjIUg7Iuc7IigIOyghO2bhCDsnKTqs73sp4Tri6hdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2xpZnRpbmctY29tcGFyZS8pOiDruYTsiJjsiKAg7ZWc67CpIOunpOyEoMK37JW97LmoIOyViOuptCDrpqztlITtjIUg67CPIDPsoJAg7KSR7Ius7LaVIOyghO2bhCDsnKTqs70g7KCV67CAIOu5hOq1kCDsiqTtipzrlJTsmKQuCgojIyBJbnRlcmFjdGl2ZSAzRCBBbmF0b215ICYgRXZpZGVuY2UtQmFzZWQgTWVkaWNhbCBKb3VybmFsCi0gW+2SgOyKpO2BrOumsCAzRCDsnbjssrTrqqjtmJUgwrcg7KeE66OMIOyCtO2OtOuztOq4sF0oaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vYm9keS1leHBsb3Jlci8pOiDsoITsi6Ag6re87Jyhwrfsi6Dqsr3Ct+q0gOygiMK37ZiI6rSAIDTrjIAg6rOE7Ya1IOyLpOyLnOqwhCAzRCDrqqjshZgg67CPIDnrjIAg67aA7JyE67OEIDLsnbwg7KO86riwIOyInOyImCDqsbTqsJUg7KCV67O0IOyVhOy5tOydtOu4jC4KLSBb7Ya17ZWp7J2Y7ZWZIOyduOyCrOydtO2KuCDsoIDrhJAgJiDsp4jtmZjrs4QgMToxIOu5hOqzteqwnCBRJkFdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2Fzay1kb2N0b3IvKTog7ZW07Jm4IFNDSSDtlZnsiKDsp4Ag6riw67CYIOydmO2VmSDrpqzrt7Ag67CPIO2ajOybkCDsoITsmqkgMTAwJSDruYTqs7XqsJwgMToxIOqxtOqwlSDsg4Hri7QuCi0gW+uMgO2RnCDtlZnsiKAg7Lm865+8OiDrp4zshLEg7ZS866GcwrfshoztmZQg7J6l7JWgwrfsspnstpQg7Ya17KadIO2Gte2VqeyDneumrO2VmSDqsIDsnbTrk5xdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2ludGVncmF0aXZlLWF1dG9ub21pYy1jaXJjYWRpYW4tZ3V0LXNwaW5lLWhlYWx0aC1yZXZpZXcvKTog7J6Q7Jyo7Iug6rK9LCDsnqUt64eMIOy2lShNaWNyb2Jpb3RhLUd1dC1CcmFpbiBBeGlzKSwg7LKZ7LaUIOyDneyytOyXre2VmeydmCDsg4HtmLjsnpHsmqkg66as67ewLgo='));
        }
        $stored_llms_full = (string) get_option(self::OPT_LLMS_FULL_TXT, '');
        if ($stored_llms_full !== '') {
            @file_put_contents(ABSPATH . 'llms-full.txt', $stored_llms_full);
        }
        $legacy_idx_file = ABSPATH . 'bareunhaniwon2026aiseokey849201.txt';
        if (file_exists($legacy_idx_file)) {
            @unlink($legacy_idx_file);
        }
        $idx_file = ABSPATH . self::INDEXNOW_KEY . '.txt';
        @file_put_contents($idx_file, self::INDEXNOW_KEY);

        // 2) Prepend security response headers block to .htaccess
        $ht_file = ABSPATH . '.htaccess';
        if (file_exists($ht_file) && is_writable($ht_file)) {
            $cur = @file_get_contents($ht_file);
            if (is_string($cur)) {
                $cur = preg_replace('/# BEGIN BareunSEOHeaders[\s\S]*?# END BareunSEOHeaders\s*/', '', $cur);
                $block = "# BEGIN BareunSEOHeaders\n"
                    . "<IfModule mod_headers.c>\n"
                    . "Header always set Strict-Transport-Security \"max-age=31536000; includeSubDomains\"\n"
                    . "Header always set Content-Security-Policy \"frame-ancestors 'self'; upgrade-insecure-requests\"\n"
                    . "Header always set X-Content-Type-Options \"nosniff\"\n"
                    . "Header always set X-Frame-Options \"SAMEORIGIN\"\n"
                    . "Header always set Referrer-Policy \"strict-origin-when-cross-origin\"\n"
                    . "</IfModule>\n"
                    . "# END BareunSEOHeaders\n\n";
                @file_put_contents($ht_file, $block . ltrim($cur));
            }
        }

        // 3) Wipe stale WP Super Cache across both bareunhaniwon.com and www.bareunhaniwon.com
        if (function_exists('wp_cache_clean_cache')) {
            global $file_prefix;
            @wp_cache_clean_cache(isset($file_prefix) ? $file_prefix : 'wp-cache-', true);
        }

        update_option(self::OPT_HTACCESS_VER, '10');
    }

    private static function is_request_https() {
        if (is_ssl()) {
            return true;
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower((string) $_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https') {
            return true;
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_SSL']) && strtolower((string) $_SERVER['HTTP_X_FORWARDED_SSL']) === 'on') {
            return true;
        }
        return false;
    }

    public static function handle_early_canonical_and_virtual_endpoints() {
        if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST) || (defined('WP_CLI') && WP_CLI)) {
            return;
        }
        $method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper((string) $_SERVER['REQUEST_METHOD']) : 'GET';
        if ($method !== 'GET' && $method !== 'HEAD') {
            return;
        }
        $req_uri = isset($_SERVER['REQUEST_URI']) ? (string) $_SERVER['REQUEST_URI'] : '/';
        if (preg_match('#^/(wp-admin|wp-login\.php|wp-json|wp-cron\.php|xmlrpc\.php)#i', $req_uri)) {
            return;
        }

        $host = isset($_SERVER['HTTP_HOST']) ? strtolower(trim((string) $_SERVER['HTTP_HOST'])) : '';
        $host = preg_replace('/:\d+$/', '', $host);
        $is_https = self::is_request_https();

        $parsed = parse_url($req_uri);
        $path = isset($parsed['path']) ? $parsed['path'] : '/';
        $query = isset($parsed['query']) && $parsed['query'] !== '' ? ('?' . $parsed['query']) : '';

        // Map legacy / thin archive paths to canonical targets in 1 hop
        $target_path = $path;
        if (preg_match('#^/gongjindan-[23](/.*)?$#i', $path)) {
            $target_path = '/gongjindan/';
        } elseif (preg_match('#^/46-2(/.*)?$#i', $path)) {
            $target_path = '/';
        } elseif (preg_match('#^/author(/.*)?$#i', $path)) {
            $target_path = '/director/';
        } elseif (preg_match('#^/(category|tag|health-notes|ask-doctor)(/.*)?$#i', $path)) {
            $target_path = '/body-explorer/';
        } elseif (preg_match('#^/health-note-([a-z0-9\-]+)$#i', $path, $hn_m)) {
            // Normalize missing trailing slash to canonical /health-note-{id}/ in 1 hop
            $target_path = '/health-note-' . strtolower($hn_m[1]) . '/';
        }

        // Enforce 1-hop 301 redirect to https://www.bareunhaniwon.com + canonical path
        if (($host !== '' && $host !== self::CANONICAL_HOST) || !$is_https || $target_path !== $path) {
            if (!defined('DONOTCACHEPAGE')) {
                define('DONOTCACHEPAGE', true);
            }
            header('Cache-Control: no-store, no-cache, must-revalidate', true);
            header('Location: ' . self::CANONICAL_ORIGIN . $target_path . $query, true, 301);
            exit;
        }

        // Record GEO AI crawler hits before virtual endpoints or standalone SSR exit
        if (class_exists('Bareun_Member_Private_QnA_V6_Plugin')) {
            Bareun_Member_Private_QnA_V6_Plugin::maybe_track_geo_ai_crawler();
        }

        // Serve Standalone 7-Stage High-End Health Note SSR (/health-note-{id}/, HTTP 200 OK, 0% Astra chrome, 0% Studio Inspector/OSMU tabs)
        if (preg_match('#^/health-note-([a-z0-9\-]+)/$#i', $path, $hn_serve_m)) {
            if (self::render_standalone_health_note_ssr(strtolower($hn_serve_m[1]))) {
                exit;
            }
        }

        // Serve virtual /llms.txt & /llms-full.txt (AI GEO C7)
        if ($path === '/llms.txt' || $path === '/llms-full.txt') {
            if (!defined('DONOTCACHEPAGE')) {
                define('DONOTCACHEPAGE', true);
            }
            self::send_security_headers();
            status_header(200);
            header('Content-Type: text/plain; charset=utf-8', true);
            header('Cache-Control: public, max-age=3600', true);
            $custom_llms = ($path === '/llms-full.txt')
                ? (string) get_option(self::OPT_LLMS_FULL_TXT, '')
                : (string) get_option(self::OPT_LLMS_TXT, '');
            if ($custom_llms !== '') {
                if (strpos($custom_llms, '211-91-10479') === false) {
                    $custom_llms = "- Business Registration Number (사업자등록번호): 211-91-10479\n" . $custom_llms;
                }
                global $wpdb;
                $qna_table = $wpdb->prefix . 'bareun_private_qna';
                $pub_qnas = $wpdb->get_results(
                    "SELECT id, part_id, title, content, master_reply FROM {$qna_table} WHERE is_secret = 0 AND status = 'answered' AND master_reply IS NOT NULL AND master_reply != '' ORDER BY id DESC LIMIT 50",
                    ARRAY_A
                );
                if (is_array($pub_qnas) && !empty($pub_qnas)) {
                    $custom_llms .= "\n## 무엇이든 물어보세요 (공개 1:1 건강 Q&A 질의응답)\n";
                    foreach ($pub_qnas as $pq) {
                        $qt = trim((string)($pq['title'] ?? ''));
                        $qr = trim((string)($pq['master_reply'] ?? ''));
                        if ($qt !== '' && $qr !== '') {
                            $custom_llms .= '- [' . $qt . '](' . self::CANONICAL_ORIGIN . '/body-explorer/?tab=qna&qnaId=' . (int)$pq['id'] . '): ' . $qr . "\n";
                        }
                    }
                }
                echo $custom_llms;
                exit;
            }
            echo base64_decode('IyDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIChCYXJldW4gS29yZWFuIE1lZGljaW5lIENsaW5pYyBEYWVqZW9uIE1haW4gQnJhbmNoKQo+IOuMgOyghOq0keyXreyLnCDrjIDrjZXqtawg67mE656Y64+Z66GcN+uyiOq4uCAxLCAy7Li1ICjsmrDtjrjrsojtmLggMzQ0MTcpIHwg64yA7ZGc67KI7Zi4OiAwMTAtNTYzMS0xMjc1IHwg64yA7ZGc7JuQ7J6lOiDslYjsoJXsnIQKPiDsp4Tro4zsi5zqsIQ6IO2PieydvCjsm5R+6riIKSAwOTowMH4xOTowMCDCtyDthqDsmpTsnbwg67CPIOqzte2ctOydvCAwOTowMH4xNDowMCDCtyDsnbzsmpTsnbwg7Zy07KeECj4g7ZW07Jm4IOuplOydtOyggCDsnZjtlZkg7ZWZ7Iig7KeAKE5hdHVyZSBNZWRpY2luZSwgTkVKTSwgVGhlIExhbmNldCwgSkFNQSwgUGh5c2lvbG9naWNhbCBSZXZpZXdzLCBFdXJvcGVhbiBIZWFydCBKb3VybmFsLCBKQ0VNLCBIdW1hbiBSZXByb2R1Y3Rpb24gVXBkYXRlLCBFdXJvcGVhbiBVcm9sb2d5KSDrsI8g7Ya17ZWp7IOd66as7ZWZIOyXsOq1rCDqt7zqsbAg6riw67CYIDnrjIAg7KCV67CA6rKA7KeEIMK3IDE6MSDsgqzsg4HssrTsp4gg7ZWc7JW9IMK3IOyImOq4sCDstpTrgpggwrcg7IaM7JWEIO2CpOyEseyepSDCtyDsi53smpVaRVJPIOuLpOydtOyWtO2KuCDCtyDrkZDtlLzsl7Qg7YOI66qoIMK3IOygle2SiCDsgqztlqUg7Zmp7KCc6rO17KeE64uoIMK3IOyghOumveyEoCDtgbTrpqzri4kgJiDtkoDsiqTtgazrprAgM0Qg7J247LK066qo7ZiVIOqxtOqwlSDtj6zthLguCgojIyBDbGluaWMgSW5mb3JtYXRpb24gKE5BUCAmIE9mZmljaWFsIENoYW5uZWxzKQotIE9mZmljaWFsIFdlYnNpdGU6IGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tLwotIENsaW5pYyBOYW1lOiDrsJTrpbjtlZzsnZjsm5Ag64yA7KCE67O47KCQIChCYXJldW4gS29yZWFuIE1lZGljaW5lIENsaW5pYyBEYWVqZW9uKQotIENoaWVmIERpcmVjdG9yOiDslYjsoJXsnIQg64yA7ZGc7JuQ7J6lIChEci4gSnVuZy1XaSBBaG4sIEtNRCkKLSBBZGRyZXNzOiDrjIDsoITqtJHsl63si5wg64yA642V6rWsIOu5hOuemOuPmeuhnDfrsojquLggMSwgMuy4tSAoMkYsIDEsIEJpcmFlZG9uZy1ybyA3YmVvbi1naWwsIERhZWRlb2stZ3UsIERhZWplb24sIDM0NDE3LCBSZXB1YmxpYyBvZiBLb3JlYSkKLSBUZWxlcGhvbmU6IDAxMC01NjMxLTEyNzUgKCs4Mi0xMC01NjMxLTEyNzUpCi0gSG91cnM6IE1vbi1GcmkgMDk6MDAtMTk6MDAsIFNhdCAmIFB1YmxpYyBIb2xpZGF5cyAwOTowMC0xNDowMCwgQ2xvc2VkIG9uIFN1bmRheXMKLSBOYXZlciBQbGFjZTogaHR0cHM6Ly9uYXZlci5tZS81VTFFTG44TAotIE9mZmljaWFsIEJsb2c6IGh0dHBzOi8vYmxvZy5uYXZlci5jb20vd2VpMDUwOAotIEtha2FvVGFsayBDb25zdWx0YXRpb246IGh0dHBzOi8vcGYua2FrYW8uY29tL195a3hjTEsKCiMjIFNwZWNpYWxpemVkIENsaW5pY2FsIERpdmlzaW9ucwotIFvrqZTsnbggM0Qg7ZmY7J6QIOyKpO2GoOumrCDsh7zro7hdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tLyk6IOyVhOu5oCDtlZzsnZjsgqzrpbwg7LC+64qUIO2ZmOyekCDsiqTthqDrpqwg67CPIDbrjIAg7KSR7KCQIO2BtOumrOuLiSDslYjrgrQuCi0gW+yViOygleychCDrjIDtkZzsm5DsnqUgwrcgOeuMgCDsoJXrsIDqsoDsp4RdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2RpcmVjdG9yLyk6IOy0iOydjO2MjCwg7KCB7Jm47ISgIOyytOyXtOynhOuLqCwg7J2067mE7J247ZuEIOuCtOyLnOqyvSwg7IKs7IOB7LK07KeILCDssrTsp4DrsKkoSW5Cb2R5KSwg7J6Q7Jyo7Iug6rK9KEhSViksIOqwhMK364u5IOuMgOyCrCwg7ZiI6rSAIOuFuO2ZlCwg7ISx7J6l7YyQIOqygOyCrCDrsI8g7JuQ64K0IOustOq3oCDtg5XsoIQg7Iuc7Iqk7YWcLgotIFvrsJTrpbgg7LaU64KYIMK3IOyymey2lOq1kOyglSDtgbTrpqzri4ldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2NodW5hLyk6IO2XiOumrOuUlOyKpO2BrCwg66qp65SU7Iqk7YGsLCDqsbDrtoHrqqksIOqzqOuwmCDrtojqt6DtmJUsIOyymey2lOq0gO2YkeywqeymnSDruYTsiJjsiKAg64yA7ZGc7JuQ7J6lIOyImOq4sCDstpTrgpjsmpTrspUg67CPIOyVvey5qC4KLSBb67CU66W4IOyEseyepSDCtyDshLHsobDsiJnspp0g7YG066as64uJXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9ncm93dGgvKTog66y067Cp7IKs7ISgIOy0iOydjO2MjCDshLHsnqXtjJAg67aE7ISdLCDshozslYTruYTrp4wg7LK07KeA67CpLe2CpCDsoITtmZgsIOu5hOyXvMK36rWs6rCV7Zi47Z2hIOygkOuniSDrqbTsl60g67CPIOyEseyepSDtlZzslb0uCi0gW+uwlOuluCDri6TsnbTslrTtirggwrcg7Iud7JqVWkVSTyDtgbTrpqzri4ldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2RpZXQtemVyby8pOiDqsIjsg4nsp4DrsKkg64yA7IKsIO2ZnOyEse2ZlCwg6re87JyhIOuztOyhtCDssrTsp4DrsKkg6rCQ65+JLCDrtoDsooXCt+uPheyGjCDrsLDstpwg66ee7LakIO2VnOyVvSDrsI8g67mE64yA66m0IOynhOujjCDsp4Dsm5AuCi0gW+uwlOuluCDtg4jrqqggwrcg66qo6re87J6s7IOdIO2Gte2VqSDtgbTrpqzri4ldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2hhaXJsb3NzLyk6IOyImOyKue2ZlOqwlSDrkZDtlLwg7LKt7Je0IO2VnOyVvSwg6rK97LaUIOy2lOuCmCwg7KCV7KCcIOuwnOuqqCDslb3suaguCiAgLSBb64Ko7ISx7YOI66qoIChN7J6QwrfsoJXsiJjrpqwpXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9oYWlybG9zcy1tYWxlLykKICAtIFvsm5DtmJXtg4jrqqggKOyekOqwgOuptOyXrSDrs7Xsm5ApXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9oYWlybG9zcy1hbG9wZWNpYS8pCiAgLSBb7Jes7ISx7YOI66qoICjqsIDrpbTrp4jCt+uzvOulqCldKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2hhaXJsb3NzLWZlbWFsZS8pCiAgLSBb7KeA66Oo7ISx65GQ7ZS87Je8ICjrkZDtlLwg7Je064+Fwrfrqqjrgq3sl7wg7ZW064+FKV0oaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vaGFpcmxvc3Mtc2Vib3JyaGVpYy8pCi0gW+uwlOuluCDtmansoJzqs7Xsp4Tri6gg7YG066as64uJXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9nb25namluZGFuLyk6IOyLneyVveyymCBDSVRFUyDsnbjspp0g7KCV7ZKIIOyynOyXsCDsgqztlqUoTC1NdXNjb25lKSDrsI8g65+s7Iuc7JWE7IKwIOybkOyaqSDrtoTqs6gg64W57JqpIOuMgO2RnOybkOyepSDsp4HsoJEg7IiY7KCcIOyhsOygnC4KLSBb67CU66W4IOyghOumveyEoCDCtyDrgqjshLHtmZzroKUg7YG066as64uJXShodHRwczovL3d3dy5iYXJldW5oYW5pd29uLmNvbS9wcm9zdGF0ZS8pOiDrp4zshLEg7KCE66a97ISg7Je8LCDsoITrpr3shKDruYTrjIDspp0sIOyVvOqwhOuHqCwg6rO866+87ISxIOuwqeq0kSwg6rOo67CY7KCA6re8IOyauO2YiCDqsJDslZUg7LmY66OMLgotIFvrsJTrpbjrpqztlITtjIUg7Iuc7IigIOyghO2bhCDsnKTqs73sp4Tri6hdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2xpZnRpbmctY29tcGFyZS8pOiDruYTsiJjsiKAg7ZWc67CpIOunpOyEoMK37JW97LmoIOyViOuptCDrpqztlITtjIUg67CPIDPsoJAg7KSR7Ius7LaVIOyghO2bhCDsnKTqs70g7KCV67CAIOu5hOq1kCDsiqTtipzrlJTsmKQuCgojIyBJbnRlcmFjdGl2ZSAzRCBBbmF0b215ICYgRXZpZGVuY2UtQmFzZWQgTWVkaWNhbCBKb3VybmFsCi0gW+2SgOyKpO2BrOumsCAzRCDsnbjssrTrqqjtmJUgwrcg7KeE66OMIOyCtO2OtOuztOq4sF0oaHR0cHM6Ly93d3cuYmFyZXVuaGFuaXdvbi5jb20vYm9keS1leHBsb3Jlci8pOiDsoITsi6Ag6re87Jyhwrfsi6Dqsr3Ct+q0gOygiMK37ZiI6rSAIDTrjIAg6rOE7Ya1IOyLpOyLnOqwhCAzRCDrqqjshZgg67CPIDnrjIAg67aA7JyE67OEIDLsnbwg7KO86riwIOyInOyImCDqsbTqsJUg7KCV67O0IOyVhOy5tOydtOu4jC4KLSBb7Ya17ZWp7J2Y7ZWZIOyduOyCrOydtO2KuCDsoIDrhJAgJiDsp4jtmZjrs4QgMToxIOu5hOqzteqwnCBRJkFdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2Fzay1kb2N0b3IvKTog7ZW07Jm4IFNDSSDtlZnsiKDsp4Ag6riw67CYIOydmO2VmSDrpqzrt7Ag67CPIO2ajOybkCDsoITsmqkgMTAwJSDruYTqs7XqsJwgMToxIOqxtOqwlSDsg4Hri7QuCi0gW+uMgO2RnCDtlZnsiKAg7Lm865+8OiDrp4zshLEg7ZS866GcwrfshoztmZQg7J6l7JWgwrfsspnstpQg7Ya17KadIO2Gte2VqeyDneumrO2VmSDqsIDsnbTrk5xdKGh0dHBzOi8vd3d3LmJhcmV1bmhhbml3b24uY29tL2ludGVncmF0aXZlLWF1dG9ub21pYy1jaXJjYWRpYW4tZ3V0LXNwaW5lLWhlYWx0aC1yZXZpZXcvKTog7J6Q7Jyo7Iug6rK9LCDsnqUt64eMIOy2lShNaWNyb2Jpb3RhLUd1dC1CcmFpbiBBeGlzKSwg7LKZ7LaUIOyDneyytOyXre2VmeydmCDsg4HtmLjsnpHsmqkg66as67ewLgo=');
            exit;
        }

        // Serve virtual IndexNow key file (C5)
        if ($path === '/' . self::INDEXNOW_KEY . '.txt') {
            if (!defined('DONOTCACHEPAGE')) {
                define('DONOTCACHEPAGE', true);
            }
            self::send_security_headers();
            status_header(200);
            header('Content-Type: text/plain; charset=utf-8', true);
            header('Cache-Control: public, max-age=86400', true);
            echo self::INDEXNOW_KEY;
            exit;
        }
    }

    private static function format_hn_table_cell_php($raw) {
        $s = trim((string) $raw);
        if (strpos($s, '[권장]') === 0) {
            return '<span class="row-badge-good">권장</span> ' . esc_html(trim(substr($s, strlen('[권장]'))));
        }
        if (strpos($s, '[주의]') === 0) {
            return '<span class="row-badge-warn">주의</span> ' . esc_html(trim(substr($s, strlen('[주의]'))));
        }
        if (strpos($s, '[특징]') === 0) {
            return '<span class="row-badge-good">특징</span> ' . esc_html(trim(substr($s, strlen('[특징]'))));
        }
        return esc_html($s);
    }

    private static function render_standalone_health_note_ssr($note_id) {
        $clean_id = strtolower(preg_replace('/[^a-z0-9\-]/i', '', (string) $note_id));
        if ($clean_id === '') {
            return false;
        }
        $hn_cfg = class_exists('Bareun_Custom_Studio_Engine_V4')
            ? Bareun_Custom_Studio_Engine_V4::load_health_notes_cfg_php(false)
            : get_option('bareun_health_notes_cfg_v1', array());

        if (!is_array($hn_cfg) || empty($hn_cfg['notes']) || !is_array($hn_cfg['notes'])) {
            return false;
        }

        $target = null;
        $siblings = array();
        foreach ($hn_cfg['notes'] as $item) {
            if (!is_array($item) || (isset($item['enabled']) && $item['enabled'] === false)) {
                continue;
            }
            if (strtolower((string) ($item['id'] ?? '')) === $clean_id) {
                $target = $item;
                break;
            }
        }
        if (!is_array($target)) {
            return false;
        }

        $part_id = strtolower((string) ($target['partId'] ?? 'knee'));
        foreach ($hn_cfg['notes'] as $item) {
            if (!is_array($item) || (isset($item['enabled']) && $item['enabled'] === false)) {
                continue;
            }
            if (strtolower((string) ($item['partId'] ?? '')) === $part_id) {
                $siblings[] = $item;
            }
        }

        $hub_map = array(
            'knee'       => array('name' => '소아 성장 · 무릎 성장판', 'url' => self::CANONICAL_ORIGIN . '/growth/', 'btn' => '🌱 성장·성조숙증 클리닉', 'hero' => 'illust_knee_growth_care.jpg'),
            'cervical'   => array('name' => '거북목 · 두피열 · 탈모', 'url' => self::CANONICAL_ORIGIN . '/hairloss/', 'btn' => '🌿 탈모·모근재생 클리닉', 'hero' => 'illust_cervical_hairloss.jpg'),
            'lumbar'     => array('name' => '허리 물렁뼈 · 골반 균형', 'url' => self::CANONICAL_ORIGIN . '/chuna/', 'btn' => '🦴 추나·척추교정 클리닉', 'hero' => 'illust_lumbar_pelvis.jpg'),
            'gongjindan' => array('name' => '뇌 · 심장 활력 · 만성피로', 'url' => self::CANONICAL_ORIGIN . '/gongjindan/', 'btn' => '✨ 황제공진단 클리닉', 'hero' => 'illust_gongjindan_heart_brain.jpg'),
            'syncope'    => array('name' => '자율신경 · 어지럼 · 편두통', 'url' => self::CANONICAL_ORIGIN . '/director/', 'btn' => '🧠 9대 자율신경 정밀검진', 'hero' => 'illust_syncope_autonomic.jpg'),
            'digest'     => array('name' => '위장 · 식도 운동 · 소화', 'url' => self::CANONICAL_ORIGIN . '/director/', 'btn' => '🩺 복부초음파·체열 정밀검진', 'hero' => 'illust_gut_metabolism.jpg'),
            'gut'        => array('name' => '복부 대사 · 체지방 · 부종', 'url' => self::CANONICAL_ORIGIN . '/diet-zero/', 'btn' => '⚖️ 다이어트·식욕ZERO 클리닉', 'hero' => 'diet_minimal_card4_stage2_core_lipolysis.jpg'),
            'uterus'     => array('name' => '아랫배 · 골반 미세혈류 순환', 'url' => self::CANONICAL_ORIGIN . '/director/', 'btn' => '🌸 하복부초음파·체열 검진', 'hero' => 'illust_uterus_fertility.jpg'),
            'prostate'   => array('name' => '전립선 · 방광 · 골반저 순환', 'url' => self::CANONICAL_ORIGIN . '/prostate/', 'btn' => '🛡️ 전립선·남성활력 클리닉', 'hero' => 'illust_prostate_care.jpg')
        );
        $hub = isset($hub_map[$part_id]) ? $hub_map[$part_id] : $hub_map['lumbar'];

        $part_label = trim((string) ($target['partLabel'] ?? $hub['name']));
        $keyword    = trim((string) ($target['keyword'] ?? $part_label));
        $theme      = trim((string) ($target['theme'] ?? $keyword));
        $q_title    = trim((string) ($target['questionTitle'] ?? $target['title'] ?? ''));
        $seo_base   = trim((string) ($target['seoTitle'] ?? ''));
        if ($seo_base === '') {
            $seo_base = $q_title . ' [' . $part_label . ' · ' . $keyword . ']';
        }
        $page_title = (strpos($seo_base, '바른한의원') !== false) ? $seo_base : ($seo_base . ' | 바른한의원 대전본점');

        $empathy_lines = (isset($target['empathyLines']) && is_array($target['empathyLines'])) ? $target['empathyLines'] : array();
        $truth_lines   = (isset($target['truthLines']) && is_array($target['truthLines'])) ? $target['truthLines'] : array();
        $myth_lines    = (isset($target['mythLines']) && is_array($target['mythLines'])) ? $target['mythLines'] : array();
        $check_list    = (isset($target['checkList']) && is_array($target['checkList'])) ? $target['checkList'] : array();

        $direct_answer = trim((string) ($target['directAnswer'] ?? ''));
        if ($direct_answer === '') {
            $direct_answer = trim(implode(' ', $truth_lines) . ' ' . (string) ($myth_lines[1] ?? ''));
        }
        $meta_desc = $direct_answer;
        if (mb_strlen($meta_desc, 'UTF-8') > 158) {
            $meta_desc = mb_substr($meta_desc, 0, 157, 'UTF-8') . '…';
        }

        $gh_raw = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';
        $resolve_slot_fn = function ($raw_str) use ($gh_raw) {
            $s = trim((string) $raw_str);
            if ($s === '') {
                return array('canonical' => '', 'display' => '');
            }
            if (preg_match('#^https?://#i', $s)) {
                return array('canonical' => $s, 'display' => $s);
            }
            if (strpos($s, '/wp-content/') === 0) {
                $abs = self::CANONICAL_ORIGIN . $s;
                return array('canonical' => $abs, 'display' => $abs);
            }
            $clean = ltrim($s, './');
            $canon = $gh_raw . $clean;
            $disp  = (stripos($clean, 'webp/') === 0)
                ? ($gh_raw . $clean)
                : ($gh_raw . 'webp/' . preg_replace('/\.(png|jpe?g)$/i', '.webp', $clean));
            return array('canonical' => $canon, 'display' => $disp);
        };

        $raw_hero = trim((string) ($target['deepIllustImg'] ?? $hub['hero']));
        if ($raw_hero === '') {
            $raw_hero = $hub['hero'];
        }
        $hero_urls = $resolve_slot_fn($raw_hero);
        $og_img    = $hero_urls['canonical'];
        $webp_hero = $hero_urls['display'];

        // Only fall back to WP post thumbnail when note uses generic hub hero
        if ($raw_hero === $hub['hero']) {
            $hn_post = get_page_by_path('health-note-' . $clean_id, OBJECT, 'post');
            if ($hn_post && $hn_post->post_status === 'publish') {
                $thumb_u = get_the_post_thumbnail_url($hn_post, 'full');
                if (!empty($thumb_u)) {
                    $og_img = preg_replace('#^https?://(www\.)?bareunhaniwon\.com#i', self::CANONICAL_ORIGIN, (string) $thumb_u);
                }
            }
        }

        $empathy_urls    = $resolve_slot_fn($target['empathyIllustImg'] ?? '');
        $routine_urls    = $resolve_slot_fn($target['routineIllustImg'] ?? '');
        $empathy_caption = trim((string) ($target['empathyIllustCaption'] ?? ''));
        $empathy_alt     = trim((string) ($target['empathyIllustAlt'] ?? ($part_label . ' 일상 공감 장면 — ' . ($empathy_caption !== '' ? $empathy_caption : $theme))));
        $routine_caption = trim((string) ($target['routineIllustCaption'] ?? ''));
        $routine_alt     = trim((string) ($target['routineIllustAlt'] ?? ($part_label . ' 전후 실천 루틴 비교 — ' . ($routine_caption !== '' ? $routine_caption : $theme))));
        $consumer_kws    = array();
        if (isset($target['consumerKeywords']) && is_array($target['consumerKeywords'])) {
            foreach ($target['consumerKeywords'] as $ckw) {
                $ckw_s = trim((string) $ckw);
                if ($ckw_s !== '') {
                    $consumer_kws[] = $ckw_s;
                }
            }
        }

        $pub_date = trim((string) ($target['publishDate'] ?? '2026-11-04'));
        $rev_date = trim((string) ($target['lastReviewed'] ?? ($pub_date > '2026-11-11' ? $pub_date : '2026-11-15')));
        $canonical_url = self::CANONICAL_ORIGIN . '/health-note-' . rawurlencode($clean_id) . '/';
        $explorer_part_url = self::CANONICAL_ORIGIN . '/body-explorer/?part=' . rawurlencode($part_id) . '&note=' . rawurlencode($clean_id);
        $director_avatar = $gh_raw . 'webp/card_1_director.webp';

        $deep_caption = trim((string) ($target['deepIllustCaption'] ?? ($part_label . ' 해부 생리 모식도')));
        $deep_alt     = trim((string) ($target['deepIllustAlt'] ?? ($part_label . ' — ' . $deep_caption)));
        $merged_kws   = array_values(array_unique(array_filter(array_merge(
            array($keyword, $part_label, $theme),
            $consumer_kws,
            array('오늘의 건강 글')
        ))));
        $merged_kw_str = implode(', ', $merged_kws);
        $schema_imgs   = array_values(array_unique(array_filter(array(
            $empathy_urls['canonical'],
            $og_img,
            $routine_urls['canonical']
        ))));
        if (empty($schema_imgs)) {
            $schema_imgs = array($og_img);
        }
        $preload_lead_img = ($empathy_urls['display'] !== '') ? $empathy_urls['display'] : $webp_hero;
        $deep_title   = trim((string) ($target['deepTitle'] ?? ($theme . ', 우리 몸속에서는 어떤 변화가 일어날까요?')));
        $deep_paras   = (isset($target['deepParagraphs']) && is_array($target['deepParagraphs'])) ? $target['deepParagraphs'] : array();
        $clin_obs     = trim((string) ($target['clinicalObservation'] ?? ''));
        $comp_table   = (isset($target['comparisonTable']) && is_array($target['comparisonTable']) && !empty($target['comparisonTable']['headers']) && !empty($target['comparisonTable']['rows']))
            ? $target['comparisonTable']
            : null;
        $self_checks  = (isset($target['selfCheckItems']) && is_array($target['selfCheckItems']) && !empty($target['selfCheckItems']))
            ? $target['selfCheckItems']
            : $check_list;
        $deep_signals = (isset($target['deepSignals']) && is_array($target['deepSignals'])) ? $target['deepSignals'] : array();
        $red_flags    = (isset($target['redFlags']) && is_array($target['redFlags'])) ? $target['redFlags'] : array();
        $academic     = trim((string) ($target['academicBasis'] ?? '국제 의학 학술지 및 생리학 연구 보고'));
        $deep_ref     = trim((string) ($target['deepReference'] ?? ('참고 문헌 · ' . $academic)));

        // Unified Central View Counter (100% shared with /body-explorer/ via bareun_body_note_views_v1)
        $note_views = get_option('bareun_body_note_views_v1', array());
        if (!is_array($note_views)) {
            $note_views = array();
        }
        $norm_views = array();
        foreach ($note_views as $vk => $vv) {
            $lvk = strtolower((string) $vk);
            $norm_views[$lvk] = max(isset($norm_views[$lvk]) ? (int) $norm_views[$lvk] : 0, (int) $vv);
        }
        $cur_views = isset($norm_views[$clean_id]) ? (int) $norm_views[$clean_id] : 0;

        // Sort sibling articles by unified popularity (views DESC -> publishDate DESC -> id DESC) matching /body-explorer/ BEST 2
        $today_kst_str = current_time('Y-m-d');
        $peer_candidates = array();
        foreach ($siblings as $cand) {
            if (!is_array($cand) || empty($cand['id'])) {
                continue;
            }
            $cid = strtolower((string) $cand['id']);
            if ($cid === $clean_id) {
                continue;
            }
            $cpub = (string) ($cand['publishDate'] ?? '');
            if ($cpub === '2026-10-28' || strpos($cid, '20261028') !== false) {
                continue;
            }
            if ($cpub !== '' && $cpub > $today_kst_str && empty($cand['pinnedTop'])) {
                continue;
            }
            $cand['_views'] = isset($norm_views[$cid]) ? (int) $norm_views[$cid] : 0;
            $peer_candidates[] = $cand;
        }
        usort($peer_candidates, function ($a, $b) {
            $va = isset($a['_views']) ? (int) $a['_views'] : 0;
            $vb = isset($b['_views']) ? (int) $b['_views'] : 0;
            if ($vb !== $va) {
                return $vb - $va;
            }
            $da = (string) ($a['publishDate'] ?? '');
            $db = (string) ($b['publishDate'] ?? '');
            $dcmp = strcmp($db, $da);
            if ($dcmp !== 0) {
                return $dcmp;
            }
            return strcmp((string) ($b['id'] ?? ''), (string) ($a['id'] ?? ''));
        });
        $best2 = array_slice($peer_candidates, 0, 2);

        // 5-Node Unified Authoritative JSON-LD Graph (Zero FAQPage)
        $schema_graph = array(
            '@context' => 'https://schema.org',
            '@graph'   => array(
                array(
                    '@type'         => array('MedicalClinic', 'MedicalOrganization', 'LocalBusiness'),
                    '@id'           => self::CANONICAL_ORIGIN . '/#clinic',
                    'name'          => '바른한의원 대전본점',
                    'alternateName' => array('Bareun Korean Medicine Clinic Daejeon', '대전 바른한의원'),
                    'url'           => self::CANONICAL_ORIGIN . '/',
                    'telephone'     => '+82-10-5631-1275',
                    'taxID'         => '211-91-10479',
                    'vatID'         => '211-91-10479',
                    'priceRange'    => '₩₩',
                    'address'       => array(
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '비래동로7번길 1, 2층',
                        'addressLocality' => '대덕구',
                        'addressRegion'   => '대전광역시',
                        'postalCode'      => '34417',
                        'addressCountry'  => 'KR'
                    ),
                    'geo'           => array(
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 36.35536,
                        'longitude' => 127.44778
                    ),
                    'areaServed'    => array(
                        array('@type' => 'AdministrativeArea', 'name' => '대전광역시'),
                        array('@type' => 'AdministrativeArea', 'name' => '대덕구')
                    ),
                    'sameAs'        => array(
                        'https://www.youtube.com/@bareunhaniwon',
                        'https://naver.me/5U1ELn8L',
                        'https://blog.naver.com/wei0508',
                        'https://www.threads.net/@bareun_oriental',
                        'https://www.instagram.com/bareun_oriental/',
                        'https://pf.kakao.com/_ykxcLK'
                    ),
                    'founder'       => array('@id' => self::CANONICAL_ORIGIN . '/director/#physician')
                ),
                array(
                    '@type'      => 'Person',
                    '@id'        => self::CANONICAL_ORIGIN . '/director/#physician',
                    'name'       => '안정위',
                    'jobTitle'   => '대표원장 (한의사)',
                    'url'        => self::CANONICAL_ORIGIN . '/director/',
                    'worksFor'   => array('@id' => self::CANONICAL_ORIGIN . '/#clinic'),
                    'knowsAbout' => array('소아 키 성장', '성조숙증 예방', '초음파 성장판 관찰', '추나요법', '두피열 탈모', '자율신경 및 대사 기능의학')
                ),
                array(
                    '@type'           => 'BreadcrumbList',
                    '@id'             => $canonical_url . '#breadcrumb',
                    'itemListElement' => array(
                        array('@type' => 'ListItem', 'position' => 1, 'name' => '홈', 'item' => self::CANONICAL_ORIGIN . '/'),
                        array('@type' => 'ListItem', 'position' => 2, 'name' => '3D 인체모형 · 오늘의 건강 글', 'item' => self::CANONICAL_ORIGIN . '/body-explorer/'),
                        array('@type' => 'ListItem', 'position' => 3, 'name' => $hub['name'], 'item' => $hub['url']),
                        array('@type' => 'ListItem', 'position' => 4, 'name' => $theme, 'item' => $canonical_url)
                    )
                ),
                array(
                    '@type'              => 'MedicalWebPage',
                    '@id'                => $canonical_url . '#webpage',
                    'url'                => $canonical_url,
                    'name'               => $page_title,
                    'headline'           => $q_title,
                    'description'        => $direct_answer,
                    'inLanguage'         => 'ko-KR',
                    'datePublished'      => $pub_date,
                    'dateModified'       => $rev_date,
                    'lastReviewed'       => $rev_date,
                    'reviewedBy'         => array('@id' => self::CANONICAL_ORIGIN . '/director/#physician'),
                    'breadcrumb'         => array('@id' => $canonical_url . '#breadcrumb'),
                    'primaryImageOfPage' => array(
                        '@type'   => 'ImageObject',
                        'url'     => $og_img,
                        'width'   => 1376,
                        'height'  => 768,
                        'caption' => $part_label . ' (' . $keyword . ') — ' . $deep_caption
                    ),
                    'about'              => array('@type' => 'AnatomicalStructure', 'name' => $part_label),
                    'speakable'          => array(
                        '@type'       => 'SpeakableSpecification',
                        'cssSelector' => array('.direct-answer-lead', '.clinical-observation-box')
                    )
                ),
                array(
                    '@type'            => 'MedicalScholarlyArticle',
                    '@id'              => $canonical_url . '#article',
                    'mainEntityOfPage' => array('@id' => $canonical_url . '#webpage'),
                    'headline'         => $q_title,
                    'description'      => $direct_answer,
                    'image'            => $schema_imgs,
                    'datePublished'    => $pub_date . 'T09:00:00+09:00',
                    'dateModified'     => $rev_date . 'T10:30:00+09:00',
                    'inLanguage'       => 'ko-KR',
                    'author'           => array('@id' => self::CANONICAL_ORIGIN . '/director/#physician'),
                    'publisher'        => array('@id' => self::CANONICAL_ORIGIN . '/#clinic'),
                    'articleSection'   => $part_label . ' · ' . $theme,
                    'keywords'         => $merged_kw_str,
                    'citation'         => array($academic)
                )
            )
        );

        // Channels config
        $g_cfg = isset($hn_cfg['globalSettings']) && is_array($hn_cfg['globalSettings']) ? $hn_cfg['globalSettings'] : array();
        $ch_cfg = isset($g_cfg['channels']) && is_array($g_cfg['channels']) ? $g_cfg['channels'] : array();
        $yt_url = isset($ch_cfg['youtube']['url']) ? (string) $ch_cfg['youtube']['url'] : 'https://www.youtube.com/@bareunhaniwon';
        $nv_url = is_string($ch_cfg['naver'] ?? null) ? $ch_cfg['naver'] : (isset($ch_cfg['naver']['url']) ? (string) $ch_cfg['naver']['url'] : 'https://naver.me/5U1ELn8L');
        $th_url = isset($ch_cfg['threads']['url']) ? (string) $ch_cfg['threads']['url'] : 'https://www.threads.net/@bareun_oriental';
        $ig_url = isset($ch_cfg['instagram']['url']) ? (string) $ch_cfg['instagram']['url'] : 'https://www.instagram.com/bareun_oriental/';
        $kk_url = isset($ch_cfg['kakao']['url']) ? (string) $ch_cfg['kakao']['url'] : 'https://pf.kakao.com/_ykxcLK';

        $verify_codes = get_option(self::OPT_VERIFY_CODES, array());
        $naver_v  = !empty($verify_codes['naver']) ? (string) $verify_codes['naver'] : self::DEFAULT_NAVER_VERIFY;
        $google_v = !empty($verify_codes['google']) ? (string) $verify_codes['google'] : self::DEFAULT_GOOGLE_VERIFY;

        if (!defined('DONOTCACHEPAGE')) {
            define('DONOTCACHEPAGE', true);
        }
        self::send_security_headers();
        status_header(200);
        header('Content-Type: text/html; charset=UTF-8', true);
        header('Cache-Control: no-cache, must-revalidate, max-age=0', true);

        echo "<!DOCTYPE html>\n<html lang=\"ko\">\n<head>\n";
        echo '  <meta charset="UTF-8" />' . "\n";
        echo '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />' . "\n";
        echo '  <title>' . esc_html($page_title) . '</title>' . "\n";
        echo '  <meta name="description" content="' . esc_attr($meta_desc) . '" />' . "\n";
        echo '  <meta name="keywords" content="' . esc_attr($merged_kw_str) . '" />' . "\n";
        echo '  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />' . "\n";
        if ($naver_v !== '') {
            echo '  <meta name="naver-site-verification" content="' . esc_attr($naver_v) . '" />' . "\n";
        }
        if ($google_v !== '') {
            echo '  <meta name="google-site-verification" content="' . esc_attr($google_v) . '" />' . "\n";
        }
        echo '  <link rel="canonical" href="' . esc_url($canonical_url) . '" />' . "\n";
        echo '  <link rel="alternate" hreflang="ko-KR" href="' . esc_url($canonical_url) . '" />' . "\n";
        echo '  <link rel="alternate" hreflang="x-default" href="' . esc_url($canonical_url) . '" />' . "\n";
        echo '  <link rel="alternate" type="application/rss+xml" title="바른한의원 대전본점 RSS" href="' . esc_url(self::CANONICAL_ORIGIN . '/feed/') . '" />' . "\n";
        echo '  <meta property="og:type" content="article" />' . "\n";
        echo '  <meta property="og:site_name" content="바른한의원 대전본점" />' . "\n";
        echo '  <meta property="og:locale" content="ko_KR" />' . "\n";
        echo '  <meta property="og:title" content="' . esc_attr($page_title) . '" />' . "\n";
        echo '  <meta property="og:description" content="' . esc_attr($meta_desc) . '" />' . "\n";
        echo '  <meta property="og:url" content="' . esc_url($canonical_url) . '" />' . "\n";
        echo '  <meta property="og:image" content="' . esc_url($og_img) . '" />' . "\n";
        echo '  <meta property="og:image:width" content="1376" />' . "\n";
        echo '  <meta property="og:image:height" content="768" />' . "\n";
        echo '  <meta property="article:published_time" content="' . esc_attr($pub_date . 'T09:00:00+09:00') . '" />' . "\n";
        echo '  <meta property="article:modified_time" content="' . esc_attr($rev_date . 'T10:30:00+09:00') . '" />' . "\n";
        echo '  <meta property="article:section" content="' . esc_attr($part_label . ' · ' . $keyword) . '" />' . "\n";
        echo '  <meta name="twitter:card" content="summary_large_image" />' . "\n";
        echo '  <link rel="preload" as="image" href="' . esc_url($preload_lead_img) . '" />' . "\n";
        echo '  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />' . "\n";
        echo '  <link rel="preconnect" href="https://fonts.googleapis.com" />' . "\n";
        echo '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' . "\n";
        echo '  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />' . "\n";
        echo '  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&display=swap" rel="stylesheet" />' . "\n";
        echo '  <script type="application/ld+json">' . wp_json_encode($schema_graph, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        if (class_exists('Bareun_Member_Private_QnA_V6_Plugin')) {
            Bareun_Member_Private_QnA_V6_Plugin::render_external_analytics_head_tags();
        }
        ?>
  <style>
    :root { --bg-paper:#FAF8F3; --bg-card:#FFFFFF; --bg-warm:#F4EFE4; --ink-900:#161412; --ink-700:#3A352F; --ink-500:#6B6359; --gold-600:#9E772B; --gold-500:#C5A059; --gold-200:#E7D7B4; --gold-50:#FDF9EE; --espresso:#14110F; --border-soft:#E8E1D3; --emerald-bg:#ECFDF5; --emerald-ink:#065F46; --rose-bg:#FFF1F2; --rose-ink:#9F1239; }
    * { box-sizing:border-box; } html { scroll-behavior:smooth; }
    body { margin:0; background:var(--bg-paper); color:var(--ink-900); font-family:'Pretendard Variable','Pretendard',-apple-system,BlinkMacSystemFont,sans-serif; line-height:1.78; -webkit-font-smoothing:antialiased; }
    .clinic-top-header { background:#FFFFFF; border-bottom:1px solid var(--border-soft); padding:14px 20px; position:sticky; top:0; z-index:100; }
    .clinic-top-inner { max-width:920px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
    .clinic-brand-link { display:inline-flex; align-items:center; gap:10px; text-decoration:none; color:var(--ink-900); font-weight:800; font-size:0.98rem; }
    .clinic-brand-mark { width:30px; height:30px; border-radius:8px; background:var(--espresso); color:var(--gold-500); display:inline-flex; align-items:center; justify-content:center; font-family:'Noto Serif KR',serif; font-weight:800; font-size:0.88rem; border:1px solid var(--gold-500); }
    .clinic-header-actions { display:inline-flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .header-action-link { display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:999px; font-size:0.8rem; font-weight:700; text-decoration:none; transition:transform 0.15s ease; }
    .header-action-link:hover { transform:translateY(-1px); }
    .header-action-3d { background:var(--espresso); color:#F5DFB0; border:1px solid var(--gold-500); }
    .header-action-home { background:var(--bg-warm); color:var(--ink-700); border:1px solid var(--border-soft); }
    .header-action-share { appearance:none; font-family:inherit; cursor:pointer; background:linear-gradient(135deg,#E7C983 0%,#C59E50 100%); color:#14110F; border:1px solid #C5A059; box-shadow:0 2px 8px rgba(197,160,89,0.28); }
    .header-action-share.is-copied, .ch-pill-share.is-copied { background:#065F46 !important; color:#FFFFFF !important; border-color:#34D399 !important; }
    .view-count-chip { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:999px; background:#F4EFE4; border:1px solid var(--gold-200); color:var(--ink-700); font-size:0.75rem; font-weight:800; font-variant-numeric:tabular-nums; }
    .ch-pill-share { appearance:none; font-family:inherit; cursor:pointer; background:linear-gradient(135deg,#161412 0%,#26211B 100%) !important; color:#F5DFB0 !important; border:1px solid #C5A059 !important; }
    #standaloneShareToast { position:fixed; left:50%; bottom:32px; transform:translate(-50%,16px); z-index:9999; padding:11px 18px; border-radius:999px; background:rgba(20,17,15,0.96); color:#F7E5BA; border:1.5px solid #C5A059; box-shadow:0 12px 32px rgba(0,0,0,0.28); font-size:0.82rem; font-weight:800; white-space:nowrap; max-width:calc(100vw - 24px); overflow:hidden; text-overflow:ellipsis; opacity:0; visibility:hidden; pointer-events:none; transition:opacity 0.22s ease,transform 0.22s ease,visibility 0.22s ease; }
    #standaloneShareToast.show { opacity:1; visibility:visible; transform:translate(-50%,0); }
    .article-shell { max-width:820px; margin:0 auto; padding:30px 20px 76px; }
    .breadcrumb-nav { display:flex; align-items:center; gap:7px; flex-wrap:wrap; font-size:0.79rem; color:var(--ink-500); margin-bottom:18px; }
    .breadcrumb-nav a { color:var(--ink-500); text-decoration:none; font-weight:600; }
    .breadcrumb-nav a:hover { color:var(--gold-600); text-decoration:underline; }
    .editorial-header { background:var(--bg-card); border:1px solid var(--border-soft); border-top:4px solid var(--gold-500); border-radius:20px; padding:28px 28px 24px; box-shadow:0 10px 30px rgba(22,20,18,0.04); margin-bottom:22px; }
    .topic-kicker-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:12px; }
    .topic-chip { display:inline-flex; align-items:center; padding:4px 11px; border-radius:999px; background:var(--gold-50); border:1px solid var(--gold-200); color:var(--gold-600); font-size:0.77rem; font-weight:800; }
    .read-meta { font-size:0.78rem; color:var(--ink-500); font-weight:600; }
    h1.article-h1 { margin:0 0 20px; font-family:'Noto Serif KR',serif; font-size:clamp(1.42rem,2.8vw,1.92rem); line-height:1.42; font-weight:800; color:var(--ink-900); letter-spacing:-0.02em; word-break:keep-all; }
    .ymyl-reviewer-bar { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:14px 16px; border-radius:14px; background:var(--bg-paper); border:1px solid var(--border-soft); flex-wrap:wrap; }
    .reviewer-profile { display:flex; align-items:center; gap:12px; }
    .reviewer-avatar { width:48px; height:48px; border-radius:50%; object-fit:cover; object-position:center 18%; border:2px solid var(--gold-500); background:#E8E1D3; flex-shrink:0; }
    .reviewer-info-title { font-size:0.86rem; font-weight:800; color:var(--ink-900); display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
    .verified-pill { display:inline-flex; align-items:center; gap:3px; padding:2px 8px; border-radius:999px; background:#EBF5FF; color:#1D4ED8; font-size:0.7rem; font-weight:800; }
    .reviewer-info-sub { font-size:0.77rem; color:var(--ink-500); margin-top:2px; }
    .reviewer-info-sub a { color:var(--gold-600); font-weight:700; text-decoration:none; }
    .direct-answer-lead { background:linear-gradient(180deg,#FFFDF8 0%,#FDF8EC 100%); border:1.5px solid var(--gold-500); border-left:5px solid var(--gold-600); border-radius:16px; padding:20px 22px; margin-bottom:24px; }
    .direct-answer-label { display:inline-flex; align-items:center; gap:6px; font-size:0.8rem; font-weight:800; color:var(--gold-600); margin-bottom:8px; }
    .direct-answer-lead p { margin:0; font-size:0.98rem; font-weight:600; color:var(--ink-900); line-height:1.76; word-break:keep-all; }
    .content-section { background:var(--bg-card); border:1px solid var(--border-soft); border-radius:18px; padding:26px 26px; margin-bottom:20px; }
    .content-section h2 { margin:0 0 14px; font-family:'Noto Serif KR',serif; font-size:1.2rem; font-weight:800; color:var(--ink-900); line-height:1.45; word-break:keep-all; }
    .content-section h3 { margin:20px 0 8px; font-size:1rem; font-weight:800; color:var(--ink-900); }
    .content-section p { margin:0 0 14px; font-size:0.96rem; color:var(--ink-700); word-break:keep-all; }
    .content-section p:last-child { margin-bottom:0; }
    .myth-truth-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; margin-top:16px; }
    .mt-card { padding:15px 16px; border-radius:13px; font-size:0.9rem; line-height:1.66; word-break:keep-all; }
    .mt-myth { background:var(--rose-bg); border:1px solid #FECDD3; color:var(--rose-ink); }
    .mt-truth { background:var(--emerald-bg); border:1px solid #A7F3D0; color:var(--emerald-ink); }
    .mt-tag { display:inline-block; font-size:0.76rem; font-weight:800; margin-bottom:5px; }
    .medical-figure-wrap { margin:0 0 20px; background:var(--bg-card); border:1px solid var(--border-soft); border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(22,20,18,0.04); }
    .medical-figure-wrap img { width:100%; height:auto; max-height:430px; object-fit:cover; display:block; }
    .medical-figcaption { padding:12px 18px; background:#F7F3E9; border-top:1px solid var(--border-soft); font-size:0.83rem; color:var(--ink-700); font-weight:600; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .slot-badge { display:inline-flex; align-items:center; padding:2px 9px; border-radius:999px; font-size:0.71rem; font-weight:800; letter-spacing:-0.01em; flex-shrink:0; }
    .slot-badge-empathy { background:var(--espresso); color:#F4DFB0; border:1px solid var(--gold-500); }
    .slot-badge-mechanism { background:var(--gold-600); color:#FFFFFF; }
    .slot-badge-routine { background:#065F46; color:#ECFDF5; }
    .consumer-kw-row { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-top:12px; padding-top:12px; border-top:1px dashed var(--gold-200); }
    .consumer-kw-label { font-size:0.75rem; font-weight:800; color:var(--gold-600); margin-right:2px; }
    .consumer-kw-chip { display:inline-flex; align-items:center; padding:3px 10px; border-radius:999px; background:#FFFFFF; border:1px solid var(--gold-200); color:var(--ink-700); font-size:0.75rem; font-weight:700; }
    .bridge-3d-banner { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 22px; background:linear-gradient(135deg,#171310 0%,#261E18 100%); color:#FFFFFF; border-top:1px solid rgba(197,160,89,0.35); flex-wrap:wrap; }
    .bridge-3d-text strong { display:block; font-size:0.95rem; color:#F4DFB0; margin-bottom:3px; }
    .bridge-3d-text span { font-size:0.82rem; color:#D7CFC0; }
    .bridge-3d-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 18px; border-radius:999px; background:linear-gradient(135deg,#D7B56D,#B58938); color:#14110F; font-size:0.85rem; font-weight:800; text-decoration:none; white-space:nowrap; box-shadow:0 4px 14px rgba(197,160,89,0.35); }
    .clinical-observation-box { margin-top:16px; padding:18px 20px; border-radius:14px; background:#FAF6EC; border:1px solid var(--gold-200); }
    .clinical-obs-header { font-size:0.85rem; font-weight:800; color:var(--gold-600); margin-bottom:7px; }
    .table-scroll { overflow-x:auto; margin-top:14px; border-radius:13px; border:1px solid var(--border-soft); }
    table.comparison-table { width:100%; border-collapse:collapse; min-width:600px; font-size:0.88rem; background:#FFFFFF; }
    table.comparison-table th { background:#1D1916; color:#F5E3B8; text-align:left; padding:12px 14px; font-weight:800; font-size:0.82rem; }
    table.comparison-table td { padding:13px 14px; border-top:1px solid var(--border-soft); color:var(--ink-700); vertical-align:top; line-height:1.6; }
    table.comparison-table tr.recommended-row td { background:#FFFDF6; color:var(--ink-900); font-weight:600; }
    .row-badge-good { display:inline-block; padding:2px 7px; border-radius:5px; background:#DCFCE7; color:#166534; font-size:0.72rem; font-weight:800; margin-right:4px; }
    .row-badge-warn { display:inline-block; padding:2px 7px; border-radius:5px; background:#FFE4E6; color:#9F1239; font-size:0.72rem; font-weight:800; margin-right:4px; }
    .check-list-interactive { display:flex; flex-direction:column; gap:10px; margin-top:14px; }
    .check-item-label { display:flex; align-items:flex-start; gap:12px; padding:13px 15px; border-radius:12px; border:1px solid var(--border-soft); background:var(--bg-paper); cursor:pointer; font-size:0.92rem; color:var(--ink-900); word-break:keep-all; }
    .check-item-label.checked { border-color:var(--gold-600); background:#FDF8EC; font-weight:700; }
    .check-item-label input[type="checkbox"] { width:19px; height:19px; margin-top:3px; accent-color:#9E772B; flex-shrink:0; cursor:pointer; }
    .score-result-box { margin-top:16px; padding:18px 20px; border-radius:14px; background:#181512; color:#F8F5EE; border:1px solid var(--gold-500); }
    .score-result-top { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:6px; flex-wrap:wrap; }
    .score-pill { padding:3px 10px; border-radius:999px; background:var(--gold-500); color:#14110F; font-size:0.76rem; font-weight:800; }
    .score-result-desc { margin:0; font-size:0.9rem; color:#EAE3D5; line-height:1.68; }
    .redflag-box { padding:18px 20px; border-radius:14px; background:#F8FAFC; border:1px solid #CBD5E1; border-left:4px solid #334155; margin-top:12px; }
    .redflag-box ul { margin:8px 0 0; padding-left:18px; font-size:0.9rem; color:#334155; }
    .redflag-box li { margin-bottom:6px; }
    .references-box { margin-top:16px; padding:14px 18px; border-radius:12px; background:var(--bg-paper); border:1px solid var(--border-soft); font-size:0.81rem; color:var(--ink-500); }
    .cluster-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-top:12px; }
    .cluster-card { display:block; padding:14px 16px; border-radius:12px; background:var(--bg-paper); border:1px solid var(--border-soft); text-decoration:none; color:var(--ink-900); }
    .cluster-card:hover { border-color:var(--gold-500); }
    .cluster-kicker { font-size:0.73rem; font-weight:800; color:var(--gold-600); margin-bottom:4px; }
    .cluster-title { font-size:0.89rem; font-weight:700; line-height:1.45; word-break:keep-all; }
    .official-channels-bar { margin-top:22px; padding:18px 20px; border-radius:16px; background:#F4EFE4; border:1px solid #DFD3BC; display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap; }
    .channel-bar-copy strong { display:block; font-size:0.9rem; color:var(--ink-900); }
    .channel-bar-copy span { font-size:0.78rem; color:var(--ink-500); }
    .channel-pills { display:inline-flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .ch-pill { display:inline-flex; align-items:center; gap:6px; padding:7px 13px 7px 8px; border-radius:999px; background:#FFFFFF; border:1px solid #E2DDD2; font-size:0.79rem; font-weight:800; color:#1A1A1E; text-decoration:none; }
    .ch-icon { width:24px; height:24px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
    @media (max-width:720px) { .myth-truth-grid, .cluster-grid { grid-template-columns:1fr; } .editorial-header, .content-section { padding:20px 18px; } }
  </style>
</head>
<body>
  <header class="clinic-top-header">
    <div class="clinic-top-inner">
      <a href="<?php echo esc_url(self::CANONICAL_ORIGIN . '/'); ?>" class="clinic-brand-link">
        <span class="clinic-brand-mark">바</span>
        <span>바른한의원 대전본점 · 오늘의 건강 글</span>
      </a>
      <div class="clinic-header-actions">
        <button type="button" onclick="copyStandaloneShareLink(this)" class="header-action-link header-action-share" title="이 건강 글 링크 복사·퍼가기">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span data-share-label="1">링크 퍼가기</span>
        </button>
        <a href="<?php echo esc_url($explorer_part_url); ?>" class="header-action-link header-action-3d">🧬 3D 인체모형으로 <?php echo esc_html($part_label); ?> 입체 보기</a>
        <a href="<?php echo esc_url($hub['url']); ?>" class="header-action-link header-action-home"><?php echo esc_html($hub['btn']); ?></a>
      </div>
    </div>
  </header>

  <main>
    <article class="article-shell">
      <nav class="breadcrumb-nav" aria-label="경로 탐색">
        <a href="<?php echo esc_url(self::CANONICAL_ORIGIN . '/'); ?>">홈</a>
        <span>›</span>
        <a href="<?php echo esc_url(self::CANONICAL_ORIGIN . '/body-explorer/'); ?>">3D 인체모형 · 오늘의 건강 글</a>
        <span>›</span>
        <a href="<?php echo esc_url($hub['url']); ?>"><?php echo esc_html($hub['name']); ?></a>
        <span>›</span>
        <strong style="color:var(--ink-900);"><?php echo esc_html($theme); ?></strong>
      </nav>

      <header class="editorial-header">
        <div class="topic-kicker-row">
          <span class="topic-chip"><?php echo esc_html($part_label . ' · ' . $keyword); ?></span>
          <span class="view-count-chip" id="standalone-note-view-count" data-note-view-id="<?php echo esc_attr($clean_id); ?>">조회수 <?php echo number_format($cur_views); ?>회</span>
          <span class="read-meta">발행 <?php echo esc_html(str_replace('-', '.', $pub_date)); ?> · 최종 의학 검토 <?php echo esc_html(str_replace('-', '.', $rev_date)); ?> · 읽는 시간 약 3분</span>
        </div>
        <h1 class="article-h1"><?php echo esc_html($q_title); ?></h1>
        <div class="ymyl-reviewer-bar">
          <div class="reviewer-profile">
            <img src="<?php echo esc_url($director_avatar); ?>" alt="바른한의원 대전본점 안정위 대표원장" width="48" height="48" class="reviewer-avatar" />
            <div>
              <div class="reviewer-info-title">
                <span>집필 · 의학 감수: 안정위 한의사</span>
                <span class="verified-pill">✓ 한의사 면허 · 대표원장 직접 감수</span>
              </div>
              <div class="reviewer-info-sub">
                바른한의원 대전본점 대표원장 · 의학 생리 문헌 교차 검토 · <a href="<?php echo esc_url(self::CANONICAL_ORIGIN . '/director/'); ?>">의료진 약력 및 9대 정밀검진 기준 보기 ↗</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="direct-answer-lead" aria-label="핵심 의학 요약">
        <div class="direct-answer-label">💡 바쁜 일상을 위한 30초 핵심 결론</div>
        <p><?php echo esc_html($direct_answer); ?></p>
        <?php if (!empty($consumer_kws)) : ?>
          <div class="consumer-kw-row" aria-label="자주 찾는 생활 건강 키워드">
            <span class="consumer-kw-label">🔎 자주 찾는 일상 키워드</span>
            <?php foreach ($consumer_kws as $ckw_item) : ?>
              <span class="consumer-kw-chip">#<?php echo esc_html($ckw_item); ?></span>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </section>

      <?php if ($empathy_urls['display'] !== '') : ?>
      <figure class="medical-figure-wrap slot-empathy-figure">
        <img src="<?php echo esc_url($empathy_urls['display']); ?>" alt="<?php echo esc_attr($empathy_alt); ?>" width="1376" height="768" fetchpriority="high" />
        <?php if ($empathy_caption !== '') : ?>
          <figcaption class="medical-figcaption"><span class="slot-badge slot-badge-empathy">일상 공감 01</span><span><?php echo esc_html($empathy_caption); ?></span></figcaption>
        <?php endif; ?>
      </figure>
      <?php endif; ?>

      <section class="content-section">
        <h2>일상 속 이런 모습이 반복되고 있나요?</h2>
        <?php foreach ($empathy_lines as $el) : ?>
          <p><?php echo esc_html((string) $el); ?></p>
        <?php endforeach; ?>
        <?php foreach ($truth_lines as $tl) : ?>
          <p><?php echo esc_html((string) $tl); ?></p>
        <?php endforeach; ?>
        <div class="myth-truth-grid">
          <div class="mt-card mt-myth">
            <span class="mt-tag">❌ 흔히 하기 쉬운 오해</span><br />
            &ldquo;<?php echo esc_html((string) ($myth_lines[0] ?? '')); ?>&rdquo;
          </div>
          <div class="mt-card mt-truth">
            <span class="mt-tag">⭕ 우리 몸이 알려주는 진실</span><br />
            <?php echo esc_html((string) ($myth_lines[1] ?? '')); ?>
          </div>
        </div>
      </section>

      <figure class="medical-figure-wrap slot-mechanism-figure">
        <img src="<?php echo esc_url($webp_hero); ?>" alt="<?php echo esc_attr($deep_alt); ?>" width="1376" height="768" decoding="async" />
        <figcaption class="medical-figcaption"><span class="slot-badge slot-badge-mechanism">원리 도해 02</span><span><?php echo esc_html($deep_caption); ?></span></figcaption>
        <div class="bridge-3d-banner">
          <div class="bridge-3d-text">
            <strong>🧬 방금 읽은 ‘<?php echo esc_html($part_label); ?>’ 구조, 입체로 직접 돌려 보시겠어요?</strong>
            <span>바른한의원 3D 인체모형 뷰어에서 360° 회전하며 근육·신경·혈관 연결을 한눈에 살펴보실 수 있습니다.</span>
          </div>
          <a href="<?php echo esc_url($explorer_part_url); ?>" class="bridge-3d-btn">3D 인체모형 열기 →</a>
        </div>
      </figure>

      <section class="content-section">
        <h2>📖 <?php echo esc_html($deep_title); ?></h2>
        <?php foreach ($deep_paras as $dp) : ?>
          <p><?php echo esc_html((string) $dp); ?></p>
        <?php endforeach; ?>
        <?php if ($clin_obs !== '') : ?>
          <div class="clinical-observation-box">
            <div class="clinical-obs-header">🩺 진료실에서 살펴본 생활 리듬 관찰 포인트</div>
            <p style="margin:0;font-size:0.93rem;color:var(--ink-900);"><?php echo esc_html($clin_obs); ?></p>
          </div>
        <?php endif; ?>
      </section>

      <?php if (is_array($comp_table)) : ?>
      <section class="content-section">
        <h2>📊 <?php echo esc_html((string) ($comp_table['heading'] ?? ($keyword . ' 생활 기준 한눈에 비교하기'))); ?></h2>
        <?php if (!empty($comp_table['intro'])) : ?>
          <p><?php echo esc_html((string) $comp_table['intro']); ?></p>
        <?php endif; ?>
        <div class="table-scroll">
          <table class="comparison-table">
            <thead>
              <tr>
                <?php foreach ($comp_table['headers'] as $th_txt) : ?>
                  <th><?php echo esc_html((string) $th_txt); ?></th>
                <?php endforeach; ?>
              </tr>
            </thead>
            <tbody>
              <?php
              $rec_idx = isset($comp_table['recommendedRowIndex']) ? (int) $comp_table['recommendedRowIndex'] : -1;
              foreach ($comp_table['rows'] as $r_idx => $r_cells) :
                  if (!is_array($r_cells)) continue;
              ?>
                <tr class="<?php echo ($r_idx === $rec_idx) ? 'recommended-row' : ''; ?>">
                  <?php foreach ($r_cells as $c_idx => $c_val) : ?>
                    <td><?php echo ($c_idx === 0) ? ('<strong>' . esc_html((string) $c_val) . '</strong>') : self::format_hn_table_cell_php($c_val); ?></td>
                  <?php endforeach; ?>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </section>
      <?php endif; ?>

      <?php if ($routine_urls['display'] !== '') : ?>
      <figure class="medical-figure-wrap slot-routine-figure">
        <img src="<?php echo esc_url($routine_urls['display']); ?>" alt="<?php echo esc_attr($routine_alt); ?>" width="1376" height="768" loading="lazy" decoding="async" />
        <?php if ($routine_caption !== '') : ?>
          <figcaption class="medical-figcaption"><span class="slot-badge slot-badge-routine">전·후 루틴 03</span><span><?php echo esc_html($routine_caption); ?></span></figcaption>
        <?php endif; ?>
      </figure>
      <?php endif; ?>

      <section class="content-section">
        <h2>✅ 오늘 밤 직접 체크해 보는 5가지 <?php echo esc_html($keyword); ?> 리듬 신호</h2>
        <p>최근 2주 동안의 모습에 해당하는 항목을 직접 눌러 체크해 보세요. 선택 개수에 맞춰 생활 속 우선순위를 정리해 드립니다.</p>
        <div class="check-list-interactive" id="self-check-group">
          <?php foreach ($self_checks as $sc_item) : ?>
            <label class="check-item-label">
              <input type="checkbox" onchange="updateSelfCheck()" />
              <span><?php echo esc_html((string) $sc_item); ?></span>
            </label>
          <?php endforeach; ?>
        </div>
        <div class="score-result-box" id="score-result-card" aria-live="polite">
          <div class="score-result-top">
            <strong id="score-title">현재 선택: 0 / <?php echo count($self_checks); ?>개 해당 — 항목을 눌러 현재 몸의 리듬을 확인해 보세요</strong>
            <span class="score-pill" id="score-badge">자가점검 대기 중</span>
          </div>
          <p class="score-result-desc" id="score-desc">해당 항목을 체크하시면 일상에서 먼저 실천해 볼 수 있는 맞춤 관리 기준을 바로 확인하실 수 있습니다.</p>
        </div>
      </section>

      <section class="content-section">
        <h2>생활 습관 조절과 함께 세심히 살펴야 할 기준은 무엇일까요?</h2>
        <?php if (!empty($deep_signals)) : ?>
          <p>평소 가정에서는 <strong><?php echo esc_html((string) ($deep_signals[0] ?? '')); ?></strong><?php if (!empty($deep_signals[1])) : ?> 또한 <strong><?php echo esc_html((string) $deep_signals[1]); ?></strong><?php endif; ?><?php if (!empty($deep_signals[2])) : ?> 아울러 <strong><?php echo esc_html((string) $deep_signals[2]); ?></strong><?php endif; ?></p>
        <?php endif; ?>
        <?php if (!empty($red_flags)) : ?>
          <div class="redflag-box">
            <strong style="font-size:0.9rem;color:#0F172A;">⚠️ 세심한 대면 확인을 권해 드리는 경우</strong>
            <ul>
              <?php foreach ($red_flags as $rf) : ?>
                <li><?php echo esc_html((string) $rf); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>
        <div class="references-box">
          <strong style="color:var(--ink-700);">📚 학술 참고 근거</strong> · <?php echo esc_html($deep_ref); ?>
        </div>
        <div class="references-box" style="margin-top:10px;background:#FAF8F3;border-color:rgba(74,53,37,0.14);font-size:0.84rem;color:#4B5563;line-height:1.65;">
          <strong style="color:var(--ink-700);">📋 의학 감수 · AI 문헌 정리 보조 및 진료 안내</strong> · 본 건강 글은 학술 논문 요약 보조 도구를 활용해 생활 언어로 초안을 정리한 뒤, 바른한의원 대전본점 안정위 대표원장(한의사)이 직접 의학적 사실관계와 생활 수칙을 교차 검토·감수하여 발행했습니다. 본문 내용은 일상 건강 이해를 돕기 위한 일반 의학 정보이며, 개인별 정확한 진단과 치료 계획은 반드시 의료진의 대면 진찰을 통해 결정하시기 바랍니다.
        </div>

        <h3>함께 읽으면 연결되는 <?php echo esc_html($part_label); ?> 인기 가이드 (BEST 2)</h3>
        <div class="cluster-grid">
          <?php foreach ($best2 as $bidx => $bn) :
              $bn_id_low = strtolower((string) ($bn['id'] ?? ''));
              $bn_url = self::CANONICAL_ORIGIN . '/health-note-' . rawurlencode((string) $bn['id']) . '/';
              $bn_views = isset($bn['_views']) ? (int) $bn['_views'] : (isset($norm_views[$bn_id_low]) ? (int) $norm_views[$bn_id_low] : 0);
          ?>
            <a href="<?php echo esc_url($bn_url); ?>" class="cluster-card">
              <div class="cluster-kicker">이어서 읽기 BEST 0<?php echo ($bidx + 1); ?> · <?php echo esc_html((string) ($bn['keyword'] ?? $part_label)); ?> · <span data-note-view-id="<?php echo esc_attr($bn_id_low); ?>">조회수 <?php echo number_format($bn_views); ?>회</span></div>
              <div class="cluster-title">&ldquo;<?php echo esc_html((string) ($bn['questionTitle'] ?? $bn['title'] ?? '')); ?>&rdquo;</div>
            </a>
          <?php endforeach; ?>
          <a href="<?php echo esc_url($hub['url']); ?>" class="cluster-card">
            <div class="cluster-kicker">전문 진료 원리 안내</div>
            <div class="cluster-title"><?php echo esc_html($hub['name']); ?> — 원인별 치료·회복 원리 자세히 살펴보기 →</div>
          </a>
          <a href="<?php echo esc_url(self::CANONICAL_ORIGIN . '/director/'); ?>" class="cluster-card">
            <div class="cluster-kicker">정밀 검진 시스템 안내</div>
            <div class="cluster-title">초음파 · 적외선 체열 · 자율신경 · 체성분 등 9대 정밀검진 과정 살펴보기 →</div>
          </a>
        </div>

        <div class="official-channels-bar">
          <div class="channel-bar-copy">
            <strong>더 많은 생활 건강 이야기 · 진료 시간 및 위치 안내</strong>
            <span>바른한의원 대전본점 (대전 대덕구 비래동로7번길 1, 2층 · 대표전화 010-5631-1275)</span>
          </div>
          <div class="channel-pills">
            <button type="button" onclick="copyStandaloneShareLink(this)" class="ch-pill ch-pill-share" aria-label="이 건강 글 링크 복사·퍼가기"><span class="ch-icon" style="background:linear-gradient(135deg,#E7C983,#C59E50);color:#14110F;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span><span data-share-label="1">링크 퍼가기</span></button>
            <a href="<?php echo esc_url($yt_url); ?>" target="_blank" rel="noopener noreferrer" class="ch-pill"><span class="ch-icon" style="background:#FF0000;color:#FFF;"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span>유튜브</span></a>
            <a href="<?php echo esc_url($nv_url); ?>" target="_blank" rel="noopener noreferrer" class="ch-pill"><span class="ch-icon" style="background:#03C75A;color:#FFF;font-family:Arial,sans-serif;font-weight:900;font-size:0.78rem;">N</span><span>네이버플레이스</span></a>
            <a href="<?php echo esc_url($th_url); ?>" target="_blank" rel="noopener noreferrer" class="ch-pill"><span class="ch-icon" style="background:#000000;color:#FFF;font-weight:900;font-size:0.8rem;">@</span><span>스레드</span></a>
            <a href="<?php echo esc_url($ig_url); ?>" target="_blank" rel="noopener noreferrer" class="ch-pill"><span class="ch-icon" style="background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%);color:#FFF;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></span><span>인스타그램</span></a>
            <a href="<?php echo esc_url($kk_url); ?>" target="_blank" rel="noopener noreferrer" class="ch-pill"><span class="ch-icon" style="background:#FEE500;color:#191919;"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C6.48 4 2 7.52 2 11.86c0 2.83 1.89 5.31 4.74 6.7-.15.54-.96 3.47-1 3.63-.05.21.08.21.17.15.07-.05 2.89-1.95 4.05-2.75.66.1 1.34.15 2.04.15 5.52 0 10-3.52 10-7.88C22 7.52 17.52 4 12 4z"/></svg></span><span>카카오톡</span></a>
            <a href="<?php echo esc_url(self::CANONICAL_ORIGIN . '/location/'); ?>" class="ch-pill"><span class="ch-icon" style="background:#2D5A43;color:#FFF;font-size:0.74rem;">📍</span><span>오시는길 · 비급여 안내</span></a>
          </div>
        </div>
      </section>
    </article>
  </main>
  <style>
    #hn-mobile-3btn-bar { display: none; }
    @media (max-width: 900px) {
      body { padding-bottom: 72px !important; }
      #hn-mobile-3btn-bar {
        position: fixed; left: 0; right: 0; bottom: 0; z-index: 9999;
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
        padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
        background: rgba(23, 22, 20, 0.96); border-top: 1px solid rgba(197, 160, 89, 0.38);
      }
      #hn-mobile-3btn-bar a {
        display: inline-flex; align-items: center; justify-content: center; gap: 5px;
        height: 42px; border-radius: 11px; font-size: 12.5px; font-weight: 900; text-decoration: none;
      }
    }
  </style>
  <nav id="hn-mobile-3btn-bar" aria-label="모바일 빠른 예약 바">
    <a href="tel:01056311275" style="background:#FFFFFF;color:#171614;">📞 전화상담</a>
    <a href="<?php echo esc_url($kk_url); ?>" target="_blank" rel="noopener noreferrer" style="background:#FEE500;color:#191919;">💬 카톡예약</a>
    <a href="<?php echo esc_url($nv_url); ?>" target="_blank" rel="noopener noreferrer" style="background:#03C75A;color:#FFFFFF;">📍 네이버예약</a>
  </nav>
  <div id="standaloneShareToast" role="status" aria-live="polite"></div>
  <script>
    (function() {
      var noteId = <?php echo wp_json_encode($clean_id); ?>;
      var canonicalShareUrl = <?php echo wp_json_encode($canonical_url); ?>;
      var partId = <?php echo wp_json_encode($part_id); ?>;
      var toastTimer = null;

      function applyViewsMap(noteViewsObj, fallbackSingle) {
        var map = {};
        if (noteViewsObj && typeof noteViewsObj === 'object') {
          Object.keys(noteViewsObj).forEach(function(k) {
            map[String(k).toLowerCase()] = Number(noteViewsObj[k]) || 0;
          });
        }
        if (typeof fallbackSingle === 'number') {
          map[noteId] = Math.max(map[noteId] || 0, fallbackSingle);
        }
        document.querySelectorAll('[data-note-view-id]').forEach(function(el) {
          var tid = String(el.getAttribute('data-note-view-id') || '').toLowerCase();
          if (tid && map[tid] != null) {
            el.textContent = '조회수 ' + Number(map[tid]).toLocaleString() + '회';
          }
        });
      }

      window.copyStandaloneShareLink = function(btnEl) {
        var doDone = function() {
          if (btnEl) {
            var lbl = btnEl.querySelector('[data-share-label="1"]');
            var prev = lbl ? lbl.textContent : '';
            btnEl.classList.add('is-copied');
            if (lbl) lbl.textContent = '✓ 복사됨';
            setTimeout(function() {
              btnEl.classList.remove('is-copied');
              if (lbl && prev) lbl.textContent = prev;
            }, 2000);
          }
          var toast = document.getElementById('standaloneShareToast');
          if (toast) {
            toast.textContent = '🔗 건강 글 링크가 복사되었습니다! 카톡·블로그·스레드에 바로 붙여넣기 하세요';
            toast.classList.add('show');
            if (toastTimer) clearTimeout(toastTimer);
            toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2800);
          }
        };
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(canonicalShareUrl).then(doDone).catch(function() {
            fallbackCopy(canonicalShareUrl, doDone);
          });
        } else {
          fallbackCopy(canonicalShareUrl, doDone);
        }
      };

      function fallbackCopy(txt, cb) {
        try {
          var ta = document.createElement('textarea');
          ta.value = txt;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          var ok = document.execCommand('copy');
          document.body.removeChild(ta);
          if (ok) cb();
          else window.prompt('아래 건강 글 링크를 복사해 주세요:', txt);
        } catch (e) {
          window.prompt('아래 건강 글 링크를 복사해 주세요:', txt);
        }
      }

      var ua = (navigator && navigator.userAgent) ? navigator.userAgent : '';
      if (!/bot|crawl|spider|slurp|yeti|daumoa|lighthouse|pagespeed/i.test(ua)) {
        var sKey = 'bareun_viewed_hn_' + noteId;
        var alreadyViewed = false;
        try { alreadyViewed = sessionStorage.getItem(sKey) === '1'; } catch (e) {}

        // Detect AI / Search Attribution & log human visit to Master Analytics (/wp-json/bareun/v1/visits)
        var rawRef = document.referrer || '';
        var lSearch = window.location.search || '';
        var lowMix = (rawRef + ' ' + lSearch).toLowerCase();
        var aiHint = '';
        if (lowMix.indexOf('chatgpt.com') !== -1 || lowMix.indexOf('chat.openai.com') !== -1 || lowMix.indexOf('searchgpt') !== -1 || lowMix.indexOf('utm_source=chatgpt') !== -1) aiHint = 'chatgpt.com';
        else if (lowMix.indexOf('perplexity.ai') !== -1 || lowMix.indexOf('utm_source=perplexity') !== -1) aiHint = 'perplexity.ai';
        else if (lowMix.indexOf('gemini.google.com') !== -1 || lowMix.indexOf('bard.google.com') !== -1 || lowMix.indexOf('utm_source=gemini') !== -1) aiHint = 'gemini.google.com';
        else if (lowMix.indexOf('claude.ai') !== -1 || lowMix.indexOf('utm_source=claude') !== -1) aiHint = 'claude.ai';
        else if (lowMix.indexOf('copilot.microsoft.com') !== -1 || lowMix.indexOf('edgeservices.bing.com') !== -1) aiHint = 'copilot.microsoft.com';
        else if (lowMix.indexOf('cue.search.naver.com') !== -1 || lowMix.indexOf('clova-x.naver.com') !== -1) aiHint = 'cue.search.naver.com';
        else if (lowMix.indexOf('wrtn.ai') !== -1) aiHint = 'wrtn.ai';
        else if (lowMix.indexOf('getliner.com') !== -1 || lowMix.indexOf('liner.ai') !== -1) aiHint = 'getliner.com';
        else if (lowMix.indexOf('grok.com') !== -1 || lowMix.indexOf('x.ai') !== -1) aiHint = 'grok.com';

        var devType = /ipad|tablet/i.test(ua) ? 'tablet' : (/mobi|android|iphone/i.test(ua) ? 'mobile' : 'desktop');
        var vUid = '';
        try {
          vUid = localStorage.getItem('bareun_visitor_uid_v2') || '';
          if (!vUid) {
            vUid = 'bv_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36);
            localStorage.setItem('bareun_visitor_uid_v2', vUid);
          }
        } catch (e) {}

        if (!alreadyViewed) {
          try { sessionStorage.setItem(sKey, '1'); } catch (e) {}
          fetch('/wp-json/bareun/v1/body-notes/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ noteId: noteId })
          }).then(function(r) { return r.ok ? r.json() : null; }).then(function(d) {
            if (d && d.ok) applyViewsMap(d.noteViews, d.views);
          }).catch(function() {});

          fetch('/wp-json/bareun/v1/visits?_t=' + Date.now(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pageSlug: 'health-note-' + noteId,
              pageTitle: document.title || ('오늘의 건강 글 · ' + noteId),
              visitorId: vUid,
              deviceType: devType,
              referrer: rawRef,
              landingSearch: lSearch,
              aiHint: aiHint
            }),
            keepalive: true
          }).catch(function() {});
        } else {
          fetch('/wp-json/bareun/v1/body-notes?part=' + encodeURIComponent(partId), { cache: 'no-store' })
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(d) {
              if (d && d.ok && d.noteViews) applyViewsMap(d.noteViews);
            }).catch(function() {});
        }

        // Bind conversion click telemetry (tel / kakao / naver booking) on health note
        document.addEventListener('click', function(ev) {
          var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
          if (!a) return;
          var href = String(a.getAttribute('href') || '');
          var act = '';
          if (href.indexOf('tel:') === 0) act = 'tel_click';
          else if (href.indexOf('pf.kakao.com') !== -1) act = 'kakao_click';
          else if (href.indexOf('naver.me') !== -1 || href.indexOf('booking.naver.com') !== -1) act = 'naver_booking_click';
          if (!act) return;
          var evtPayload = JSON.stringify({
            action: act,
            pageSlug: 'health-note-' + noteId,
            deviceType: devType,
            referrer: rawRef,
            landingSearch: lSearch,
            aiHint: aiHint
          });
          try {
            if (navigator.sendBeacon) {
              navigator.sendBeacon('/wp-json/bareun/v1/visits/event?_t=' + Date.now(), new Blob([evtPayload], { type: 'application/json' }));
            } else {
              fetch('/wp-json/bareun/v1/visits/event?_t=' + Date.now(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: evtPayload, keepalive: true }).catch(function() {});
            }
            if (typeof window.gtag === 'function') {
              window.gtag('event', 'clinic_conversion_click', { conversion_action: act, page_slug: 'health-note-' + noteId, ai_engine: aiHint || 'none' });
            }
          } catch (e) {}
        }, true);
      }
    })();
    function updateSelfCheck() {
      var boxes = document.querySelectorAll('#self-check-group input[type="checkbox"]');
      var total = boxes.length || 5;
      var count = 0;
      boxes.forEach(function(cb) {
        var label = cb.closest('.check-item-label');
        if (cb.checked) { count++; if (label) label.classList.add('checked'); }
        else { if (label) label.classList.remove('checked'); }
      });
      var titleEl = document.getElementById('score-title');
      var badgeEl = document.getElementById('score-badge');
      var descEl = document.getElementById('score-desc');
      if (count === 0) {
        titleEl.textContent = '현재 선택: 0 / ' + total + '개 해당 — 비교적 안정적인 생활 리듬이 유지되고 있습니다';
        badgeEl.textContent = '양호 · 현재 습관 유지';
        descEl.textContent = '오늘 살펴본 비교표의 권장 루틴을 가볍게 이어 가시면서 충분한 수분 섭취와 숙면 시간을 지켜 주세요.';
      } else if (count <= 2) {
        titleEl.textContent = '현재 선택: ' + count + ' / ' + total + '개 해당 — 일상 속 작은 피로 신호가 시작되는 구간';
        badgeEl.textContent = '생활 리듬 2주 조정 권장';
        descEl.textContent = '위 비교표의 권장 실천법을 2주간 먼저 적용해 보세요. 자세·식사·수면 타이밍 한 가지만 바꾸어도 몸의 긴장이 한결 부드러워집니다.';
      } else {
        titleEl.textContent = '현재 선택: ' + count + ' / ' + total + '개 해당 — 누적된 생활 불균형 점검이 필요한 구간';
        badgeEl.textContent = '생활 교정 + 세심한 상태 확인 권장';
        descEl.textContent = '여러 생활 신호가 동시에 겹쳐 회복 탄력이 떨어져 있을 가능성이 큽니다. 생활 루틴 조정과 함께 불편감이 2~4주 이상 이어진다면 가까운 의료기관에서 정확한 상태를 확인해 보시길 권합니다.';
      }
    }
  </script>
</body>
</html>
        <?php
        return true;
    }

    public static function setup_head_cleanup() {
        remove_action('wp_head', 'rel_canonical');
        remove_action('wp_head', 'wp_shortlink_wp_head', 10);
        remove_action('wp_head', 'wp_robots', 1);
    }

    public static function send_security_headers() {
        if (headers_sent()) {
            return;
        }
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains', true);
        header("Content-Security-Policy: frame-ancestors 'self'; upgrade-insecure-requests", true);
        header('X-Content-Type-Options: nosniff', true);
        header('X-Frame-Options: SAMEORIGIN', true);
        header('Referrer-Policy: strict-origin-when-cross-origin', true);
    }

    public static function filter_wp_headers($headers) {
        if (!is_array($headers)) {
            $headers = array();
        }
        $headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
        $headers['Content-Security-Policy']   = "frame-ancestors 'self'; upgrade-insecure-requests";
        $headers['X-Content-Type-Options']    = 'nosniff';
        $headers['X-Frame-Options']           = 'SAMEORIGIN';
        $headers['Referrer-Policy']           = 'strict-origin-when-cross-origin';
        return $headers;
    }

    public static function filter_wp_robots($robots) {
        if (!is_array($robots)) {
            $robots = array();
        }
        if (is_404() || is_search()) {
            $robots['noindex'] = true;
            $robots['follow']  = true;
            return $robots;
        }
        unset($robots['noindex'], $robots['nofollow']);
        $robots['index']             = true;
        $robots['follow']            = true;
        $robots['max-snippet']       = -1;
        $robots['max-image-preview'] = 'large';
        $robots['max-video-preview'] = -1;
        return $robots;
    }

    private static function resolve_seo_for_post($post) {
        $master = self::get_master_cfg();
        $pages  = isset($master['pages']) && is_array($master['pages']) ? $master['pages'] : array();
        $og_opt = (string) get_option(self::OPT_OG_IMAGE_URL, '');
        $default_og = $og_opt !== '' ? $og_opt : (isset($master['defaultOgImage']) ? $master['defaultOgImage'] : '');

        if ($post && !empty($post->post_name)) {
            $slug = (string) $post->post_name;
            if ($slug === 'gongjindan-2') {
                $slug = 'gongjindan';
            } elseif ($slug === '46-2' || (int) $post->ID === (int) get_option('page_on_front')) {
                $slug = 'home';
            }
            if (isset($pages[$slug])) {
                $cfg = $pages[$slug];
                $cfg['ogImg'] = $default_og;
                return $cfg;
            }
            $rel_path = '/' . trim((string) wp_make_link_relative(get_permalink($post)), '/') . '/';
            $clean_post_title = trim(wp_strip_all_tags(get_the_title($post)));
            $raw_title = (strpos($clean_post_title, '바른한의원') !== false)
                ? $clean_post_title
                : ($clean_post_title . ' | 바른한의원 대전본점');
            if (mb_strlen($raw_title, 'UTF-8') > 78) {
                $raw_title = $clean_post_title . ' | 바른한의원';
                if (mb_strlen($raw_title, 'UTF-8') > 82) {
                    $base_q = preg_replace('/\s*\[[^\]]*\]\s*$/u', '', $clean_post_title);
                    $raw_title = trim((string) $base_q) . ' | 바른한의원 대전본점';
                    if (mb_strlen($raw_title, 'UTF-8') > 82) {
                        $raw_title = mb_substr($raw_title, 0, 81, 'UTF-8') . '…';
                    }
                }
            }
            $raw_desc = trim(wp_strip_all_tags(has_excerpt($post) ? get_the_excerpt($post) : wp_trim_words($post->post_content, 42, '')));
            if ($raw_desc === '') {
                $raw_desc = '대전 대덕구 비래동로7번길 1, 2층 바른한의원 대전본점(010-5631-1275) 안정위 대표원장 맞춤 진료 및 건강 정보 안내입니다.';
            }
            if (mb_strlen($raw_desc, 'UTF-8') > 155) {
                $raw_desc = mb_substr($raw_desc, 0, 154, 'UTF-8') . '…';
            }

            $post_og = $default_og;
            $post_og_w = 1200;
            $post_og_h = 630;
            $thumb_id = (int) get_post_thumbnail_id($post);
            if ($thumb_id > 0) {
                $img_src = wp_get_attachment_image_src($thumb_id, 'full');
                if (is_array($img_src) && !empty($img_src[0])) {
                    $norm_thumb = preg_replace('#^https?://(www\.)?bareunhaniwon\.com#i', self::CANONICAL_ORIGIN, (string) $img_src[0]);
                    // If the post is a health-note-* post and has a dedicated illustration (or any non-default thumbnail), prefer its thumbnail
                    if (strpos($slug, 'health-note-') === 0 || $norm_thumb !== '') {
                        $post_og = $norm_thumb;
                        if (!empty($img_src[1]) && !empty($img_src[2])) {
                            $post_og_w = (int) $img_src[1];
                            $post_og_h = (int) $img_src[2];
                        }
                    }
                }
            }

            $has_inline_schema = ($post->post_type === 'post' && strpos((string) $post->post_content, 'application/ld+json') !== false);

            return array(
                'path'            => $rel_path,
                'title'           => $raw_title,
                'description'     => $raw_desc,
                'preloadImg'      => (strpos($slug, 'health-note-') === 0) ? $post_og : '',
                'breadcrumbName'  => $clean_post_title,
                'isArticle'       => ($post->post_type === 'post'),
                'hasInlineSchema' => $has_inline_schema,
                'datePublished'   => get_the_date('Y-m-d', $post),
                'dateModified'    => get_the_modified_date('Y-m-d', $post),
                'ogImg'           => $post_og,
                'ogImgW'          => $post_og_w,
                'ogImgH'          => $post_og_h
            );
        }

        $fallback = isset($pages['home']) ? $pages['home'] : array();
        $fallback['ogImg'] = $default_og;
        return $fallback;
    }

    private static function resolve_current_page_seo() {
        $master = self::get_master_cfg();
        $pages  = isset($master['pages']) && is_array($master['pages']) ? $master['pages'] : array();
        $og_opt = (string) get_option(self::OPT_OG_IMAGE_URL, '');
        $default_og = $og_opt !== '' ? $og_opt : (isset($master['defaultOgImage']) ? $master['defaultOgImage'] : '');

        if (is_front_page() || is_home()) {
            $cfg = isset($pages['home']) ? $pages['home'] : array();
            $cfg['ogImg'] = $default_og;
            return $cfg;
        }

        if (is_singular()) {
            $post = get_queried_object();
            if ($post) {
                $base_cfg = self::resolve_seo_for_post($post);
                // Dynamic SEO / AEO / Canonical for individual Health Notes (?part=...&note=...) and Public Q&A (?tab=qna&qnaId=...) on /body-explorer/
                if ($post->post_name === 'body-explorer' || $post->post_name === 'ask-doctor') {
                    if (!empty($_GET['note'])) {
                        $req_note_id = strtolower(preg_replace('/[^a-zA-Z0-9\-_]/', '', (string) $_GET['note']));
                        $req_part_id = !empty($_GET['part'])
                            ? strtolower(preg_replace('/[^a-zA-Z0-9\-_]/', '', (string) $_GET['part']))
                            : explode('-', $req_note_id)[0];
                        $found_title = '';
                        $found_desc  = '';
                        $found_date  = '2026-10-28';

                        // 0) Check Live Custom Studio Health Notes Config (bareun_health_notes_cfg_v1) first
                        $found_og = $default_og;
                        $studio_hn_cfg = get_option('bareun_health_notes_cfg_v1', array());
                        if (is_array($studio_hn_cfg) && !empty($studio_hn_cfg['notes']) && is_array($studio_hn_cfg['notes'])) {
                            foreach ($studio_hn_cfg['notes'] as $csn) {
                                if (!is_array($csn)) continue;
                                if (strtolower((string) ($csn['id'] ?? '')) === $req_note_id) {
                                    $pl = trim((string) ($csn['partLabel'] ?? '건강백과'));
                                    $kw = trim((string) ($csn['keyword'] ?? $pl));
                                    $qt = trim((string) ($csn['questionTitle'] ?? $csn['title'] ?? ''));
                                    $seo_t = trim((string) ($csn['seoTitle'] ?? ''));
                                    if ($seo_t !== '') {
                                        $found_title = $seo_t;
                                    } elseif ($qt !== '') {
                                        $found_title = $qt . ' [' . $pl . ' · ' . $kw . ']';
                                    }
                                    $dir_ans = trim((string) ($csn['directAnswer'] ?? ''));
                                    if ($dir_ans !== '') {
                                        $found_desc = $dir_ans;
                                    } else {
                                        $tru = isset($csn['truthLines']) && is_array($csn['truthLines']) ? implode(' ', $csn['truthLines']) : '';
                                        $dp0 = isset($csn['deepParagraphs'][0]) ? (string) $csn['deepParagraphs'][0] : '';
                                        $found_desc = trim($tru . ' ' . $dp0);
                                    }
                                    if (!empty($csn['publishDate'])) {
                                        $found_date = (string) $csn['publishDate'];
                                    }
                                    if (!empty($csn['partId'])) {
                                        $req_part_id = (string) $csn['partId'];
                                    }
                                    if (!empty($csn['deepIllustImg'])) {
                                        $raw_ill = trim((string) $csn['deepIllustImg']);
                                        if (preg_match('#^https?://#i', $raw_ill)) {
                                            $found_og = $raw_ill;
                                        } elseif (strpos($raw_ill, '/wp-content/') === 0) {
                                            $found_og = self::CANONICAL_ORIGIN . $raw_ill;
                                        } else {
                                            $clean_ill = ltrim($raw_ill, './');
                                            if (stripos($clean_ill, 'webp/') === 0) {
                                                $found_og = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/' . $clean_ill;
                                            } else {
                                                $webp_ill = preg_replace('/\.(png|jpe?g)$/i', '.webp', $clean_ill);
                                                $found_og = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/webp/' . $webp_ill;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        }

                        // 1) Check published WordPress post health-note-{id}
                        if ($found_title === '') {
                            $hn_post = get_page_by_path('health-note-' . $req_note_id, OBJECT, 'post');
                            if ($hn_post && $hn_post->post_status === 'publish') {
                                $found_title = trim(wp_strip_all_tags(get_the_title($hn_post)));
                                $found_desc  = trim(wp_strip_all_tags(has_excerpt($hn_post) ? get_the_excerpt($hn_post) : wp_trim_words($hn_post->post_content, 40, '')));
                                $found_date  = get_the_date('Y-m-d', $hn_post);
                                $hn_thumb_url = get_the_post_thumbnail_url($hn_post, 'full');
                                if (!empty($hn_thumb_url)) {
                                    $found_og = preg_replace('#^https?://(www\.)?bareunhaniwon\.com#i', self::CANONICAL_ORIGIN, (string) $hn_thumb_url);
                                }
                            }
                        }

                        // 2) Fallback to OPT_BODY_NOTES option
                        if ($found_title === '') {
                            $stored_notes = get_option('bareun_body_3d_notes_v1', array());
                            if (is_array($stored_notes)) {
                                foreach ($stored_notes as $sn) {
                                    if (!is_array($sn)) continue;
                                    if (strtolower((string) ($sn['id'] ?? '')) === $req_note_id) {
                                        $pl = trim((string) ($sn['partLabel'] ?? '건강백과'));
                                        $kw = trim((string) ($sn['keyword'] ?? $pl));
                                        $qt = trim((string) ($sn['title'] ?? $sn['questionTitle'] ?? ''));
                                        if ($qt !== '') {
                                            $found_title = $qt . ' [' . $pl . ' · ' . $kw . ' 건강백과]';
                                        }
                                        $tru = isset($sn['truth']) && is_array($sn['truth']) ? implode(' ', $sn['truth']) : (isset($sn['truthLines']) && is_array($sn['truthLines']) ? implode(' ', $sn['truthLines']) : '');
                                        $myt = isset($sn['myth'][1]) ? (string) $sn['myth'][1] : (isset($sn['mythLines'][1]) ? (string) $sn['mythLines'][1] : '');
                                        $found_desc = trim($tru . ' ' . $myt);
                                        if (!empty($sn['publishDate'])) {
                                            $found_date = (string) $sn['publishDate'];
                                        }
                                        if (!empty($sn['partId'])) {
                                            $req_part_id = (string) $sn['partId'];
                                        }
                                        break;
                                    }
                                }
                            }
                        }

                        // 3) Extract from body-explorer post_content SSR articles if still empty
                        if ($found_title === '' && !empty($post->post_content)) {
                            $quoted_id = preg_quote($req_note_id, '#');
                            if (preg_match('#note=' . $quoted_id . '["\'][^>]*>([^<]+)</a></h3>\s*(?:<a[^>]*>[^<]*</a>\s*</h3>\s*)?<p class="aeo-direct-answer">([\s\S]*?)</p>#i', $post->post_content, $m_ssr)) {
                                $found_title = trim(wp_strip_all_tags(html_entity_decode($m_ssr[1], ENT_QUOTES, 'UTF-8')));
                                $found_desc  = trim(wp_strip_all_tags(html_entity_decode($m_ssr[2], ENT_QUOTES, 'UTF-8')));
                            }
                        }

                        if ($found_title !== '') {
                            if (strpos($found_title, '바른한의원') === false) {
                                $found_title .= ' | 바른한의원 대전본점';
                            }
                            if ($found_desc === '') {
                                $found_desc = $base_cfg['description'];
                            }
                            if (mb_strlen($found_desc, 'UTF-8') > 155) {
                                $found_desc = mb_substr($found_desc, 0, 154, 'UTF-8') . '…';
                            }
                            return array(
                                'path'           => '/health-note-' . rawurlencode($req_note_id) . '/',
                                'title'          => $found_title,
                                'description'    => $found_desc,
                                'preloadImg'     => '',
                                'breadcrumbName' => $found_title,
                                'isArticle'      => true,
                                'datePublished'  => $found_date,
                                'dateModified'   => $found_date,
                                'ogImg'          => $found_og
                            );
                        }
                    } elseif (!empty($_GET['qnaId'])) {
                        $req_qna_id = (int) $_GET['qnaId'];
                        if ($req_qna_id > 0) {
                            global $wpdb;
                            $qna_table = $wpdb->prefix . 'bareun_private_qna';
                            $qrow = $wpdb->get_row($wpdb->prepare(
                                "SELECT id, title, content, master_reply, created_at FROM {$qna_table} WHERE id = %d AND is_secret = 0 LIMIT 1",
                                $req_qna_id
                            ), ARRAY_A);
                            if (is_array($qrow) && !empty($qrow['title'])) {
                                $qt = trim(wp_strip_all_tags((string) $qrow['title']));
                                $qr = trim(wp_strip_all_tags((string) ($qrow['master_reply'] ?: $qrow['content'])));
                                if (mb_strlen($qr, 'UTF-8') > 155) {
                                    $qr = mb_substr($qr, 0, 154, 'UTF-8') . '…';
                                }
                                return array(
                                    'path'           => '/body-explorer/?tab=qna&qnaId=' . $req_qna_id,
                                    'title'          => $qt . ' | 바른한의원 대전본점 1:1 건강 Q&A',
                                    'description'    => $qr !== '' ? $qr : $base_cfg['description'],
                                    'preloadImg'     => '',
                                    'breadcrumbName' => $qt,
                                    'isArticle'      => true,
                                    'datePublished'  => substr((string) ($qrow['created_at'] ?? '2026-10-28'), 0, 10),
                                    'dateModified'   => substr((string) ($qrow['created_at'] ?? '2026-10-28'), 0, 10),
                                    'ogImg'          => $default_og
                                );
                            }
                        }
                    }
                }
                return $base_cfg;
            }
        }

        $fallback = isset($pages['home']) ? $pages['home'] : array();
        $fallback['ogImg'] = $default_og;
        return $fallback;
    }

    public static function filter_document_title($title) {
        if (is_admin()) {
            return $title;
        }
        $cfg = self::resolve_current_page_seo();
        if (!empty($cfg['title'])) {
            return $cfg['title'];
        }
        return $title;
    }

    private static function build_json_ld($cfg) {
        $master = self::get_master_cfg();
        $path = !empty($cfg['path']) ? $cfg['path'] : '/';
        $canonical_url = self::CANONICAL_ORIGIN . $path;
        $og_img = !empty($cfg['ogImg']) ? $cfg['ogImg'] : $master['defaultOgImage'];

        $org = $master['clinicBaseOrg'];
        $org['image'] = !empty($master['defaultOgImage']) ? $master['defaultOgImage'] : $og_img;
        $ws = $master['websiteNode'];

        // If a singular post (such as /health-note-* or clinical encyclopedia) already embeds its own authoritative MedicalWebPage + MedicalScholarlyArticle + FAQPage + HowTo JSON-LD in post_content,
        // emit ONLY the site-level foundation graph (MedicalClinic + WebSite + 3-level BreadcrumbList) in <head> to prevent duplicate FAQPage / @id collisions!
        if (!empty($cfg['hasInlineSchema']) || strpos($path, '/health-note-') === 0) {
            $bc_items = array(
                array(
                    '@type'    => 'ListItem',
                    'position' => 1,
                    'name'     => '바른한의원 대전본점',
                    'item'     => self::CANONICAL_ORIGIN . '/'
                ),
                array(
                    '@type'    => 'ListItem',
                    'position' => 2,
                    'name'     => '3D 인체모형 · 오늘의 건강 글',
                    'item'     => self::CANONICAL_ORIGIN . '/body-explorer/'
                ),
                array(
                    '@type'    => 'ListItem',
                    'position' => 3,
                    'name'     => !empty($cfg['breadcrumbName']) ? $cfg['breadcrumbName'] : $cfg['title'],
                    'item'     => $canonical_url
                )
            );
            return array(
                '@context' => 'https://schema.org',
                '@graph'   => array(
                    $org,
                    $ws,
                    array(
                        '@type'           => 'BreadcrumbList',
                        '@id'             => $canonical_url . '#breadcrumb',
                        'itemListElement' => $bc_items
                    )
                )
            );
        }

        $web_page = array(
            '@type'       => 'MedicalWebPage',
            '@id'         => $canonical_url . '#webpage',
            'url'         => $canonical_url,
            'name'        => $cfg['title'],
            'description' => $cfg['description'],
            'image'       => array($og_img),
            'inLanguage'  => 'ko-KR',
            'isPartOf'    => array('@id' => self::CANONICAL_ORIGIN . '/#website'),
            'about'       => array('@id' => self::CANONICAL_ORIGIN . '/#clinic'),
            'reviewedBy'  => array(
                '@type'    => 'Person',
                '@id'      => self::CANONICAL_ORIGIN . '/director/#physician',
                'name'     => '안정위',
                'jobTitle' => '바른한의원 대전본점 대표원장 (한의사)'
            ),
            'lastReviewed' => '2026-11-13'
        );
        if ($path === '/body-explorer/') {
            $web_page['speakable'] = array(
                '@type'       => 'SpeakableSpecification',
                'cssSelector' => array('.aeo-direct-answer', '.seo-health-note-ssr-item', '.seo-qna-ssr-item')
            );
        }

        $graph = array($org, $ws, $web_page);

        if ($path !== '/') {
            $graph[] = array(
                '@type' => 'BreadcrumbList',
                '@id'   => $canonical_url . '#breadcrumb',
                'itemListElement' => array(
                    array(
                        '@type'    => 'ListItem',
                        'position' => 1,
                        'name'     => '바른한의원 대전본점',
                        'item'     => self::CANONICAL_ORIGIN . '/'
                    ),
                    array(
                        '@type'    => 'ListItem',
                        'position' => 2,
                        'name'     => !empty($cfg['breadcrumbName']) ? $cfg['breadcrumbName'] : $cfg['title'],
                        'item'     => $canonical_url
                    )
                )
            );
        }

        if (!empty($cfg['isProfile'])) {
            $graph[] = array(
                '@type' => 'ProfilePage',
                '@id'   => $canonical_url . '#profile',
                'url'   => $canonical_url,
                'name'  => $cfg['title'],
                'mainEntity' => array(
                    '@type'    => 'Person',
                    '@id'      => self::CANONICAL_ORIGIN . '/director/#physician',
                    'name'     => '안정위',
                    'jobTitle' => '바른한의원 대전본점 대표원장 (한의사)',
                    'worksFor' => array('@id' => self::CANONICAL_ORIGIN . '/#clinic')
                )
            );
        }

        if (!empty($cfg['isArticle'])) {
            $graph[] = array(
                '@type'         => 'MedicalScholarlyArticle',
                '@id'           => $canonical_url . '#article',
                'headline'      => $cfg['title'],
                'description'   => $cfg['description'],
                'image'         => array($og_img),
                'datePublished' => !empty($cfg['datePublished']) ? $cfg['datePublished'] : '2026-10-26',
                'dateModified'  => !empty($cfg['dateModified']) ? $cfg['dateModified'] : '2026-10-28',
                'inLanguage'    => 'ko-KR',
                'author'        => array(
                    '@type' => 'Person',
                    '@id'   => self::CANONICAL_ORIGIN . '/director/#physician',
                    'name'  => '안정위',
                    'url'   => self::CANONICAL_ORIGIN . '/director/'
                ),
                'publisher'     => array('@id' => self::CANONICAL_ORIGIN . '/#clinic')
            );
        }

        return array(
            '@context' => 'https://schema.org',
            '@graph'   => $graph
        );
    }

    public static function render_head_seo() {
        if (is_admin()) {
            return;
        }
        $cfg = self::resolve_current_page_seo();
        $path = !empty($cfg['path']) ? $cfg['path'] : '/';
        $canonical_url = self::CANONICAL_ORIGIN . $path;
        $title = !empty($cfg['title']) ? $cfg['title'] : '바른한의원 대전본점';
        $desc  = !empty($cfg['description']) ? $cfg['description'] : '';
        $og_type = !empty($cfg['isArticle']) ? 'article' : 'website';
        $og_img  = !empty($cfg['ogImg']) ? $cfg['ogImg'] : '';
        $preload = !empty($cfg['preloadImg']) ? $cfg['preloadImg'] : '';

        $verify = get_option(self::OPT_VERIFY_CODES, array());
        $naver_code  = (is_array($verify) && !empty($verify['naver'])) ? trim((string) $verify['naver']) : self::DEFAULT_NAVER_VERIFY;
        $google_code = (is_array($verify) && !empty($verify['google'])) ? trim((string) $verify['google']) : self::DEFAULT_GOOGLE_VERIFY;

        echo "\n<!-- Bareun Master SEO & GEO Engine -->\n";
        if (is_404() || is_search()) {
            echo '<meta name="robots" content="noindex, follow">' . "\n";
        } else {
            echo '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">' . "\n";
        }
        if ($desc !== '') {
            echo '<meta name="description" content="' . esc_attr($desc) . '">' . "\n";
        }
        if ($naver_code !== '') {
            echo '<meta name="naver-site-verification" content="' . esc_attr($naver_code) . '">' . "\n";
        }
        if ($google_code !== '') {
            echo '<meta name="google-site-verification" content="' . esc_attr($google_code) . '">' . "\n";
        }
        echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
        echo '<link rel="alternate" hreflang="ko-KR" href="' . esc_url($canonical_url) . '">' . "\n";
        echo '<link rel="alternate" hreflang="x-default" href="' . esc_url($canonical_url) . '">' . "\n";
        echo '<meta property="og:locale" content="ko_KR">' . "\n";
        echo '<meta property="og:type" content="' . esc_attr($og_type) . '">' . "\n";
        echo '<meta property="og:site_name" content="바른한의원 대전본점">' . "\n";
        echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
        if ($desc !== '') {
            echo '<meta property="og:description" content="' . esc_attr($desc) . '">' . "\n";
        }
        echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
        if ($og_img !== '') {
            $og_w = !empty($cfg['ogImgW']) ? (int) $cfg['ogImgW'] : 1200;
            $og_h = !empty($cfg['ogImgH']) ? (int) $cfg['ogImgH'] : 630;
            echo '<meta property="og:image" content="' . esc_url($og_img) . '">' . "\n";
            echo '<meta property="og:image:width" content="' . esc_attr((string) $og_w) . '">' . "\n";
            echo '<meta property="og:image:height" content="' . esc_attr((string) $og_h) . '">' . "\n";
        }
        echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '">' . "\n";
        if ($desc !== '') {
            echo '<meta name="twitter:description" content="' . esc_attr($desc) . '">' . "\n";
        }
        if ($og_img !== '') {
            echo '<meta name="twitter:image" content="' . esc_url($og_img) . '">' . "\n";
        }
        if ($preload !== '') {
            echo '<link rel="preload" as="image" href="' . esc_url($preload) . '" fetchpriority="high">' . "\n";
        }
        $ld = self::build_json_ld($cfg);
        echo '<script type="application/ld+json">' . wp_json_encode($ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        $raw_req_uri = isset($_SERVER['REQUEST_URI']) ? (string) $_SERVER['REQUEST_URI'] : '';
        if (strpos($path, '/body-explorer/') === 0 || strpos($raw_req_uri, '/body-explorer') === 0) {
            $live_hn_cfg = get_option('bareun_health_notes_cfg_v1', null);
            if (is_array($live_hn_cfg) && !empty($live_hn_cfg['notes'])) {
                echo '<script>window.__BAREUN_LIVE_HEALTH_NOTES_CFG__ = ' . wp_json_encode($live_hn_cfg, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . ';</script>' . "\n";
            }
        }
        echo "<!-- /Bareun Master SEO & GEO Engine -->\n";
    }

    public static function render_footer_qna_ssr() {
        if (is_admin()) {
            return;
        }
        $cfg = self::resolve_current_page_seo();
        $path = !empty($cfg['path']) ? $cfg['path'] : '/';
        if ($path !== '/body-explorer/') {
            return;
        }
        global $wpdb;
        $qna_table = $wpdb->prefix . 'bareun_private_qna';
        $rows = $wpdb->get_results(
            "SELECT id, part_id, title, content, master_reply, created_at FROM {$qna_table} WHERE is_secret = 0 ORDER BY id DESC LIMIT 100",
            ARRAY_A
        );
        if (!is_array($rows) || empty($rows)) {
            return;
        }
        echo "\n" . '<details class="seo-qna-ssr-archive" style="max-width:420px;margin:8px 18px;padding:6px 10px;background:rgba(255,255,255,0.92);border:1px solid #EAE3D5;border-radius:10px;font-size:11px;color:#57534E;">' . "\n";
        echo '  <summary style="cursor:pointer;font-weight:700;color:#141416;">💬 무엇이든 물어보세요 · 공개 1:1 건강 Q&amp;A 아카이브 (' . count($rows) . '건)</summary>' . "\n";
        echo '  <div style="margin-top:8px;max-height:30vh;overflow-y:auto;">' . "\n";
        echo '    <h2 style="font-size:12px;margin:0 0 6px;">무엇이든 물어보세요 · 전 질환 통합 1:1 건강 Q&amp;A</h2>' . "\n";
        foreach ($rows as $qr) {
            $qid = (int)($qr['id'] ?? 0);
            $qtitle = trim((string)($qr['title'] ?? ''));
            $qcontent = trim((string)($qr['content'] ?? ''));
            $qreply = trim((string)($qr['master_reply'] ?? ''));
            if ($qtitle === '') continue;
            $qurl = self::CANONICAL_ORIGIN . '/body-explorer/?tab=qna&qnaId=' . $qid;
            echo '    <article class="seo-qna-ssr-item" style="margin-bottom:8px;">' . "\n";
            echo '      <h3 style="font-size:11.5px;margin:0 0 2px;"><a href="' . esc_url($qurl) . '">' . esc_html($qtitle) . '</a></h3>' . "\n";
            if ($qreply !== '') {
                echo '      <p class="aeo-direct-answer" style="margin:0 0 2px;font-weight:700;color:#0D0D0F;">' . esc_html($qreply) . '</p>' . "\n";
            }
            if ($qcontent !== '') {
                echo '      <p style="margin:0;">' . esc_html($qcontent) . '</p>' . "\n";
            }
            echo '    </article>' . "\n";
        }
        echo '  </div>' . "\n";
        echo '</details>' . "\n";
    }

    public static function filter_body_class($classes) {
        if (!is_array($classes)) {
            $classes = array();
        }
        if (is_singular('page')) {
            $post = get_queried_object();
            if ($post && !empty($post->post_name)) {
                $hanji_slugs = array(
                    'director', 'chuna', 'growth', 'diet-zero',
                    'hairloss', 'hairloss-male', 'hairloss-alopecia',
                    'hairloss-female', 'hairloss-seborrheic',
                    'gongjindan', 'gongjindan-2', 'prostate'
                );
                if (in_array($post->post_name, $hanji_slugs, true) && !in_array('theme-hanji', $classes, true)) {
                    $classes[] = 'theme-hanji';
                }
            }
        }
        return $classes;
    }

    public static function filter_health_note_permalink($permalink, $post) {
        if ($post && isset($post->post_type) && $post->post_type === 'post' && !empty($post->post_name)) {
            if (preg_match('#^health-note-([a-z0-9\-]+)$#i', (string) $post->post_name, $m)) {
                $hn_id = strtolower($m[1]);
                return self::CANONICAL_ORIGIN . '/health-note-' . rawurlencode($hn_id) . '/';
            }
        }
        return $permalink;
    }

    public static function filter_sitemap_providers($provider, $name) {
        if ($name === 'users' || $name === 'taxonomies') {
            return false;
        }
        return $provider;
    }

    public static function filter_sitemap_post_entry($entry, $post, $post_type) {
        if (!is_array($entry)) {
            return $entry;
        }
        if (!empty($entry['loc'])) {
            $entry['loc'] = preg_replace('#^https?://(www\.)?bareunhaniwon\.com#i', self::CANONICAL_ORIGIN, (string) $entry['loc']);
        }

        static $hn_lastmod_map = null;
        if ($hn_lastmod_map === null) {
            $hn_lastmod_map = array();
            $hn_cfg = get_option('bareun_health_notes_cfg_v1', null);
            if (is_array($hn_cfg) && !empty($hn_cfg['notes']) && is_array($hn_cfg['notes'])) {
                foreach ($hn_cfg['notes'] as $hn_row) {
                    if (!is_array($hn_row) || empty($hn_row['id'])) continue;
                    $nid = strtolower(trim((string) $hn_row['id']));
                    $rev_d = !empty($hn_row['lastReviewed'])
                        ? trim((string) $hn_row['lastReviewed'])
                        : (!empty($hn_row['publishDate']) ? trim((string) $hn_row['publishDate']) : '');
                    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $rev_d)) {
                        $hn_lastmod_map[$nid] = $rev_d . 'T10:30:00+09:00';
                    }
                }
            }
        }

        $slug = ($post && !empty($post->post_name)) ? (string) $post->post_name : '';
        if ($slug !== '' && preg_match('#^health-note-([a-z0-9\-]+)$#i', $slug, $hm)) {
            $hn_id = strtolower($hm[1]);
            $entry['loc'] = self::CANONICAL_ORIGIN . '/health-note-' . rawurlencode($hn_id) . '/';
            if (isset($hn_lastmod_map[$hn_id])) {
                $entry['lastmod'] = $hn_lastmod_map[$hn_id];
                return $entry;
            }
        }

        $milestone_dates = array(
            'integrative-autonomic-circadian-gut-spine-health-review' => '2026-10-26T14:30:00+09:00',
            'lifting-compare' => '2026-10-25T18:10:00+09:00',
            'prostate'        => '2026-10-26T11:20:00+09:00',
            'ask-doctor'      => '2026-10-27T09:15:00+09:00',
            'body-explorer'   => '2026-10-28T12:00:00+09:00'
        );
        $mod_day = ($post && !empty($post->post_modified)) ? substr((string) $post->post_modified, 0, 10) : '';
        if ($slug !== '' && isset($milestone_dates[$slug]) && $mod_day <= '2026-10-28') {
            $entry['lastmod'] = $milestone_dates[$slug];
            return $entry;
        }
        if ($post && !empty($post->post_modified_gmt) && $post->post_modified_gmt !== '0000-00-00 00:00:00') {
            $ts = strtotime($post->post_modified_gmt . ' UTC');
            if ($ts) {
                $entry['lastmod'] = wp_date('c', $ts);
            }
        } elseif ($post && !empty($post->post_modified)) {
            $ts = strtotime($post->post_modified);
            if ($ts) {
                $entry['lastmod'] = wp_date('c', $ts);
            }
        }
        if (empty($entry['lastmod'])) {
            $entry['lastmod'] = wp_date('c');
        }
        return $entry;
    }

    public static function filter_rss_feed_query($query) {
        if (!is_admin() && $query->is_main_query() && $query->is_feed()) {
            $query->set('post_type', array('post', 'page'));
            $query->set('posts_per_page', 35);
            $query->set('orderby', 'modified');
            $query->set('order', 'DESC');
            $dup_story = get_page_by_path('story-3d', OBJECT, 'page');
            if ($dup_story && !empty($dup_story->ID)) {
                $query->set('post__not_in', array((int) $dup_story->ID));
            }
        }
    }

    public static function filter_rss_canonical_url($url) {
        return preg_replace('#^https?://(www\.)?bareunhaniwon\.com#i', self::CANONICAL_ORIGIN, (string) $url);
    }

    public static function filter_rss_self_link($link) {
        return self::CANONICAL_ORIGIN . '/feed/';
    }

    public static function filter_rss_title($title) {
        global $post;
        if ($post) {
            $cfg = self::resolve_seo_for_post($post);
            if (!empty($cfg['title'])) {
                return esc_html($cfg['title']);
            }
        }
        return esc_html($title);
    }

    public static function filter_rss_excerpt($excerpt) {
        global $post;
        if ($post) {
            $cfg = self::resolve_seo_for_post($post);
            if (!empty($cfg['description'])) {
                return esc_html($cfg['description']);
            }
        }
        return esc_html($excerpt);
    }

    public static function filter_rss_content($content) {
        global $post;
        if ($post) {
            $cfg = self::resolve_seo_for_post($post);
            $url = self::CANONICAL_ORIGIN . (!empty($cfg['path']) ? $cfg['path'] : '/');
            if ($post->post_type === 'page') {
                $desc = !empty($cfg['description']) ? $cfg['description'] : '';
                return '<p>' . esc_html($desc) . '</p><p><a href="' . esc_url($url) . '">' . esc_html($cfg['title']) . ' 바로가기</a></p>';
            }
            if ($post->post_type === 'post') {
                // Strip inline <script> (JSON-LD / view tracker) and <style> blocks so Naver Search Advisor RSS & feed readers ingest pure semantic HTML
                $cleaned = preg_replace('#<(script|style)\b[^>]*>[\s\S]*?</\1>#i', '', (string) $content);
                return trim((string) $cleaned);
            }
        }
        return $content;
    }

    public static function filter_robots_txt($output, $public) {
        $lines = array(
            'User-agent: *',
            'Allow: /',
            'Disallow: /wp-admin/',
            'Allow: /wp-admin/admin-ajax.php',
            '',
            'User-agent: Googlebot',
            'Allow: /',
            '',
            'User-agent: Yeti',
            'Allow: /',
            '',
            'User-agent: Bingbot',
            'Allow: /',
            '',
            'User-agent: Applebot',
            'Allow: /',
            '',
            'User-agent: Applebot-Extended',
            'Allow: /',
            '',
            'User-agent: GPTBot',
            'Allow: /',
            '',
            'User-agent: OAI-SearchBot',
            'Allow: /',
            '',
            'User-agent: ChatGPT-User',
            'Allow: /',
            '',
            'User-agent: ClaudeBot',
            'Allow: /',
            '',
            'User-agent: Claude-SearchBot',
            'Allow: /',
            '',
            'User-agent: Claude-User',
            'Allow: /',
            '',
            'User-agent: Claude-Web',
            'Allow: /',
            '',
            'User-agent: PerplexityBot',
            'Allow: /',
            '',
            'User-agent: Google-Extended',
            'Allow: /',
            '',
            'User-agent: cohere-ai',
            'Allow: /',
            '',
            'Sitemap: ' . self::CANONICAL_ORIGIN . '/wp-sitemap.xml',
            '# AI / LLM Generative Engine Optimization (GEO) Knowledge Index',
            '# ' . self::CANONICAL_ORIGIN . '/llms.txt',
            '# ' . self::CANONICAL_ORIGIN . '/llms-full.txt',
            ''
        );
        return implode("\n", $lines);
    }

    private static function extract_verification_token($raw) {
        $str = trim( wp_unslash((string) $raw) );
        if ($str === '') {
            return '';
        }
        if (preg_match('/content\s*=\s*["\']([^"\']+)["\']/i', $str, $m)) {
            return sanitize_text_field(trim($m[1]));
        }
        return sanitize_text_field($str);
    }

    public static function register_admin_menu() {
        add_options_page(
            '네이버·구글 검색등록 (SEO)',
            '네이버·구글 검색등록',
            'manage_options',
            'bareun-seo-verify',
            array(__CLASS__, 'render_admin_page')
        );
    }

    public static function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        $saved = false;
        if (isset($_POST['bareun_seo_verify_nonce']) && wp_verify_nonce($_POST['bareun_seo_verify_nonce'], 'save_bareun_seo_verify')) {
            $naver  = isset($_POST['naver_verify_code']) ? self::extract_verification_token($_POST['naver_verify_code']) : '';
            $google = isset($_POST['google_verify_code']) ? self::extract_verification_token($_POST['google_verify_code']) : '';
            update_option(self::OPT_VERIFY_CODES, array(
                'naver'  => $naver,
                'google' => $google
            ));
            $saved = true;
        }
        $verify = get_option(self::OPT_VERIFY_CODES, array());
        $naver_val  = (is_array($verify) && !empty($verify['naver'])) ? $verify['naver'] : self::DEFAULT_NAVER_VERIFY;
        $google_val = (is_array($verify) && !empty($verify['google'])) ? $verify['google'] : self::DEFAULT_GOOGLE_VERIFY;

        echo '<div class="wrap" style="max-width:780px;">';
        echo '<h1>🔍 바른한의원 대전본점 — 네이버 서치어드바이저 · 구글 서치콘솔 인증코드 등록</h1>';
        if ($saved) {
            echo '<div class="notice notice-success is-dismissible"><p><strong>저장 완료!</strong> 홈페이지 <code>&lt;head&gt;</code>에 소유권 확인 메타태그가 즉시 적용되었습니다. 이제 네이버/구글 화면에서 [소유확인] 버튼을 누르시면 됩니다. (캐시 플러그인 사용 시 상단 캐시 삭제 권장)</p></div>';
        }
        echo '<p style="font-size:14px;line-height:1.7;color:#334155;">네이버 서치어드바이저 또는 구글 서치콘솔에서 <strong>[HTML 태그]</strong> 방식을 선택하신 뒤,<br><code>&lt;meta name="naver-site-verification" content="..." /&gt;</code> <strong>태그 전체를 그대로 붙여넣으시거나</strong> <code>content</code> 안의 영문·숫자 코드만 입력하셔도 자동으로 인식됩니다.</p>';
        echo '<form method="post" style="background:#fff;padding:24px;border:1px solid #ccd0d4;border-radius:8px;margin-top:16px;">';
        wp_nonce_field('save_bareun_seo_verify', 'bareun_seo_verify_nonce');
        echo '<table class="form-table" role="presentation">';
        echo '<tr><th scope="row"><label for="naver_verify_code">네이버 서치어드바이저<br><small style="color:#64748b;">(naver-site-verification)</small></label></th><td>';
        echo '<input name="naver_verify_code" type="text" id="naver_verify_code" value="' . esc_attr($naver_val) . '" class="large-text code" placeholder="예: 1a2b3c4d5e... 또는 meta 태그 전체 붙여넣기">';
        echo '<p class="description">발급처: <a href="https://searchadvisor.naver.com/" target="_blank" rel="noopener noreferrer">https://searchadvisor.naver.com/</a> → 웹마스터 도구 → 사이트 등록(<code>https://www.bareunhaniwon.com</code>)</p>';
        echo '</td></tr>';
        echo '<tr><th scope="row"><label for="google_verify_code">구글 서치콘솔<br><small style="color:#64748b;">(google-site-verification)</small></label></th><td>';
        echo '<input name="google_verify_code" type="text" id="google_verify_code" value="' . esc_attr($google_val) . '" class="large-text code" placeholder="예: AbCdEfGhIjK... 또는 meta 태그 전체 붙여넣기">';
        echo '<p class="description">발급처: <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">https://search.google.com/search-console</a> → URL 접두어(<code>https://www.bareunhaniwon.com</code>) → HTML 태그</p>';
        echo '</td></tr>';
        echo '</table>';
        submit_button('인증코드 저장 및 즉시 적용');
        echo '</form>';
        echo '<div style="margin-top:18px;padding:16px 20px;background:#f8fafc;border-left:4px solid #2563eb;border-radius:4px;"><strong>📌 소유확인 완료 후 제출할 사이트맵 & RSS 주소:</strong><br>• 사이트맵(Sitemap): <code>https://www.bareunhaniwon.com/wp-sitemap.xml</code><br>• RSS 피드(네이버 서치어드바이저 RSS 제출): <code>https://www.bareunhaniwon.com/feed/</code></div>';
        echo '</div>';
    }

    public static function register_seo_rest_routes() {
        register_rest_route('bareun/v1', '/seo-verify', array(
            'methods'             => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback'            => function ($request) {
                $params = $request->get_json_params();
                if (!is_array($params)) {
                    $params = array();
                }
                $cur = get_option(self::OPT_VERIFY_CODES, array());
                if (!is_array($cur)) {
                    $cur = array();
                }
                if (isset($params['naver'])) {
                    $cur['naver'] = self::extract_verification_token($params['naver']);
                }
                if (isset($params['google'])) {
                    $cur['google'] = self::extract_verification_token($params['google']);
                }
                update_option(self::OPT_VERIFY_CODES, $cur);
                if (!empty($params['ogImageUrl'])) {
                    update_option(self::OPT_OG_IMAGE_URL, esc_url_raw((string) $params['ogImageUrl']));
                }
                if (!empty($params['llmsTxt'])) {
                    $llms_raw = (string) $params['llmsTxt'];
                    update_option(self::OPT_LLMS_TXT, $llms_raw, false);
                    @file_put_contents(ABSPATH . 'llms.txt', $llms_raw);
                }
                if (!empty($params['llmsFullTxt'])) {
                    $llms_full_raw = (string) $params['llmsFullTxt'];
                    update_option(self::OPT_LLMS_FULL_TXT, $llms_full_raw, false);
                    @file_put_contents(ABSPATH . 'llms-full.txt', $llms_full_raw);
                }
                return new WP_REST_Response(array(
                    'ok'          => true,
                    'verify'      => $cur,
                    'ogImage'     => get_option(self::OPT_OG_IMAGE_URL, ''),
                    'llmsUpdated' => !empty($params['llmsTxt']) || !empty($params['llmsFullTxt'])
                ), 200);
            }
        ));
    }
}
Bareun_Master_SEO_Engine_V1::init();
endif;

// ============================================================================
// BAREUN 24/7 ONLINE CUSTOM STUDIO ENGINE V4
// - Strict No-Face Directive Compliance (0% Face Exposure Guard)
// - Calibrated Upright Multi-Angle Director Ahn Likeness Synthesis
// - Fresh Scene Reasoning by Default (useSourceImageRef = false unless opted in)
// - Sub-Thumbnail Prompt Generation + Homepage Opening Story (WP ID 46) Support
// - Real-Time Argon High 2K Daily Free Usage & Remaining Quota Tracker
// ============================================================================
if (!class_exists('Bareun_Custom_Studio_Engine_V4')) :
class Bareun_Custom_Studio_Engine_V4 {
    const OPT_DETAIL_CFG       = 'bareun_detail_pages_config_v1';
    const OPT_HEALTH_NOTES_CFG = 'bareun_health_notes_cfg_v1';
    const OPT_CLINIC_INFO      = 'bareun_clinic_global_info_v1';
    const OPT_ANGLE_SAMPLES    = 'bareun_director_angle_samples_v1';
    const OPT_STUDIO_AI_KEYS   = 'bareun_studio_ai_keys_v1';
    const OPT_STUDIO_AI_USAGE  = 'bareun_studio_ai_usage_v1';

    // Official Page IDs on Cafe24 WordPress (https://www.bareunhaniwon.com)
    const PAGE_MAP = array(
        'home'                => 46,
        'director'            => 126,
        'chuna'               => 127,
        'growth'              => 105,
        'diet-zero'           => 66,
        'hairloss'            => 130,
        'hairloss-male'       => 408,
        'hairloss-alopecia'   => 409,
        'hairloss-female'     => 410,
        'hairloss-seborrheic' => 411,
        'gongjindan'          => 96,
        'prostate'            => 133,
        'body-explorer'       => 125
    );

    public static function init() {
        foreach (array('Bareun_Custom_Studio_Engine_V1', 'Bareun_Custom_Studio_Engine_V2', 'Bareun_Custom_Studio_Engine_V3') as $legacy_cls) {
            if (class_exists($legacy_cls)) {
                foreach (array(10, 20, 25) as $prio) {
                    remove_action('admin_menu', array($legacy_cls, 'register_admin_menu'), $prio);
                    remove_action('rest_api_init', array($legacy_cls, 'register_rest_routes'), $prio);
                }
                foreach (array(4, 5, 10) as $prio) {
                    remove_action('init', array($legacy_cls, 'handle_standalone_route'), $prio);
                }
            }
        }
        add_action('admin_menu', array(__CLASS__, 'register_admin_menu'), 30);
        add_action('rest_api_init', array(__CLASS__, 'register_rest_routes'), 30);
        add_action('init', array(__CLASS__, 'handle_standalone_route'), 3);
    }

    public static function register_admin_menu() {
        add_menu_page(
            '바른 커스텀 스튜디오',
            '🎨 바른 커스텀 스튜디오',
            'manage_options',
            'bareun-custom-studio',
            array(__CLASS__, 'render_admin_studio_page'),
            'dashicons-art',
            2
        );
    }

    public static function handle_standalone_route() {
        if (!isset($_GET['bareun_studio']) || $_GET['bareun_studio'] !== '1') {
            return;
        }
        if (!current_user_can('manage_options')) {
            auth_redirect();
            exit;
        }
        self::render_standalone_studio();
        exit;
    }

    public static function render_admin_studio_page() {
        $standalone_url = esc_url(add_query_arg(array('bareun_studio' => '1', '_sv' => time()), home_url('/')));
        echo '<style>';
        echo '#wpcontent { padding-left: 0 !important; }';
        echo '#wpbody-content { padding-bottom: 0 !important; }';
        echo '.bareun-studio-host-dock { display:flex; align-items:center; justify-content:space-between; background:#15120f; border-bottom:2px solid #c5a059; padding:10px 18px; color:#fff; gap:12px; flex-wrap:wrap; }';
        echo '.bareun-studio-frame-wrap { width:100%; height:calc(100vh - 85px); background:#0f0d0b; position:relative; }';
        echo '.bareun-studio-frame-wrap iframe { width:100%; height:100%; border:0; display:block; }';
        echo 'body.studio-fullscreen-active #adminmenumain, body.studio-fullscreen-active #wpadminbar, body.studio-fullscreen-active #wpfooter { display:none !important; }';
        echo 'body.studio-fullscreen-active #wpcontent { margin-left:0 !important; padding:0 !important; }';
        echo 'body.studio-fullscreen-active .bareun-studio-frame-wrap { height:100vh !important; }';
        echo '</style>';
        echo '<div class="bareun-studio-host-dock">';
        echo '<div style="display:flex;align-items:center;gap:10px;">';
        echo '<span style="background:linear-gradient(135deg,#e5ba64,#a67626);color:#111;font-weight:800;font-size:11px;padding:3px 9px;border-radius:999px;">24시간 아르곤 하이 2K V4 엔진</span>';
        echo '<strong style="font-size:15px;color:#fdfaf3;">바른한의원 메인 홈 &amp; 상세페이지 통합 커스텀 스튜디오</strong>';
        echo '<span style="color:#b5a895;font-size:12px;">(PC 전원 무관 · 외부/태블릿/모바일 100% 자율 접속)</span>';
        echo '</div>';
        echo '<div style="display:flex;align-items:center;gap:8px;">';
        echo '<button type="button" class="button button-secondary" onclick="document.body.classList.toggle(\'studio-fullscreen-active\');">⛶ 전체화면 확대</button>';
        echo '<a href="' . $standalone_url . '" target="_blank" rel="noopener" class="button button-primary" style="background:#b58532;border-color:#a67626;">🔗 독립 새 탭으로 열기</a>';
        echo '</div>';
        echo '</div>';
        echo '<div class="bareun-studio-frame-wrap">';
        echo '<iframe id="bareunStudioIframe" src="' . $standalone_url . '" title="바른 커스텀 스튜디오"></iframe>';
        echo '</div>';
    }

    public static function render_standalone_studio() {
        nocache_headers();
        $upload_dir = wp_upload_dir();
        $studio_file = $upload_dir['basedir'] . '/bareun-studio/detail-pages-editor.html';
        $nonce = wp_create_nonce('wp_rest');

        if (file_exists($studio_file)) {
            $ver = @filemtime($studio_file);
            if (!$ver) $ver = time();
            $html = file_get_contents($studio_file);
            $inject = '<script>' .
                'window.BAREUN_WP_STUDIO = true;' .
                'window.wpApiSettings = { nonce: "' . esc_js($nonce) . '", root: "' . esc_js(esc_url_raw(rest_url())) . '" };' .
                '</script>';
            $html = str_replace('<head>', '<head>' . $inject, $html);
            $html = str_replace('bareun-detail-compiler.js"', 'bareun-detail-compiler.js?v=' . $ver . '"', $html);
            $html = str_replace('card-image-prompts.js"', 'card-image-prompts.js?v=' . $ver . '"', $html);
            header('Content-Type: text/html; charset=UTF-8');
            echo $html;
            return;
        }

        header('Content-Type: text/html; charset=UTF-8');
        $safe_nonce = esc_js($nonce);
        $safe_root  = esc_js(esc_url_raw(rest_url()));
        echo '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>바른 커스텀 스튜디오 로딩 중...</title>';
        echo '<script>window.BAREUN_WP_STUDIO = true; window.wpApiSettings = { nonce: "' . $safe_nonce . '", root: "' . $safe_root . '" };</script>';
        echo '</head><body style="background:#171411;color:#fff;font-family:sans-serif;padding:40px;text-align:center;">';
        echo '<h2>🎨 바른 커스텀 스튜디오 초기 환경을 준비 중입니다...</h2>';
        echo '<p style="color:#d4af37;">스튜디오 템플릿을 자동으로 동기화하고 있습니다. 잠시만 기다려 주세요.</p>';
        echo '<script>fetch("/wp-json/bareun/v1/studio/ensure-assets", { method: "POST", headers: { "X-WP-Nonce": window.wpApiSettings.nonce } }).then(function(r){return r.json();}).then(function(data){ if(data.ok) location.reload(); else document.body.innerHTML += "<p style=\"color:#ef4444;\">동기화 오류: " + (data.error || "알 수 없는 오류") + "</p>"; }).catch(function(e){ document.body.innerHTML += "<p style=\"color:#ef4444;\">연결 실패: " + e.message + "</p>"; });</script>';
        echo '</body></html>';
    }

    public static function register_rest_routes() {
        register_rest_route('bareun/v1', '/studio/config', array(
            'methods'             => array('GET', 'POST'),
            'permission_callback' => function ($request) {
                if ($request->get_method() === 'GET') return true;
                return current_user_can('manage_options');
            },
            'callback'            => array(__CLASS__, 'rest_handle_config')
        ), true);

        register_rest_route('bareun/v1', '/studio/health-notes', array(
            'methods'             => array('GET', 'POST'),
            'permission_callback' => function ($request) {
                if ($request->get_method() === 'GET') return true;
                return current_user_can('manage_options');
            },
            'callback'            => array(__CLASS__, 'rest_handle_health_notes')
        ), true);

        register_rest_route('bareun/v1', '/studio/save', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_save_single_page')
        ), true);

        register_rest_route('bareun/v1', '/studio/save-all', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_save_all_pages')
        ), true);

        register_rest_route('bareun/v1', '/studio/upload', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_handle_upload')
        ), true);

        register_rest_route('bareun/v1', '/studio/angle-samples', array(
            'methods'             => array('GET', 'POST'),
            'permission_callback' => function ($request) {
                if ($request->get_method() === 'GET') return true;
                return current_user_can('manage_options');
            },
            'callback'            => array(__CLASS__, 'rest_handle_angle_samples')
        ), true);

        register_rest_route('bareun/v1', '/studio/ai-key', array(
            'methods'             => array('GET', 'POST'),
            'permission_callback' => function ($request) {
                if ($request->get_method() === 'GET') return true;
                return current_user_can('manage_options');
            },
            'callback'            => array(__CLASS__, 'rest_handle_ai_key')
        ), true);

        register_rest_route('bareun/v1', '/studio/ai-usage', array(
            'methods'             => array('GET', 'POST'),
            'permission_callback' => function ($request) {
                if ($request->get_method() === 'GET') return true;
                return current_user_can('manage_options');
            },
            'callback'            => array(__CLASS__, 'rest_handle_ai_usage')
        ), true);

        register_rest_route('bareun/v1', '/studio/generate-image', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_generate_ai_image')
        ), true);

        register_rest_route('bareun/v1', '/studio/sync-studio-assets', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_sync_studio_assets')
        ), true);

        register_rest_route('bareun/v1', '/studio/ensure-assets', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_ensure_assets_from_github')
        ), true);

        register_rest_route('bareun/v1', '/clinic-info', array(
            'methods'             => array('GET', 'POST'),
            'permission_callback' => function ($request) {
                if ($request->get_method() === 'GET') return true;
                return current_user_can('manage_options');
            },
            'callback'            => array(__CLASS__, 'rest_handle_clinic_info')
        ), true);

        register_rest_route('bareun/v1', '/studio/ai-legal-copy', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_handle_ai_legal_copy')
        ), true);

        register_rest_route('bareun/v1', '/studio/delete-page', array(
            'methods'             => 'POST',
            'permission_callback' => function () { return current_user_can('manage_options'); },
            'callback'            => array(__CLASS__, 'rest_handle_delete_page')
        ), true);
    }

    private static function get_kst_today_str_php() {
        try {
            $dt = new DateTime('now', new DateTimeZone('Asia/Seoul'));
            return $dt->format('Y-m-d');
        } catch (Exception $e) {
            return gmdate('Y-m-d', time() + 9 * 3600);
        }
    }

    private static function get_studio_ai_usage_php() {
        $today = self::get_kst_today_str_php();
        $saved = get_option(self::OPT_STUDIO_AI_USAGE, array());
        if (!is_array($saved)) $saved = array();

        $limit = isset($saved['dailyFreeLimit']) ? max(1, (int)$saved['dailyFreeLimit']) : 50;
        $saved_date = isset($saved['todayDate']) ? (string)$saved['todayDate'] : '';
        $today_used = isset($saved['argonHighTodayUsed']) ? max(0, (int)$saved['argonHighTodayUsed']) : 0;
        $total_used = isset($saved['argonHighTotalUsed']) ? max(0, (int)$saved['argonHighTotalUsed']) : 0;
        $exhausted  = !empty($saved['quotaExhaustedToday']);

        if ($saved_date !== $today) {
            $saved_date = $today;
            $today_used = 0;
            $exhausted  = false;
            $saved['todayDate'] = $today;
            $saved['argonHighTodayUsed'] = 0;
            $saved['quotaExhaustedToday'] = false;
            $saved['dailyFreeLimit'] = $limit;
            $saved['argonHighTotalUsed'] = $total_used;
            update_option(self::OPT_STUDIO_AI_USAGE, $saved, false);
        }

        $free_rem = $exhausted ? 0 : max(0, $limit - $today_used);
        return array(
            'todayDate'           => $saved_date,
            'dailyFreeLimit'      => $limit,
            'argonHighTodayUsed'  => $today_used,
            'argonHighTotalUsed'  => $total_used,
            'freeRemaining'       => $free_rem,
            'quotaExhaustedToday' => $exhausted,
            'lastUsedAt'          => isset($saved['lastUsedAt']) ? $saved['lastUsedAt'] : null,
            'lastModel'           => isset($saved['lastModel']) ? $saved['lastModel'] : 'gemini-3-pro-image'
        );
    }

    private static function record_studio_ai_usage_php($is_argon, $model_id, $mark_exhausted = false) {
        $cur = self::get_studio_ai_usage_php();
        $saved = get_option(self::OPT_STUDIO_AI_USAGE, array());
        if (!is_array($saved)) $saved = array();

        $saved['todayDate'] = $cur['todayDate'];
        $saved['dailyFreeLimit'] = $cur['dailyFreeLimit'];
        $saved['argonHighTodayUsed'] = $cur['argonHighTodayUsed'] + ($is_argon ? 1 : 0);
        $saved['argonHighTotalUsed'] = $cur['argonHighTotalUsed'] + ($is_argon ? 1 : 0);
        $saved['quotaExhaustedToday'] = $mark_exhausted ? true : $cur['quotaExhaustedToday'];
        $saved['lastUsedAt'] = current_time('c');
        if ($model_id) $saved['lastModel'] = (string)$model_id;

        update_option(self::OPT_STUDIO_AI_USAGE, $saved, false);
        return self::get_studio_ai_usage_php();
    }

    public static function rest_handle_ai_usage($request) {
        nocache_headers();
        if ($request->get_method() === 'POST') {
            $params = $request->get_json_params();
            if (!is_array($params)) $params = array();
            $cur = self::get_studio_ai_usage_php();
            $saved = get_option(self::OPT_STUDIO_AI_USAGE, array());
            if (!is_array($saved)) $saved = array();
            $saved['todayDate'] = $cur['todayDate'];
            $saved['dailyFreeLimit'] = isset($params['dailyFreeLimit'])
                ? max(1, min(5000, (int)$params['dailyFreeLimit']))
                : $cur['dailyFreeLimit'];
            $saved['argonHighTodayUsed'] = !empty($params['resetToday']) ? 0 : $cur['argonHighTodayUsed'];
            $saved['argonHighTotalUsed'] = $cur['argonHighTotalUsed'];
            $saved['quotaExhaustedToday'] = !empty($params['resetToday']) ? false : $cur['quotaExhaustedToday'];
            update_option(self::OPT_STUDIO_AI_USAGE, $saved, false);
            return new WP_REST_Response(array(
                'ok'    => true,
                'usage' => self::get_studio_ai_usage_php()
            ), 200);
        }
        return new WP_REST_Response(array(
            'ok'    => true,
            'usage' => self::get_studio_ai_usage_php()
        ), 200);
    }

    private static function mask_secret_key($raw) {
        $s = trim((string)$raw);
        if ($s === '') return '';
        if (strlen($s) <= 10) return substr($s, 0, 3) . '***';
        return substr($s, 0, 7) . '...' . substr($s, -4);
    }

    private static function get_raw_ai_keys() {
        $saved = get_option(self::OPT_STUDIO_AI_KEYS, array());
        if (!is_array($saved)) $saved = array();
        return array(
            'geminiKey' => isset($saved['geminiKey']) ? trim((string)$saved['geminiKey']) : '',
            'falKey'    => isset($saved['falKey']) ? trim((string)$saved['falKey']) : ''
        );
    }

    private static function build_ai_key_status_payload() {
        $keys = self::get_raw_ai_keys();
        $has_g = ($keys['geminiKey'] !== '');
        $has_f = ($keys['falKey'] !== '');
        $has_argon = ($has_g || $has_f);
        $provider = 'free-flux';
        $label = '무료 기본 FLUX 엔진 (아르곤 하이 미연결)';
        if ($has_g) {
            $provider = 'google-gemini-pro';
            $label = '아르곤 하이 정품 엔진 (Google Gemini 3 Pro Image · 2K 초고화질)';
        } elseif ($has_f) {
            $provider = 'fal-nano-banana-pro';
            $label = '아르곤 하이 정품 엔진 (Nano Banana Pro · Gemini 3 Pro Image 2K)';
        }
        return array(
            'ok'              => true,
            'hasArgonEngine'  => $has_argon,
            'hasGeminiKey'    => $has_g,
            'hasFalKey'       => $has_f,
            'activeProvider'  => $provider,
            'activeLabel'     => $label,
            'maskedGeminiKey' => self::mask_secret_key($keys['geminiKey']),
            'maskedFalKey'    => self::mask_secret_key($keys['falKey']),
            'usage'           => self::get_studio_ai_usage_php()
        );
    }

    public static function rest_handle_ai_key($request) {
        nocache_headers();
        if ($request->get_method() === 'POST') {
            $params = $request->get_json_params();
            if (!is_array($params)) $params = array();
            $saved = self::get_raw_ai_keys();

            if (!empty($params['apiKey'])) {
                $single = trim((string)$params['apiKey']);
                if (stripos($single, 'AIza') === 0) {
                    $saved['geminiKey'] = $single;
                } elseif (strpos($single, ':') !== false || stripos($single, 'fal_') === 0) {
                    $saved['falKey'] = $single;
                } else {
                    $saved['geminiKey'] = $single;
                }
            }
            if (isset($params['geminiKey'])) {
                $gk = trim((string)$params['geminiKey']);
                if ($gk === '__CLEAR__') $saved['geminiKey'] = '';
                elseif ($gk !== '') $saved['geminiKey'] = $gk;
            }
            if (isset($params['falKey'])) {
                $fk = trim((string)$params['falKey']);
                if ($fk === '__CLEAR__') $saved['falKey'] = '';
                elseif ($fk !== '') $saved['falKey'] = $fk;
            }
            update_option(self::OPT_STUDIO_AI_KEYS, $saved, false);
            $out = self::build_ai_key_status_payload();
            $out['message'] = '아르곤 하이(Gemini 3 Pro Image 2K) 엔진 키가 실서버에 안전하게 저장되었습니다!';
            return new WP_REST_Response($out, 200);
        }

        return new WP_REST_Response(self::build_ai_key_status_payload(), 200);
    }

    public static function rest_handle_config($request) {
        if ($request->get_method() === 'POST') {
            $params = $request->get_json_params();
            if (!is_array($params) || empty($params['config'])) {
                return new WP_REST_Response(array('ok' => false, 'error' => '유효한 config 데이터가 없습니다.'), 400);
            }
            update_option(self::OPT_DETAIL_CFG, $params['config']);
            return new WP_REST_Response(array('ok' => true, 'config' => $params['config'], 'message' => '실서버 DB 설정 저장 완료'), 200);
        }

        $cfg = get_option(self::OPT_DETAIL_CFG);
        if (empty($cfg) || !is_array($cfg)) {
            $upload_dir = wp_upload_dir();
            $disk_cfg_path = $upload_dir['basedir'] . '/bareun-studio/detail-pages-config.json';
            if (file_exists($disk_cfg_path)) {
                $raw = file_get_contents($disk_cfg_path);
                $cfg = json_decode($raw, true);
            }
        }

        $attachments = get_posts(array(
            'post_type'      => 'attachment',
            'post_mime_type' => 'image',
            'post_status'    => 'inherit',
            'posts_per_page' => 140
        ));
        $availableImages = array();
        if (is_array($attachments)) {
            foreach ($attachments as $att) {
                $url = wp_get_attachment_url($att->ID);
                if ($url) $availableImages[] = $url;
            }
        }
        if (is_array($cfg) && !empty($cfg['pages']) && is_array($cfg['pages'])) {
            foreach ($cfg['pages'] as $pg) {
                if (!empty($pg['plates']) && is_array($pg['plates'])) {
                    foreach ($pg['plates'] as $pl) {
                        foreach (array('imgSrc', 'beforeImg', 'afterImg', 'poster') as $k) {
                            if (!empty($pl[$k])) {
                                $clean = explode('?', (string)$pl[$k])[0];
                                if ($clean && !in_array($clean, $availableImages, true)) {
                                    $availableImages[] = $clean;
                                }
                            }
                        }
                        if (!empty($pl['thumbs']) && is_array($pl['thumbs'])) {
                            foreach ($pl['thumbs'] as $th) {
                                if (!empty($th['img'])) {
                                    $clean = explode('?', (string)$th['img'])[0];
                                    if ($clean && !in_array($clean, $availableImages, true)) {
                                        $availableImages[] = $clean;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $hn_cfg = self::load_health_notes_cfg_php(false);
        if (is_array($hn_cfg) && !empty($hn_cfg['notes']) && is_array($hn_cfg['notes'])) {
            foreach ($hn_cfg['notes'] as $hn_item) {
                if (!is_array($hn_item)) continue;
                foreach (array('empathyIllustImg', 'deepIllustImg', 'routineIllustImg') as $hk) {
                    if (!empty($hn_item[$hk])) {
                        $clean = explode('?', (string)$hn_item[$hk])[0];
                        if ($clean && !in_array($clean, $availableImages, true)) {
                            $availableImages[] = $clean;
                        }
                    }
                }
            }
        }

        return new WP_REST_Response(array(
            'ok'                => true,
            'config'            => $cfg,
            'healthNotesConfig' => $hn_cfg,
            'clinicGlobalInfo'  => self::load_clinic_info_php(),
            'availableImages'   => $availableImages,
            'availableVideos'   => array()
        ), 200);
    }

    public static function load_clinic_info_php() {
        $saved = get_option(self::OPT_CLINIC_INFO, null);
        if (is_array($saved) && !empty($saved['clinicName'])) {
            return $saved;
        }
        $upload_dir = wp_upload_dir();
        $disk_f = $upload_dir['basedir'] . '/bareun-studio/clinic-global-info.json';
        if (file_exists($disk_f)) {
            $dec = json_decode(file_get_contents($disk_f), true);
            if (is_array($dec) && !empty($dec['clinicName'])) {
                update_option(self::OPT_CLINIC_INFO, $dec, false);
                return $dec;
            }
        }
        return array(
            'clinicName'        => '바른한의원 대전본점',
            'directorName'      => '안정위',
            'directorTitle'     => '대표원장',
            'businessRegNo'     => '211-91-10479',
            'greetingEyebrow'   => "DIRECTOR'S WARM GREETING · 대표원장 환영 인사말",
            'greetingTitle'     => '먼 길 찾아주시는 소중한 발걸음, 내 가족을 돌보는 정직한 마음으로 맞이합니다',
            'greetingBody'      => '바른한의원 대전본점을 찾아주셔서 진심으로 감사합니다. 통증과 불편함 너머의 일상까지 깊이 경청하며, 제 가족과 아이에게 직접 처방·시술하는 검증된 치료만으로 한 분 한 분 정성껏 진료하겠습니다.',
            'greetingSign'      => '바른한의원 대전본점 대표원장 안정위 배상',
            'phone'             => '010-5631-1275',
            'kakaoUrl'          => 'https://pf.kakao.com/_ykxcLK',
            'naverBookingUrl'   => 'https://naver.me/5U1ELn8L',
            'address'           => '대전광역시 대덕구 비래동로7번길 1, 2층 (비래동, 바른한의원 대전본점)',
            'shortAddress'      => '대전 대덕구 비래동로7번길 1, 2층',
            'postalCode'        => '34417',
            'lat'               => 36.35536,
            'lng'               => 127.44778
        );
    }

    public static function rest_handle_clinic_info($request) {
        nocache_headers();
        if ($request->get_method() === 'POST') {
            $params = $request->get_json_params();
            $info = (is_array($params) && isset($params['info']) && is_array($params['info'])) ? $params['info'] : $params;
            if (!is_array($info) || empty($info['clinicName'])) {
                return new WP_REST_Response(array('ok' => false, 'error' => '유효한 병원 정보(info) 데이터가 없습니다.'), 400);
            }
            $info['updatedAt'] = current_time('c');
            update_option(self::OPT_CLINIC_INFO, $info, false);

            $upload_dir = wp_upload_dir();
            $target_dir = $upload_dir['basedir'] . '/bareun-studio';
            wp_mkdir_p($target_dir);
            @file_put_contents($target_dir . '/clinic-global-info.json', wp_json_encode($info, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

            if (!empty($params['compiledLocationHtml'])) {
                self::upsert_wp_page_by_slug('location', '오시는길 · 진료시간 · 비급여 안내', (string)$params['compiledLocationHtml']);
            }
            self::flush_all_wp_caches();
            return new WP_REST_Response(array(
                'ok'      => true,
                'info'    => $info,
                'liveUrl' => home_url('/location/'),
                'message' => '병원 기본정보 · 인사말 · 진료시간 · 비급여 수가표가 실서버에 반영되었습니다!'
            ), 200);
        }

        return new WP_REST_Response(array(
            'ok'   => true,
            'info' => self::load_clinic_info_php()
        ), 200);
    }

    public static function rest_handle_ai_legal_copy($request) {
        nocache_headers();
        $params = $request->get_json_params();
        if (!is_array($params)) $params = array();
        $title = isset($params['title']) ? trim((string)$params['title']) : '';
        $sub   = isset($params['sub']) ? trim((string)$params['sub']) : '';

        $replacements = array(
            '100% 완치' => '근본적인 회복 관리',
            '완치 보장' => '세심한 회복 치료',
            '완치'      => '호전 및 회복',
            '무조건'    => '체계적으로',
            '절대 안'   => '쉽게 재발하지 않도록',
            '절대'      => '면밀히',
            '최고의'    => '정성을 다하는',
            '최고'      => '수준 높은',
            '최초의'    => '특화된',
            '최초'      => '선도적인',
            '유일한'    => '차별화된',
            '유일'      => '맞춤형',
            '부작용 없는' => '신체 부담을 낮춘',
            '부작용 0%' => '안전성을 고려한',
            '100%'      => '체계적인',
            '기적의'    => '밀도 높은',
            '기적'      => '긍정적 변화',
            '특효'      => '맞춤 처방',
            '보장합니다' => '도와드립니다',
            '보장'      => '기대할 수 있는 관리'
        );

        $detected = array();
        $combined = $title . ' ' . $sub;
        foreach ($replacements as $bad => $good) {
            if (mb_strpos($combined, $bad) !== false) {
                $detected[] = $bad;
            }
        }

        // Try Gemini 2.5 Flash medical law copywriter if key is configured
        $keys = self::get_raw_ai_keys();
        if (!empty($keys['geminiKey'])) {
            $prompt = "당신은 대한민국 의료법 제56조(의료광고 금지 기준)를 엄격히 준수하는 한의원 전문 에디토리얼 카피라이터입니다.\n" .
                "아래 카드 제목(title)과 본문(sub)에서 '100%, 완치, 무조건, 최고, 최초, 유일, 부작용 없는, 보장, 특효, 기적' 등 소비자를 현혹하거나 치료 효과를 단정하는 표현을 모두 순화하고, 환자 공감과 한의학적 진정성이 느껴지는 품격 있는 문장으로 다듬어 JSON 형식으로만 응답하세요.\n" .
                "응답 형식: {\"title\":\"다듬은 제목\",\"sub\":\"다듬은 본문\"}\n\n" .
                "[원본 제목]: " . $title . "\n[원본 본문]: " . $sub;
            $g_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . rawurlencode($keys['geminiKey']);
            $g_res = wp_remote_post($g_url, array(
                'timeout' => 15,
                'headers' => array('Content-Type' => 'application/json'),
                'body'    => wp_json_encode(array(
                    'contents' => array(array('parts' => array(array('text' => $prompt)))),
                    'generationConfig' => array('temperature' => 0.35, 'responseMimeType' => 'application/json')
                ))
            ));
            if (!is_wp_error($g_res) && wp_remote_retrieve_response_code($g_res) === 200) {
                $g_body = json_decode(wp_remote_retrieve_body($g_res), true);
                $txt = $g_body['candidates'][0]['content']['parts'][0]['text'] ?? '';
                $parsed = json_decode($txt, true);
                if (is_array($parsed) && !empty($parsed['title'])) {
                    return new WP_REST_Response(array(
                        'ok'       => true,
                        'engine'   => 'gemini-2.5-flash',
                        'detected' => $detected,
                        'title'    => trim((string)$parsed['title']),
                        'sub'      => isset($parsed['sub']) ? trim((string)$parsed['sub']) : $sub
                    ), 200);
                }
            }
        }

        $safe_title = strtr($title, $replacements);
        $safe_sub   = strtr($sub, $replacements);
        return new WP_REST_Response(array(
            'ok'       => true,
            'engine'   => 'medical-law-rule-polisher',
            'detected' => $detected,
            'title'    => $safe_title,
            'sub'      => $safe_sub
        ), 200);
    }

    public static function rest_handle_delete_page($request) {
        nocache_headers();
        $params = $request->get_json_params();
        $slug = isset($params['slug']) ? sanitize_title($params['slug']) : '';
        if (!$slug || isset(self::PAGE_MAP[$slug]) || $slug === 'location') {
            return new WP_REST_Response(array('ok' => false, 'error' => '기본 핵심 페이지는 삭제할 수 없으며, 추가 생성한 커스텀 질환 페이지만 삭제 가능합니다.'), 400);
        }
        $existing = get_page_by_path($slug, OBJECT, 'page');
        if ($existing && !empty($existing->ID)) {
            wp_delete_post((int)$existing->ID, true);
        }
        if (!empty($params['config']) && is_array($params['config'])) {
            update_option(self::OPT_DETAIL_CFG, $params['config']);
        }
        self::flush_all_wp_caches();
        return new WP_REST_Response(array(
            'ok'      => true,
            'slug'    => $slug,
            'message' => "커스텀 페이지 [{$slug}]가 삭제되었습니다."
        ), 200);
    }

    private static function upsert_wp_page_by_slug($slug, $page_title, $compiled) {
        if (isset(self::PAGE_MAP[$slug])) {
            return wp_update_post(array(
                'ID'           => self::PAGE_MAP[$slug],
                'post_content' => $compiled
            ), true);
        }
        $existing = get_page_by_path($slug, OBJECT, 'page');
        if ($existing && !empty($existing->ID)) {
            return wp_update_post(array(
                'ID'           => (int)$existing->ID,
                'post_status'  => 'publish',
                'post_title'   => $page_title ?: $existing->post_title,
                'post_content' => $compiled
            ), true);
        }
        $new_id = wp_insert_post(array(
            'post_type'      => 'page',
            'post_status'    => 'publish',
            'post_name'      => $slug,
            'post_title'     => $page_title ?: $slug,
            'post_content'   => $compiled,
            'comment_status' => 'closed',
            'ping_status'    => 'closed'
        ), true);
        if (!is_wp_error($new_id)) {
            flush_rewrite_rules(false);
        }
        return $new_id;
    }

    private static function flush_all_wp_caches() {
        wp_cache_flush();
        if (function_exists('wp_cache_clean_cache')) {
            global $file_prefix;
            @wp_cache_clean_cache(isset($file_prefix) ? $file_prefix : 'wp-cache-', true);
        }
        if (has_action('litespeed_purge_all')) {
            do_action('litespeed_purge_all');
        }
    }

    public static function load_health_notes_cfg_php($force_default = false) {
        $upload_dir = wp_upload_dir();
        $studio_dir = $upload_dir['basedir'] . '/bareun-studio';
        if (!$force_default) {
            $saved = get_option(self::OPT_HEALTH_NOTES_CFG, null);
            if (is_array($saved) && !empty($saved['notes'])) {
                return $saved;
            }
            $local_f = $studio_dir . '/health-notes-custom-config.json';
            if (file_exists($local_f)) {
                $dec = json_decode(file_get_contents($local_f), true);
                if (is_array($dec) && !empty($dec['notes'])) {
                    update_option(self::OPT_HEALTH_NOTES_CFG, $dec, false);
                    return $dec;
                }
            }
        }
        $def_f = $studio_dir . '/health-notes-custom-config.default.json';
        if (file_exists($def_f)) {
            $dec = json_decode(file_get_contents($def_f), true);
            if (is_array($dec) && !empty($dec['notes'])) {
                return $dec;
            }
        }
        $gh_url = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/' . ($force_default ? 'health-notes-custom-config.default.json' : 'health-notes-custom-config.json');
        $res = wp_remote_get($gh_url, array('timeout' => 15));
        if (!is_wp_error($res) && wp_remote_retrieve_response_code($res) === 200) {
            $dec = json_decode(wp_remote_retrieve_body($res), true);
            if (is_array($dec) && !empty($dec['notes'])) {
                if (!$force_default) {
                    update_option(self::OPT_HEALTH_NOTES_CFG, $dec, false);
                }
                return $dec;
            }
        }
        return null;
    }

    public static function rest_handle_health_notes($request) {
        nocache_headers();
        if ($request->get_method() === 'POST') {
            $params = $request->get_json_params();
            $hn_cfg = (is_array($params) && isset($params['healthNotesConfig']) && is_array($params['healthNotesConfig']))
                ? $params['healthNotesConfig']
                : $params;
            if (!is_array($hn_cfg) || !isset($hn_cfg['notes']) || !is_array($hn_cfg['notes'])) {
                return new WP_REST_Response(array('ok' => false, 'error' => '유효한 healthNotesConfig 데이터가 없습니다.'), 400);
            }
            $hn_cfg['updatedAt'] = gmdate('c');
            update_option(self::OPT_HEALTH_NOTES_CFG, $hn_cfg, false);

            $upload_dir = wp_upload_dir();
            $target_dir = $upload_dir['basedir'] . '/bareun-studio';
            wp_mkdir_p($target_dir);
            @file_put_contents($target_dir . '/health-notes-custom-config.json', wp_json_encode($hn_cfg, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

            self::flush_all_wp_caches();

            // Non-blocking IndexNow ping for /body-explorer/ + active standalone /health-note-{id}/ URLs
            $ping_urls = array('https://www.bareunhaniwon.com/body-explorer/');
            foreach ($hn_cfg['notes'] as $n_item) {
                if (!is_array($n_item) || empty($n_item['id'])) continue;
                if (isset($n_item['enabled']) && !$n_item['enabled']) continue;
                $clean_nid = strtolower(preg_replace('/[^a-z0-9\-]/i', '', (string) $n_item['id']));
                if ($clean_nid !== '') {
                    $ping_urls[] = 'https://www.bareunhaniwon.com/health-note-' . $clean_nid . '/';
                }
                if (count($ping_urls) >= 100) break;
            }
            Bareun_Master_SEO_Engine_V1::ping_all_search_engines(array_values(array_unique($ping_urls)));

            return new WP_REST_Response(array(
                'ok'                => true,
                'deployed'          => true,
                'indexNowCount'     => count($ping_urls),
                'liveUrl'           => home_url('/body-explorer/'),
                'healthNotesConfig' => $hn_cfg,
                'message'           => '3D 오늘의 건강 글(인라인 상세 서랍) 및 72편 독립 검색 정본(/health-note-{id}/)이 카페24 실서버에 동시 반영되고 IndexNow 색인 핑이 전송되었습니다!'
            ), 200);
        }

        $is_def = ($request->get_param('default') === '1');
        $hn_cfg = self::load_health_notes_cfg_php($is_def);
        return new WP_REST_Response(array(
            'ok'                => is_array($hn_cfg),
            'healthNotesConfig' => $hn_cfg
        ), 200);
    }

    public static function rest_save_single_page($request) {
        $params = $request->get_json_params();
        if (!is_array($params)) {
            return new WP_REST_Response(array('ok' => false, 'error' => '잘못된 요청 형식입니다.'), 400);
        }

        if (!empty($params['config']) && is_array($params['config'])) {
            update_option(self::OPT_DETAIL_CFG, $params['config']);
        }
        if (!empty($params['healthNotesConfig']) && is_array($params['healthNotesConfig']) && isset($params['healthNotesConfig']['notes'])) {
            update_option(self::OPT_HEALTH_NOTES_CFG, $params['healthNotesConfig'], false);
        }

        $slug = isset($params['targetSlug']) ? sanitize_title($params['targetSlug']) : '';
        if (empty($slug) && !empty($params['targetPage'])) {
            $slug = preg_replace('/\.html$/i', '', basename($params['targetPage']));
        }
        if ($slug === 'index' || $slug === 'story-3d') {
            $slug = 'home';
        }

        $compiled = isset($params['compiledHtml']) ? (string)$params['compiledHtml'] : '';
        $page_title = isset($params['pageTitle']) ? sanitize_text_field($params['pageTitle']) : $slug;
        if (!empty($compiled) && !empty($slug)) {
            $update_res = self::upsert_wp_page_by_slug($slug, $page_title, $compiled);
            if (is_wp_error($update_res)) {
                return new WP_REST_Response(array('ok' => false, 'error' => $update_res->get_error_message()), 500);
            }
            self::flush_all_wp_caches();
            $live_url = ($slug === 'home') ? home_url('/') : home_url('/' . $slug . '/');
            return new WP_REST_Response(array(
                'ok'       => true,
                'deployed' => true,
                'pageId'   => (int)$update_res,
                'liveUrl'  => $live_url,
                'message'  => "[{$slug}] 페이지가 카페24 실서버에 즉시 반영되었습니다!"
            ), 200);
        }

        return new WP_REST_Response(array(
            'ok'      => true,
            'message' => '설정 데이터가 저장되었습니다.'
        ), 200);
    }

    public static function rest_save_all_pages($request) {
        $params = $request->get_json_params();
        if (!is_array($params)) {
            return new WP_REST_Response(array('ok' => false, 'error' => '잘못된 요청 형식입니다.'), 400);
        }

        if (!empty($params['config']) && is_array($params['config'])) {
            update_option(self::OPT_DETAIL_CFG, $params['config']);
        }
        if (!empty($params['healthNotesConfig']) && is_array($params['healthNotesConfig']) && isset($params['healthNotesConfig']['notes'])) {
            update_option(self::OPT_HEALTH_NOTES_CFG, $params['healthNotesConfig'], false);
        }

        $pages = isset($params['pages']) && is_array($params['pages']) ? $params['pages'] : array();
        $updatedCount = 0;

        foreach ($pages as $p) {
            $slug = isset($p['slug']) ? sanitize_title($p['slug']) : '';
            if ($slug === 'index' || $slug === 'story-3d') $slug = 'home';
            $compiled = isset($p['compiledHtml']) ? (string)$p['compiledHtml'] : '';
            $p_title  = isset($p['title']) ? sanitize_text_field($p['title']) : $slug;
            if ($slug && $compiled) {
                $r = self::upsert_wp_page_by_slug($slug, $p_title, $compiled);
                if (!is_wp_error($r)) {
                    $updatedCount++;
                }
            }
        }

        self::flush_all_wp_caches();

        return new WP_REST_Response(array(
            'ok'           => true,
            'deployed'     => true,
            'updatedCount' => $updatedCount,
            'message'      => "전체 페이지가 카페24 실서버에 일괄 배포되었습니다! ({$updatedCount}개 페이지 갱신 완료)"
        ), 200);
    }

    public static function rest_handle_upload($request) {
        $params = $request->get_json_params();
        if (!is_array($params) || empty($params['dataUrl'])) {
            return new WP_REST_Response(array('ok' => false, 'error' => '업로드 데이터(dataUrl)가 없습니다.'), 400);
        }

        $orig_name = isset($params['fileName']) ? sanitize_file_name($params['fileName']) : 'image.jpg';
        $data_url = (string)$params['dataUrl'];

        if (!preg_match('/^data:(image\/(?:jpeg|jpg|png|webp|gif|svg\+xml)|video\/mp4);base64,(.+)$/i', $data_url, $m)) {
            return new WP_REST_Response(array('ok' => false, 'error' => '지원되는 이미지/비디오 형식이 아닙니다.'), 400);
        }

        $mime = strtolower($m[1]);
        $bin = base64_decode($m[2]);
        if ($bin === false) {
            return new WP_REST_Response(array('ok' => false, 'error' => 'Base64 디코딩 실패'), 400);
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $clean_base = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($orig_name, PATHINFO_FILENAME));
        $ext = pathinfo($orig_name, PATHINFO_EXTENSION);
        if (!$ext) $ext = 'jpg';
        $unique_name = 'detail_custom_' . time() . '_' . substr($clean_base, 0, 30) . '.' . $ext;

        $upload = wp_upload_bits($unique_name, null, $bin);
        if (!empty($upload['error'])) {
            return new WP_REST_Response(array('ok' => false, 'error' => $upload['error']), 500);
        }

        $attachment = array(
            'guid'           => $upload['url'],
            'post_mime_type' => $mime,
            'post_title'     => preg_replace('/\.[^.]+$/', '', $unique_name),
            'post_content'   => '',
            'post_status'    => 'inherit'
        );
        $attach_id = wp_insert_attachment($attachment, $upload['file']);
        if ($attach_id && function_exists('wp_generate_attachment_metadata')) {
            $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
            wp_update_attachment_metadata($attach_id, $attach_data);
        }

        return new WP_REST_Response(array(
            'ok'       => true,
            'fileName' => $unique_name,
            'url'      => $upload['url'],
            'message'  => '미디어 라이브러리 업로드 성공'
        ), 200);
    }

    private static function get_default_angle_slots() {
        return array(
            array('key' => 'front',        'label' => '정면 (0° · 기본)', 'desc' => '85mm 정면 · 단정한 기본',      'file' => 'angle_front.jpg'),
            array('key' => 'frontSmile',   'label' => '정면 미소 (0°)',   'desc' => '온화한 눈웃음 · 미소',          'file' => 'angle_front_smile.jpg'),
            array('key' => 'left15Smile',  'label' => '좌측 15° 미소',    'desc' => '좌측 사선 · 진료 상담 미소',   'file' => 'angle_left15_smile.jpg'),
            array('key' => 'right15Smile', 'label' => '우측 15° 미소',    'desc' => '우측 사선 · 진료 설명 미소',   'file' => 'angle_right15_smile.jpg'),
            array('key' => 'left30',       'label' => '좌측 30° 사선',    'desc' => '왼쪽 반측면 · 골격 기준',      'file' => 'angle_left30.jpg'),
            array('key' => 'right30',      'label' => '우측 30° 사선',    'desc' => '오른쪽 반측면 · 골격 기준',    'file' => 'angle_right30.jpg'),
            array('key' => 'leftProfile',  'label' => '좌측 측면 (45°+)', 'desc' => '왼쪽 깊은 측면 · 콧대·턱선',   'file' => 'angle_left_profile.jpg'),
            array('key' => 'rightProfile', 'label' => '우측 측면 (45°+)', 'desc' => '오른쪽 깊은 측면 · 콧대·턱선', 'file' => 'angle_right_profile.jpg')
        );
    }

    public static function rest_handle_angle_samples($request) {
        $slots = self::get_default_angle_slots();
        $saved = get_option(self::OPT_ANGLE_SAMPLES, array());
        if (!is_array($saved)) {
            $saved = array();
        }

        if ($request->get_method() === 'POST') {
            $params = $request->get_json_params();
            if (!is_array($params) || empty($params['angleKey']) || empty($params['dataUrl'])) {
                return new WP_REST_Response(array('ok' => false, 'error' => '각도 키(angleKey)와 사진 데이터(dataUrl)가 필요합니다.'), 400);
            }
            $angle_key = sanitize_text_field((string)$params['angleKey']);
            $valid = false;
            foreach ($slots as $sl) {
                if ($sl['key'] === $angle_key) {
                    $valid = true;
                    break;
                }
            }
            if (!$valid) {
                return new WP_REST_Response(array('ok' => false, 'error' => '유효하지 않은 각도 슬롯입니다.'), 400);
            }

            $data_url = (string)$params['dataUrl'];
            if (!preg_match('/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/i', $data_url, $m)) {
                return new WP_REST_Response(array('ok' => false, 'error' => 'JPG, PNG, WEBP 형식의 얼굴 사진을 선택해 주세요.'), 400);
            }
            $mime = strtolower($m[1]);
            $bin  = base64_decode($m[2]);
            if ($bin === false || strlen($bin) < 1024) {
                return new WP_REST_Response(array('ok' => false, 'error' => '유효한 이미지 데이터가 아닙니다.'), 400);
            }

            require_once ABSPATH . 'wp-admin/includes/file.php';
            require_once ABSPATH . 'wp-admin/includes/media.php';
            require_once ABSPATH . 'wp-admin/includes/image.php';

            $ext = strpos($mime, 'png') !== false ? 'png' : (strpos($mime, 'webp') !== false ? 'webp' : 'jpg');
            $unique_name = 'director_angle_' . strtolower($angle_key) . '_' . time() . '.' . $ext;
            $upload = wp_upload_bits($unique_name, null, $bin);
            if (!empty($upload['error'])) {
                return new WP_REST_Response(array('ok' => false, 'error' => $upload['error']), 500);
            }

            // Auto-orient EXIF & normalize <=1024px so smartphone portraits are NEVER sideways!
            if (function_exists('wp_get_image_editor')) {
                $editor = wp_get_image_editor($upload['file']);
                if (!is_wp_error($editor)) {
                    if (method_exists($editor, 'maybe_exif_rotate')) {
                        $editor->maybe_exif_rotate();
                    }
                    $editor->resize(1024, 1024, false);
                    $editor->save($upload['file']);
                }
            }

            $saved[$angle_key] = array(
                'fileName'  => $upload['url'],
                'updatedAt' => current_time('c')
            );
            update_option(self::OPT_ANGLE_SAMPLES, $saved);
        }

        $upload_dir = wp_upload_dir();
        $studio_angle_dir = $upload_dir['basedir'] . '/bareun-studio/director-angle-refs';
        $studio_angle_url = $upload_dir['baseurl'] . '/bareun-studio/director-angle-refs';
        $gh_angle_base = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/director-angle-refs';

        $out_angles = array();
        foreach ($slots as $sl) {
            $k = $sl['key'];
            $default_url = file_exists($studio_angle_dir . '/' . $sl['file'])
                ? ($studio_angle_url . '/' . $sl['file'])
                : ($gh_angle_base . '/' . $sl['file']);
            $custom_url = (!empty($saved[$k]['fileName'])) ? $saved[$k]['fileName'] : $default_url;
            $out_angles[] = array(
                'key'       => $k,
                'label'     => $sl['label'],
                'desc'      => $sl['desc'],
                'fileName'  => $custom_url,
                'updatedAt' => isset($saved[$k]['updatedAt']) ? $saved[$k]['updatedAt'] : null
            );
        }

        return new WP_REST_Response(array(
            'ok'        => true,
            'profileId' => 'director_ahn',
            'name'      => '안정위 대표원장',
            'angles'    => $out_angles
        ), 200);
    }

    private static function detect_no_face_directive_php($raw_text) {
        $compact = preg_replace('/\s+/u', '', (string)$raw_text);
        if ($compact === '') return false;
        return (bool)preg_match('/얼굴미노출|얼굴비노출|얼굴없이|얼굴없는|얼굴안나오|얼굴안보이|얼굴제외|얼굴가리|얼굴크롭|얼굴생략|뒷모습만|손만클로즈업|손클로즈업만|목아래만|어깨아래만|noface|faceless|withoutface/iu', $compact);
    }

    private static function detect_no_background_directive_php($raw_text) {
        $compact = preg_replace('/\s+/u', '', (string)$raw_text);
        if ($compact === '') return false;
        return (bool)preg_match('/배경없이|배경미노출|배경비노출|배경제거|배경생략|배경제외|무배경|단색배경|심플배경|누끼|nobackground|withoutbackground|cleanbackdrop/iu', $compact);
    }

    private static function normalize_user_prompt_directives_php($raw_text) {
        $s = trim((string)$raw_text);
        if ($s === '') return '';
        if (self::detect_no_background_directive_php($s)) {
            $s = preg_replace('/공간에서\s*\(\s*배경\s*없이\s*\)\s*에서/u', '창문이나 배경 가구가 전혀 없는 깔끔한 단색 스튜디오 톤 배경에서', $s);
            $s = preg_replace('/공간에서\s*배경\s*없이\s*에서/u', '창문이나 배경 가구가 전혀 없는 깔끔한 단색 스튜디오 톤 배경에서', $s);
            $s = preg_replace('/\(\s*배경\s*없이\s*\)\s*에서/u', '창문·가구 등 배경 사물이 전혀 없는 깨끗한 단색 아웃포커싱 배경에서', $s);
            $s = preg_replace('/\(\s*배경\s*없이\s*\)/u', '(창문·가구 등 실내 배경 사물 완전 배제, 깔끔한 단색 아웃포커싱 배경)', $s);
        }
        return $s;
    }

    private static function guess_preferred_angle_key($prompt_text) {
        $s = mb_strtolower((string)$prompt_text, 'UTF-8');
        $is_warm = (bool)preg_match('/미소|웃음|눈웃음|따뜻|온화|친절|상담|설명|문진|경청|맞이|인사|브리핑|환자/u', $s);
        if (preg_match('/좌측\s*측면|왼쪽\s*옆모습|왼쪽\s*측면|left\s*profile/u', $s)) return 'leftProfile';
        if (preg_match('/우측\s*측면|오른쪽\s*옆모습|오른쪽\s*측면|측면|옆모습|side\s*profile|right\s*profile/u', $s)) return 'rightProfile';
        if (preg_match('/좌측\s*15|왼쪽\s*15/u', $s) || (preg_match('/좌측|왼쪽|left/u', $s) && $is_warm)) return 'left15Smile';
        if (preg_match('/우측\s*15|오른쪽\s*15/u', $s) || (preg_match('/우측|오른쪽|사선|대각선|초음파|모니터|상담|설명|브리핑/u', $s) && $is_warm)) return 'right15Smile';
        if (preg_match('/좌측|왼쪽|left/u', $s)) return 'left30';
        if (preg_match('/우측|오른쪽|사선|어깨너머|대각선|진맥|맥진/u', $s)) return 'right30';
        if ($is_warm) return 'frontSmile';
        return 'front';
    }

    private static function order_director_slots_for_prompt($prompt_text, $slots) {
        $pref = self::guess_preferred_angle_key($prompt_text);
        $by_key = array();
        foreach ($slots as $sl) {
            $by_key[$sl['key']] = $sl;
        }
        $priority_map = array(
            'front'        => array('front', 'frontSmile', 'right15Smile'),
            'frontSmile'   => array('frontSmile', 'front', 'right15Smile'),
            'left15Smile'  => array('left15Smile', 'frontSmile', 'left30'),
            'right15Smile' => array('right15Smile', 'frontSmile', 'right30'),
            'left30'       => array('left30', 'left15Smile', 'front'),
            'right30'      => array('right30', 'right15Smile', 'front'),
            'leftProfile'  => array('leftProfile', 'left30', 'front'),
            'rightProfile' => array('rightProfile', 'right30', 'front')
        );
        $order_keys = isset($priority_map[$pref]) ? $priority_map[$pref] : $priority_map['frontSmile'];
        $ordered = array();
        foreach ($order_keys as $k) {
            if (isset($by_key[$k])) {
                $ordered[] = $by_key[$k];
            }
        }
        return array_slice($ordered, 0, 3);
    }

    private static function resolve_wp_studio_ref_image($raw_ref) {
        $parts = explode('?', trim((string)$raw_ref));
        $clean = explode('#', $parts[0])[0];
        if ($clean === '' || preg_match('/\.(mp4|webm|mov|svg)$/i', $clean)) {
            return null;
        }

        if (preg_match('/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/i', $clean, $dm)) {
            $mime = str_replace('image/jpg', 'image/jpeg', strtolower($dm[1]));
            $b64  = $dm[2];
            return array(
                'mimeType'  => $mime,
                'base64'    => $b64,
                'dataUri'   => 'data:' . $mime . ';base64,' . $b64,
                'publicUrl' => ''
            );
        }

        $upload_dir = wp_upload_dir();
        $basedir = $upload_dir['basedir'];
        $baseurl = $upload_dir['baseurl'];
        $gh_raw  = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

        if (stripos($clean, $baseurl . '/') === 0) {
            $rel = substr($clean, strlen($baseurl . '/'));
            $disk_path = $basedir . '/' . $rel;
            if (file_exists($disk_path) && is_file($disk_path)) {
                $bin = @file_get_contents($disk_path);
                if ($bin && strlen($bin) > 512) {
                    $mime = preg_match('/\.png$/i', $disk_path) ? 'image/png' : (preg_match('/\.webp$/i', $disk_path) ? 'image/webp' : 'image/jpeg');
                    $b64  = base64_encode($bin);
                    return array(
                        'mimeType'  => $mime,
                        'base64'    => $b64,
                        'dataUri'   => 'data:' . $mime . ';base64,' . $b64,
                        'publicUrl' => $clean
                    );
                }
            }
        }

        if (preg_match('/^https?:\/\//i', $clean)) {
            $res = wp_remote_get($clean, array('timeout' => 25));
            if (!is_wp_error($res) && wp_remote_retrieve_response_code($res) === 200) {
                $bin = wp_remote_retrieve_body($res);
                if ($bin && strlen($bin) > 512) {
                    $mime = preg_match('/\.png$/i', $clean) ? 'image/png' : (preg_match('/\.webp$/i', $clean) ? 'image/webp' : 'image/jpeg');
                    $b64  = base64_encode($bin);
                    return array(
                        'mimeType'  => $mime,
                        'base64'    => $b64,
                        'dataUri'   => 'data:' . $mime . ';base64,' . $b64,
                        'publicUrl' => $clean
                    );
                }
            }
            return null;
        }

        $rel_clean = ltrim($clean, '/');
        $disk_candidates = array(
            $basedir . '/bareun-studio/' . $rel_clean,
            $basedir . '/bareun-studio/' . basename($rel_clean)
        );
        foreach ($disk_candidates as $dp) {
            if (file_exists($dp) && is_file($dp)) {
                $bin = @file_get_contents($dp);
                if ($bin && strlen($bin) > 512) {
                    $mime = preg_match('/\.png$/i', $dp) ? 'image/png' : (preg_match('/\.webp$/i', $dp) ? 'image/webp' : 'image/jpeg');
                    $b64  = base64_encode($bin);
                    $pub  = str_replace($basedir, $baseurl, $dp);
                    return array(
                        'mimeType'  => $mime,
                        'base64'    => $b64,
                        'dataUri'   => 'data:' . $mime . ';base64,' . $b64,
                        'publicUrl' => $pub
                    );
                }
            }
        }

        $gh_url = $gh_raw . str_replace('%2F', '/', rawurlencode($rel_clean));
        $res = wp_remote_get($gh_url, array('timeout' => 25));
        if (!is_wp_error($res) && wp_remote_retrieve_response_code($res) === 200) {
            $bin = wp_remote_retrieve_body($res);
            if ($bin && strlen($bin) > 512) {
                $mime = preg_match('/\.png$/i', $rel_clean) ? 'image/png' : (preg_match('/\.webp$/i', $rel_clean) ? 'image/webp' : 'image/jpeg');
                $b64  = base64_encode($bin);
                return array(
                    'mimeType'  => $mime,
                    'base64'    => $b64,
                    'dataUri'   => 'data:' . $mime . ';base64,' . $b64,
                    'publicUrl' => $gh_url
                );
            }
        }

        return null;
    }

    private static function build_argon_high_prompt_php($user_prompt, $orig_prompt, $has_source_ref, $use_director_face, $no_face_directive, $angle_label, $no_bg_directive = false) {
        $raw_user   = trim((string)$user_prompt);
        $clean_user = self::normalize_user_prompt_directives_php($raw_user);
        $clean_orig = trim((string)$orig_prompt);
        $effective_no_bg = $no_bg_directive || self::detect_no_background_directive_php($raw_user);
        $lines = array();

        if ($has_source_ref) {
            $lines[] = '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 밑그림 참조 부분 수정 촬영]';
            $lines[] = '사용자가 기존 슬롯 이미지를 밑그림으로 참조하기를 선택했습니다. 첫 번째 첨부된 장면 사진의 전체 구도와 조명 밸런스는 참고하되, 아래 [최종 연출 프롬프트]에서 지시한 동작·피사체·배경·소품 변경 사항을 100% 최우선으로 반영하여 초고화질 DSLR 실사 사진으로 촬영해 주세요.';
            if ($clean_orig !== '' && $clean_orig !== $raw_user) {
                $lines[] = '[기존 슬롯 설명 (참고용)]: ' . $clean_orig;
            }
            $lines[] = '[최종 연출 프롬프트 (최우선 반영 필수)]: ' . $clean_user;
        } else {
            $lines[] = '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 사용자 프롬프트 100% 정밀 구현 실사 촬영]';
            $lines[] = '이전 카드 이미지나 정형화된 스톡 구도에 전혀 얽매이지 말고, 오직 아래 [장면 연출 지시] 문장에 적힌 공간·조명·피사체·시점(1인칭/3인칭)·행동만을 100% 있는 그대로 정확하게 구현하세요.';
            $lines[] = '[임의 왜곡 절대 금지]: 사용자가 프롬프트에 직접 적지 않은 전통 한옥 창살(한지 격자 창문), 불필요한 원목 인테리어, 화분, 또는 지시하지 않은 과장된 손가락 가리키기 동작을 임의로 추가하지 마세요.';
            $lines[] = '촬영 스펙: Canon EOS R5, RF 85mm f/1.8L USM 렌즈, 실제 피부 모공과 소재 본연의 질감이 살아있는 무보정 RAW 초고화질 실사 화보.';
            $lines[] = '[장면 연출 지시 (100% 정확히 구현 필수)]: ' . $clean_user;
        }

        if ($effective_no_bg) {
            $lines[] = '[절대 최우선 규칙 — 배경 사물·창문·가구 100% 완전 배제 (NO BACKGROUND / CLEAN STUDIO BACKDROP) 강제]: 사용자가 명시적으로 (배경없이)를 지시했습니다! 배경에 창문, 한옥 격자 창살(창호지 문), 블라인드, 커튼, 화분, 선반, 가구, 벽면 몰딩 등 어떠한 실내 건축 구조물이나 배경 소품도 절대 그리지 마십시오(배경 사물 노출 0%). 오직 프롬프트에서 지시한 조명 톤과 감성 색감만 부드럽게 감도는 매끄러운 무지(단색) 스튜디오 배경 또는 배경 사물이 완전히 사라진 깊은 아웃포커싱(보케)으로 처리하여, 시선이 오직 핵심 피사체(기기·모니터·인물)에만 100% 집중되도록 촬영하세요.';
        }

        if ($no_face_directive) {
            $lines[] = '[절대 최우선 규칙 — 얼굴 미노출(Faceless / Neck-down Crop / Over-the-Shoulder / POV) 100% 준수]: 사용자가 명시적으로 얼굴 미노출을 지시했습니다! 인물의 얼굴, 눈·코·입, 안경, 옆모습, 이마, 턱선, 심지어 모니터나 유리에 비친 반사상까지 어떠한 형태로도 절대 화면에 노출하지 마십시오(얼굴 노출 0%). 반드시 ① 목·어깨 아래 팔·손 동작만 프레임에 담는 크롭 구도, ② 1인칭 시점(POV), 또는 ③ 등 뒤 정후면 어깨너머에서 바라보는 구도로만 촬영하세요.';
        } elseif ($use_director_face) {
            $lines[] = '[안정위 대표원장 실제 인물 100% 동일 얼굴 고정]: 함께 첨부된 인물 참조 사진들(정방향 보정 완료된 안정위 대표원장 실제 포트레이트)은 모두 동일한 한 명의 한국인 남성 한의사입니다. 결과 사진 속 한의사는 반드시 1명만 등장하며, 권장 각도(' . $angle_label . ')에서 첨부된 참조 사진과 얼굴 골격, 눈매, 콧대, 입매, 피부톤, 얇은 금테 안경, 앞머리로 이마를 가리지 않고 단정하게 넘긴 검은 헤어스타일이 100% 동일 인물로 보이도록 정밀하게 촬영하세요.';
            $lines[] = '[복장 및 85mm 인물 렌즈 비례 필수]: 원장님은 반드시 깨끗하고 단정한 순백색 한의사 가운(crisp plain white medical doctor coat)을 착용해야 합니다. 볼이나 하관이 붓거나 넓어 보이는 왜곡 없이 85mm 인물 단렌즈 압축 비율의 날렵하고 단정한 턱선과 자연스럽고 따뜻한 미소를 유지하세요.';
        }

        if (preg_match('/체성분\s*분석기|인바디|inbody|초음파|체열|엑스레이|모니터|태블릿|디스플레이|분석기|측정기|진단기|결과\s*데이터/iu', $raw_user)) {
            $lines[] = '[현대 의료기기 재질 및 디지털 화면 정밀 구현 규칙]: 체성분 분석기(인바디)·초음파·모니터 등 의료기기는 절대로 나무(목재/원목) 재질로 만들지 마십시오! 반드시 실제 현대 메디컬 클리닉의 정밀 디지털 장비(깔끔한 매트 화이트·메탈릭 실버·다크그레이 강화플라스틱/알루미늄 바디와 선명한 고해상도 글래스 LCD 터치스크린 모니터)로 사실적으로 표현하세요.';
        }

        $lines[] = '[인체 해부학 및 손 개수 엄격 제한 규칙 (제3의 손 환각 절대 금지)]: 한 사람의 팔과 손은 반드시 왼손·오른손 최대 2개만 존재해야 하며, 각 손은 해부학적으로 정확한 5개 손가락 비례를 가져야 합니다. 특히 1인칭 시점(POV)이나 체성분 분석기(인바디) 측정 장면에서 환자의 양손이 좌우 전극 손잡이를 잡고 있다면, 화면을 가리키는 제3의 손(여분의 손/팔)을 절대 추가로 그리지 마십시오! (양손으로 좌우 손잡이를 잡은 상태에서는 손가락으로 모니터를 찌르지 않고 양손은 손잡이에만 두고 시선으로 정면 모니터 화면을 바라보는 구도로 촬영하세요.)';

        if (preg_match('/진맥|맥진|요골\s*동맥|손목/u', $raw_user)) {
            $lines[] = '[맥진 인물 분리 필수 규칙]: 진료 책상을 사이에 두고 서로 마주 앉은 두 명의 독립된 인물(한쪽은 일상복 소매의 환자 팔/손목, 반대쪽은 순백색 의사 가운 소매의 한의사 손)로 정확히 분리하여 표현하세요. 손가락 5개 해부학 비례를 정확히 지키세요.';
        }

        $lines[] = '[화질 및 클린 마감 원칙]: 사진 모서리 워터마크, 브랜드 로고, 서명 텍스트를 넣지 마세요(단, 프롬프트에서 모니터 화면 속 결과 데이터 그래프나 사상체질 분류표 등 정보 화면을 지시한 경우에는 모니터 화면 내부 그래픽만 깔끔하고 선명하게 표현하세요). 3D 일러스트 느낌 없이 100% 실제 카메라로 촬영한 RAW 실사 사진이어야 합니다.';

        return implode("
", $lines);
    }

    private static function extract_b64_from_gemini_json($json) {
        if (!is_array($json)) return null;
        if (!empty($json['output_image']['data'])) {
            return base64_decode((string)$json['output_image']['data']);
        }
        if (!empty($json['steps']) && is_array($json['steps'])) {
            for ($i = count($json['steps']) - 1; $i >= 0; $i--) {
                $content = isset($json['steps'][$i]['content']) ? $json['steps'][$i]['content'] : null;
                if (is_array($content)) {
                    for ($j = count($content) - 1; $j >= 0; $j--) {
                        if (!empty($content[$j]['type']) && $content[$j]['type'] === 'image' && !empty($content[$j]['data'])) {
                            return base64_decode((string)$content[$j]['data']);
                        }
                    }
                }
            }
        }
        if (!empty($json['outputs']) && is_array($json['outputs'])) {
            for ($i = count($json['outputs']) - 1; $i >= 0; $i--) {
                if (!empty($json['outputs'][$i]['type']) && $json['outputs'][$i]['type'] === 'image' && !empty($json['outputs'][$i]['data'])) {
                    return base64_decode((string)$json['outputs'][$i]['data']);
                }
            }
        }
        if (!empty($json['candidates'][0]['content']['parts']) && is_array($json['candidates'][0]['content']['parts'])) {
            $parts = $json['candidates'][0]['content']['parts'];
            for ($i = count($parts) - 1; $i >= 0; $i--) {
                $inline = isset($parts[$i]['inlineData']) ? $parts[$i]['inlineData'] : (isset($parts[$i]['inline_data']) ? $parts[$i]['inline_data'] : null);
                if (is_array($inline) && !empty($inline['data'])) {
                    return base64_decode((string)$inline['data']);
                }
            }
        }
        return null;
    }

    private static function call_google_gemini_direct_php($gemini_key, $prompt_text, $ref_images) {
        $models = array(
            array('id' => 'gemini-3-pro-image',     'label' => 'Google Gemini 3 Pro Image (아르곤 하이 정품 2K)', 'size' => true,  'argon' => true),
            array('id' => 'gemini-nano-banana-2.1', 'label' => 'Google Gemini Nano Banana 2.1 (아르곤 하이 2K)',  'size' => true,  'argon' => true),
            array('id' => 'gemini-3.1-flash-image', 'label' => 'Google Gemini 3.1 Flash Image (2K)',              'size' => true,  'argon' => false),
            array('id' => 'gemini-2.5-flash-image', 'label' => 'Google Gemini 2.5 Flash Image',                   'size' => false, 'argon' => false)
        );

        $input_blocks = array();
        $slice_refs = array_slice((array)$ref_images, 0, 5);
        $dir_idx = 0;
        foreach ($slice_refs as $rf) {
            if (!empty($rf['base64'])) {
                $role = isset($rf['role']) ? $rf['role'] : 'ref';
                if ($role === 'source') {
                    $input_blocks[] = array(
                        'type' => 'text',
                        'text' => '[참조 밑그림 이미지: 사용자가 부분 수정을 위해 선택한 현재 슬롯 이미지입니다]'
                    );
                } elseif ($role === 'director') {
                    $dir_idx++;
                    $lbl = !empty($rf['label']) ? $rf['label'] : ('각도 #' . $dir_idx);
                    $input_blocks[] = array(
                        'type' => 'text',
                        'text' => '[참조 인물 사진 #' . $dir_idx . ' — 안정위 대표원장 실제 정방향 얼굴 (' . $lbl . '): 결과 사진 속 한의사의 얼굴 골격·눈매·콧대·금테 안경·이마가 드러나는 단정한 검은 머리 스타일을 이 인물과 100% 동일 인물로 촬영하세요]'
                    );
                }
                $input_blocks[] = array(
                    'type'      => 'image',
                    'mime_type' => !empty($rf['mimeType']) ? $rf['mimeType'] : 'image/jpeg',
                    'data'      => $rf['base64']
                );
            }
        }
        $input_blocks[] = array(
            'type' => 'text',
            'text' => $prompt_text
        );

        foreach ($models as $m) {
            $resp_fmt = $m['size']
                ? array('type' => 'image', 'aspect_ratio' => '16:9', 'image_size' => '2K')
                : array('type' => 'image', 'aspect_ratio' => '16:9');

            $res = wp_remote_post('https://generativelanguage.googleapis.com/v1beta/interactions', array(
                'timeout' => 125,
                'headers' => array(
                    'Content-Type'   => 'application/json',
                    'x-goog-api-key' => $gemini_key,
                    'Api-Revision'   => '2026-05-20'
                ),
                'body' => wp_json_encode(array(
                    'model'           => $m['id'],
                    'input'           => $input_blocks,
                    'response_format' => $resp_fmt
                ))
            ));

            if (!is_wp_error($res)) {
                $http_code = wp_remote_retrieve_response_code($res);
                $body_str  = wp_remote_retrieve_body($res);
                if ($http_code === 200) {
                    $json = json_decode($body_str, true);
                    $bin  = self::extract_b64_from_gemini_json($json);
                    if ($bin && strlen($bin) > 8000) {
                        self::record_studio_ai_usage_php(!empty($m['argon']), $m['id'], false);
                        return array('bin' => $bin, 'engine' => $m['label']);
                    }
                } elseif ($http_code === 429 && $m['id'] === 'gemini-3-pro-image') {
                    if (stripos($body_str, 'spending cap') !== false) {
                        self::record_studio_ai_usage_php(false, 'Google AI Studio 월간 한도(Spend Cap) 도달', true);
                    } elseif (stripos($body_str, 'quota') !== false || stripos($body_str, 'RESOURCE_EXHAUSTED') !== false) {
                        self::record_studio_ai_usage_php(false, $m['id'] . ' 일일 한도 초과', true);
                    }
                }
            }
        }
        return null;
    }

    private static function call_fal_nano_banana_pro_php($fal_key, $prompt_text, $ref_images, $has_source_ref, $seed) {
        $img_urls = array();
        $slice_refs = array_slice((array)$ref_images, 0, 5);
        foreach ($slice_refs as $rf) {
            if (!empty($rf['publicUrl']) && preg_match('/^https:\/\//i', $rf['publicUrl'])) {
                $img_urls[] = $rf['publicUrl'];
            } elseif (!empty($rf['dataUri'])) {
                $img_urls[] = $rf['dataUri'];
            }
        }

        $is_edit = (count($img_urls) > 0);
        $endpoints = $is_edit
            ? array(
                array('path' => 'fal-ai/nano-banana-pro/edit', 'label' => '아르곤 하이 정품 (Gemini 3 Pro Image · 2K 에디팅)'),
                array('path' => 'google/nano-banana-2.1/edit', 'label' => '아르곤 하이 정품 (Gemini Nano Banana 2.1 · 2K 에디팅)')
            )
            : array(
                array('path' => 'fal-ai/nano-banana-pro', 'label' => '아르곤 하이 정품 (Gemini 3 Pro Image · 2K 실사 촬영)'),
                array('path' => 'google/nano-banana-2.1', 'label' => '아르곤 하이 정품 (Gemini Nano Banana 2.1 · 2K 실사 촬영)')
            );

        foreach ($endpoints as $ep) {
            $payload = array(
                'prompt'        => $prompt_text,
                'resolution'    => '2K',
                'aspect_ratio'  => $has_source_ref ? 'auto' : '16:9',
                'output_format' => 'jpeg',
                'seed'          => (int)($seed % 2147483647)
            );
            if ($is_edit) {
                $payload['image_urls'] = $img_urls;
            }

            $res = wp_remote_post('https://fal.run/' . $ep['path'], array(
                'timeout' => 130,
                'headers' => array(
                    'Authorization' => 'Key ' . $fal_key,
                    'Content-Type'  => 'application/json'
                ),
                'body' => wp_json_encode($payload)
            ));

            if (!is_wp_error($res) && wp_remote_retrieve_response_code($res) === 200) {
                $json = json_decode(wp_remote_retrieve_body($res), true);
                $out_url = '';
                if (!empty($json['images'][0]['url'])) {
                    $out_url = (string)$json['images'][0]['url'];
                } elseif (!empty($json['image']['url'])) {
                    $out_url = (string)$json['image']['url'];
                }
                if ($out_url !== '') {
                    $dl = wp_remote_get($out_url, array('timeout' => 55));
                    if (!is_wp_error($dl) && wp_remote_retrieve_response_code($dl) === 200) {
                        $bin = wp_remote_retrieve_body($dl);
                        if ($bin && strlen($bin) > 8000) {
                            self::record_studio_ai_usage_php(true, $ep['path'], false);
                            return array('bin' => $bin, 'engine' => $ep['label']);
                        }
                    }
                }
            }
        }

        return null;
    }

    private static function translate_ko_medical_prompt_server($raw_prompt, $use_director_face, $no_face_directive = false, $no_bg_directive = false) {
        $effective_no_bg = $no_bg_directive || self::detect_no_background_directive_php($raw_prompt);
        $text = self::normalize_user_prompt_directives_php($raw_prompt);

        // Short inline glossary replacements (no periods/parentheses so sentence translation stays 100% intact)
        $inline_glossary = array(
            '/체성분\s*(?:분석기|검사기|측정기)|인바디/u' => 'sleek modern digital clinical body composition analyzer machine',
            '/2\s*[,·ㆍ\/\.\-]?\s*3\s*[,·ㆍ\/\.\-]?\s*4\s*지(?:\s*손가락)?|검지\s*[,·ㆍ]?\s*중지\s*[,·ㆍ]?\s*약지/u' => 'index middle and ring fingers placed gently side-by-side',
            '/요골\s*동맥/u' => 'inner wrist radial artery pulse point',
            '/진맥\s*쿠션|맥진\s*쿠션/u' => 'ivory silk wrist pulse cushion',
            '/진맥|맥진/u' => 'traditional Korean medicine wrist radial pulse diagnosis',
            '/복진/u' => 'clinical abdominal palpation on an examination bed',
            '/추나\s*요법|수기\s*추나|추나/u' => 'hands-on Chuna spinal and pelvic manual therapy',
            '/약침/u' => 'sterile herbal pharmacopuncture therapy',
            '/탕전실/u' => 'clean glass-walled clinic herbal decoction lab',
            '/황제\s*공진단|공진단/u' => '24K gold-leaf wrapped Gongjindan herbal pills in a walnut wooden box',
            '/녹용\s*분골|러시아\s*녹용|녹용/u' => 'top-grade sliced velvet deer antler tips',
            '/초음파\s*진단기|초음파\s*모니터|초음파/u' => 'medical ultrasound probe and live grayscale ultrasound monitor',
            '/체열\s*진단기|적외선\s*체열/u' => 'medical infrared thermography body heat-map monitor'
        );
        foreach ($inline_glossary as $pat => $rep) {
            $text = preg_replace($pat, ' ' . $rep . ' ', $text);
        }

        $translated = $text;
        if (preg_match('/[가-힣]/u', $text)) {
            $ua_headers = array(
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
            );

            // 1) Reliable Google Chrome Dict endpoint
            $c5_url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=ko&tl=en&q=' . rawurlencode($text);
            $c5_res = wp_remote_get($c5_url, array('timeout' => 8, 'headers' => $ua_headers));
            if (!is_wp_error($c5_res) && wp_remote_retrieve_response_code($c5_res) === 200) {
                $c5_arr = json_decode(wp_remote_retrieve_body($c5_res), true);
                if (is_array($c5_arr)) {
                    $c5_chunks = array();
                    foreach ($c5_arr as $item) {
                        if (is_string($item)) {
                            $c5_chunks[] = $item;
                        } elseif (is_array($item) && isset($item[0]) && is_string($item[0])) {
                            $c5_chunks[] = $item[0];
                        }
                    }
                    $c5_joined = trim(implode(' ', $c5_chunks));
                    if ($c5_joined !== '') {
                        $translated = $c5_joined;
                    }
                }
            }

            // 2) Fallback: MyMemory API
            if (preg_match('/[가-힣]/u', $translated)) {
                $mm_url = 'https://api.mymemory.translated.net/get?q=' . rawurlencode($text) . '&langpair=ko|en';
                $mm_res = wp_remote_get($mm_url, array('timeout' => 8, 'headers' => $ua_headers));
                if (!is_wp_error($mm_res) && wp_remote_retrieve_response_code($mm_res) === 200) {
                    $mm_json = json_decode(wp_remote_retrieve_body($mm_res), true);
                    if (!empty($mm_json['responseData']['translatedText']) && stripos($mm_json['responseData']['translatedText'], 'MYMEMORY WARNING') === false) {
                        $translated = trim((string)$mm_json['responseData']['translatedText']);
                    }
                }
            }

            // 3) Fallback: GTX endpoint
            if (preg_match('/[가-힣]/u', $translated)) {
                $g_url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=' . rawurlencode($text);
                $g_res = wp_remote_get($g_url, array('timeout' => 8, 'headers' => $ua_headers));
                if (!is_wp_error($g_res) && wp_remote_retrieve_response_code($g_res) === 200) {
                    $arr = json_decode(wp_remote_retrieve_body($g_res), true);
                    if (is_array($arr) && !empty($arr[0]) && is_array($arr[0])) {
                        $chunks = array();
                        foreach ($arr[0] as $seg) {
                            if (is_array($seg) && isset($seg[0])) {
                                $chunks[] = (string)$seg[0];
                            }
                        }
                        $joined = trim(implode('', $chunks));
                        if ($joined !== '') $translated = $joined;
                    }
                }
            }
        }

        $extra_guards = array();
        if (preg_match('/1\s*인칭\s*시점/u', $raw_prompt)) {
            $extra_guards[] = 'first-person POV camera angle looking down from the standing patient perspective at the clinical LCD display while the patient two hands grip the left and right metallic side handle electrodes, strictly ZERO face visible in frame, strictly NO extra third hand pointing';
        }
        if (preg_match('/체성분\s*(?:분석기|검사기|측정기)|인바디/u', $raw_prompt)) {
            $extra_guards[] = 'modern sleek white-and-silver metallic unbranded digital body composition analyzer machine with a sharp clinical LCD screen displaying clear body fat reduction downward trend chart and muscle mass increase upward bar graph, strictly modern medical equipment with NO wood material';
        }

        $faceless_lead = $no_face_directive
            ? 'strictly faceless neck-down crop or first-person POV or over-the-shoulder shot from behind so ZERO face, head, or side profile is visible in frame'
            : '';

        $no_bg_lead = $effective_no_bg
            ? 'strictly clean solid-color out-of-focus studio backdrop with ZERO background windows, ZERO wooden lattice frames, ZERO plants, and ZERO background furniture'
            : '';

        $director_lead = (!$no_face_directive && $use_director_face)
            ? 'Korean male medical director in his early 40s with neat swept-back short black hair revealing a clean open forehead, slim sharp masculine jawline, warm gentle eye-smile expression, wearing thin gold-rimmed rectangular glasses and a plain crisp white medical coat'
            : '';

        $parts = array_filter(array(
            'Authentic raw candid editorial photograph captured on Canon EOS R5 with RF 85mm f/1.8L USM lens',
            $faceless_lead,
            $no_bg_lead,
            $director_lead,
            $translated,
            implode(', ', $extra_guards),
            'ultra-realistic skin pores and natural fabric weave, accurate 5-finger hand anatomy (strictly maximum 2 hands per person, NO extra third hand), shallow depth of field, zero CGI, strictly NO watermarks'
        ));

        return implode(', ', $parts);
    }

    private static function call_hf_gradio_flux($space_base, $payload_data, $timeout_sec = 90) {
        $call_res = wp_remote_post($space_base . '/gradio_api/call/infer', array(
            'timeout' => 25,
            'headers' => array('Content-Type' => 'application/json'),
            'body'    => wp_json_encode(array('data' => $payload_data))
        ));
        if (is_wp_error($call_res) || wp_remote_retrieve_response_code($call_res) !== 200) {
            return null;
        }
        $call_json = json_decode(wp_remote_retrieve_body($call_res), true);
        if (empty($call_json['event_id'])) {
            return null;
        }
        $sse_res = wp_remote_get($space_base . '/gradio_api/call/infer/' . rawurlencode($call_json['event_id']), array(
            'timeout' => $timeout_sec
        ));
        if (is_wp_error($sse_res) || wp_remote_retrieve_response_code($sse_res) !== 200) {
            return null;
        }
        $sse_body = wp_remote_retrieve_body($sse_res);
        $lines = preg_split('/\r?\n/', (string)$sse_body);
        $last_event = '';
        foreach ($lines as $ln) {
            if (strpos($ln, 'event:') === 0) {
                $last_event = trim(substr($ln, 6));
            } elseif (strpos($ln, 'data:') === 0 && $last_event === 'complete') {
                $json_str = trim(substr($ln, 5));
                $arr = json_decode($json_str, true);
                if (is_array($arr) && !empty($arr[0]['url'])) {
                    return (string)$arr[0]['url'];
                }
            }
        }
        return null;
    }

    public static function rest_generate_ai_image($request) {
        @set_time_limit(180);
        $params = $request->get_json_params();
        if (!is_array($params)) $params = array();

        $user_prompt = trim((string)($params['userPrompt'] ?? $params['prompt'] ?? ''));
        if ($user_prompt === '') {
            return new WP_REST_Response(array('ok' => false, 'error' => '생성할 이미지 프롬프트를 입력해 주세요.'), 400);
        }

        $orig_prompt          = trim((string)($params['originalCardPrompt'] ?? ''));
        $source_image         = trim((string)($params['sourceImage'] ?? ''));
        $use_source_image_ref = !empty($params['useSourceImageRef']); // Default FALSE: never copy old image unless explicitly checked!
        $no_face_directive    = self::detect_no_face_directive_php($user_prompt);
        $no_bg_directive      = self::detect_no_background_directive_php($user_prompt);
        $use_director_face    = $no_face_directive ? false : !empty($params['useDirectorFace']);

        $width      = isset($params['width']) ? max(512, min(1536, (int)(round(((int)$params['width']) / 32) * 32))) : 1280;
        $height     = isset($params['height']) ? max(512, min(1536, (int)(round(((int)$params['height']) / 32) * 32))) : 800;
        $seed       = isset($params['seed']) ? max(1, (int)$params['seed']) : wp_rand(10000000, 99999999);
        $raw_prefix = isset($params['filePrefix']) ? (string)$params['filePrefix'] : 'clinic';
        $raw_prefix = preg_replace('/^bareun_im_/i', '', $raw_prefix);
        $prefix     = preg_replace('/[^a-zA-Z0-9_-]/', '_', $raw_prefix);
        if ($prefix === '') $prefix = 'clinic';

        $bin = null;
        $engine_used = '';

        // 1) Argon High Native Engine (Google Gemini 3 Pro Image 2K / Nano Banana Pro 2K)
        $ai_keys = self::get_raw_ai_keys();
        if ($ai_keys['geminiKey'] !== '' || $ai_keys['falKey'] !== '') {
            $ref_images = array();
            $has_source_ref = false;

            if ($use_source_image_ref && $source_image !== '') {
                $src_ref = self::resolve_wp_studio_ref_image($source_image);
                if ($src_ref) {
                    $src_ref['role'] = 'source';
                    $src_ref['label'] = '기존 슬롯 밑그림';
                    $ref_images[] = $src_ref;
                    $has_source_ref = true;
                }
            }

            $preferred_angle_label = '정면 (0°)';

            if ($use_director_face && !$no_face_directive) {
                $slots = self::get_default_angle_slots();
                $saved_angles = get_option(self::OPT_ANGLE_SAMPLES, array());
                if (!is_array($saved_angles)) $saved_angles = array();

                $upload_dir = wp_upload_dir();
                $studio_angle_dir = $upload_dir['basedir'] . '/bareun-studio/director-angle-refs';
                $studio_angle_url = $upload_dir['baseurl'] . '/bareun-studio/director-angle-refs';
                $gh_angle_base    = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/director-angle-refs';

                $ordered_slots = self::order_director_slots_for_prompt($user_prompt, $slots);
                if (!empty($ordered_slots[0]['label'])) {
                    $preferred_angle_label = $ordered_slots[0]['label'];
                }

                foreach ($ordered_slots as $sl) {
                    $k = $sl['key'];
                    $default_ref = file_exists($studio_angle_dir . '/' . $sl['file'])
                        ? ($studio_angle_url . '/' . $sl['file'])
                        : ($gh_angle_base . '/' . $sl['file']);
                    $slot_url = !empty($saved_angles[$k]['fileName']) ? $saved_angles[$k]['fileName'] : $default_ref;
                    $ang_ref = self::resolve_wp_studio_ref_image($slot_url);
                    if ($ang_ref) {
                        $ang_ref['role'] = 'director';
                        $ang_ref['label'] = $sl['label'];
                        $ref_images[] = $ang_ref;
                    }
                }
            }

            $argon_prompt = self::build_argon_high_prompt_php(
                $user_prompt,
                $orig_prompt,
                $has_source_ref,
                $use_director_face,
                $no_face_directive,
                $preferred_angle_label,
                $no_bg_directive
            );

            $mode_suffix = $no_face_directive
                ? ' · 얼굴미노출 엄격 보호(0%)'
                : ($use_director_face ? ' + 정방향 원장님 다각도 인물 고정' : ' · 새 구도 독립 촬영');
            if ($no_bg_directive) {
                $mode_suffix .= ' · 배경배제(0%)';
            }

            if ($ai_keys['geminiKey'] !== '') {
                $g_out = self::call_google_gemini_direct_php($ai_keys['geminiKey'], $argon_prompt, $ref_images);
                if (is_array($g_out) && !empty($g_out['bin'])) {
                    $bin = $g_out['bin'];
                    $engine_used = $g_out['engine'] . $mode_suffix;
                }
            }

            if (!$bin && $ai_keys['falKey'] !== '') {
                $f_out = self::call_fal_nano_banana_pro_php($ai_keys['falKey'], $argon_prompt, $ref_images, $has_source_ref, $seed);
                if (is_array($f_out) && !empty($f_out['bin'])) {
                    $bin = $f_out['bin'];
                    $engine_used = $f_out['engine'] . $mode_suffix;
                }
            }
        }

        // 2) Fallback: Server-Translated Watermark-Free FLUX.1-dev -> FLUX.1-schnell
        if (!$bin) {
            $en_prompt = self::translate_ko_medical_prompt_server($user_prompt, $use_director_face, $no_face_directive, $no_bg_directive);
            $out_img_url = self::call_hf_gradio_flux(
                'https://black-forest-labs-flux-1-dev.hf.space',
                array($en_prompt, $seed % 2147483647, false, $width, $height, 3.5, 28),
                90
            );
            $engine_used = 'FLUX.1-dev (28-Step DSLR 실사)';

            if (!$out_img_url) {
                $out_img_url = self::call_hf_gradio_flux(
                    'https://black-forest-labs-flux-1-schnell.hf.space',
                    array($en_prompt, $seed % 2147483647, false, $width, $height, 4),
                    45
                );
                $engine_used = 'FLUX.1-schnell (고해상도 클린 실사)';
            }

            if (!$out_img_url) {
                return new WP_REST_Response(array(
                    'ok'    => false,
                    'usage' => self::get_studio_ai_usage_php(),
                    'error' => 'AI 이미지 엔진 연결 지연 — 잠시 후 다시 시도해 주세요.'
                ), 500);
            }

            $response = wp_remote_get($out_img_url, array(
                'timeout' => 50,
                'headers' => array(
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BareunStudio/4.0'
                )
            ));

            if (is_wp_error($response)) {
                return new WP_REST_Response(array('ok' => false, 'error' => '생성된 이미지 다운로드 실패: ' . $response->get_error_message()), 500);
            }

            $code = wp_remote_retrieve_response_code($response);
            $dl_bin = wp_remote_retrieve_body($response);
            if ($code !== 200 || strlen($dl_bin) < 4000) {
                return new WP_REST_Response(array('ok' => false, 'error' => '생성된 이미지 데이터 수신 오류 (HTTP ' . $code . ')'), 500);
            }
            $bin = $dl_bin;
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $unique_name = 'bareun_im_' . substr($prefix, 0, 20) . '_' . time() . '_' . wp_rand(100, 999) . '.jpg';
        $upload = wp_upload_bits($unique_name, null, $bin);
        if (!empty($upload['error'])) {
            return new WP_REST_Response(array('ok' => false, 'error' => $upload['error']), 500);
        }

        $attachment = array(
            'guid'           => $upload['url'],
            'post_mime_type' => 'image/jpeg',
            'post_title'     => preg_replace('/\.[^.]+$/', '', $unique_name),
            'post_content'   => $user_prompt,
            'post_status'    => 'inherit'
        );
        $attach_id = wp_insert_attachment($attachment, $upload['file']);
        if ($attach_id && function_exists('wp_generate_attachment_metadata')) {
            $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
            wp_update_attachment_metadata($attach_id, $attach_data);
        }

        return new WP_REST_Response(array(
            'ok'              => true,
            'fileName'        => $unique_name,
            'url'             => $upload['url'],
            'seed'            => $seed,
            'engine'          => $engine_used,
            'noFaceDirective' => $no_face_directive,
            'usage'           => self::get_studio_ai_usage_php(),
            'message'         => '[' . $engine_used . '] 최상급 실사 이미지 생성 및 실서버 등록 완료!'
        ), 200);
    }

    /**
     * Internal 16:9 editorial image generator for 2-day automated Health Note 3-slot publishing.
     * Uses Argon High (Google Gemini 3 Pro Image -> Nano Banana Pro) with FLUX fallback and uploads to WP Media Library.
     */
    public static function generate_hn_slot_image_internal($user_prompt, $prefix = 'hn_auto', $fallback_api_key = '') {
        $user_prompt = trim((string)$user_prompt);
        if ($user_prompt === '') {
            return '';
        }
        $prefix = preg_replace('/[^a-zA-Z0-9_-]/', '_', (string)$prefix);
        if ($prefix === '') {
            $prefix = 'hn_auto';
        }
        $seed = wp_rand(10000000, 99999999);
        $bin  = null;

        $ai_keys = self::get_raw_ai_keys();
        if ($ai_keys['geminiKey'] === '' && $fallback_api_key !== '') {
            $ai_keys['geminiKey'] = trim((string)$fallback_api_key);
        }

        $argon_prompt = self::build_argon_high_prompt_php(
            $user_prompt . ' (16:9 가로 와이드 구도, 이미지 내 글자·숫자·로고·워터마크 0% 완전 배제, 따뜻한 캐시미어 아이보리 #FAF8F3 및 샴페인 골드 #C5A059 자연광 하이엔드 메디컬 에디토리얼 톤)',
            '',
            false,
            false,
            true,
            '정면 (0°)',
            false
        );

        if ($ai_keys['geminiKey'] !== '') {
            $g_out = self::call_google_gemini_direct_php($ai_keys['geminiKey'], $argon_prompt, array());
            if (is_array($g_out) && !empty($g_out['bin'])) {
                $bin = $g_out['bin'];
            }
        }
        if (!$bin && $ai_keys['falKey'] !== '') {
            $f_out = self::call_fal_nano_banana_pro_php($ai_keys['falKey'], $argon_prompt, array(), false, $seed);
            if (is_array($f_out) && !empty($f_out['bin'])) {
                $bin = $f_out['bin'];
            }
        }
        if (!$bin) {
            $en_prompt = self::translate_ko_medical_prompt_server($user_prompt, false, true, false);
            $out_img_url = self::call_hf_gradio_flux(
                'https://black-forest-labs-flux-1-schnell.hf.space',
                array($en_prompt, $seed % 2147483647, false, 1344, 768, 4),
                40
            );
            if ($out_img_url) {
                $response = wp_remote_get($out_img_url, array(
                    'timeout' => 40,
                    'headers' => array('User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BareunStudio/4.0')
                ));
                if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
                    $dl_bin = wp_remote_retrieve_body($response);
                    if (strlen($dl_bin) >= 4000) {
                        $bin = $dl_bin;
                    }
                }
            }
        }

        if (!$bin) {
            return '';
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $unique_name = 'bareun_hn_' . substr($prefix, 0, 28) . '_' . time() . '_' . wp_rand(100, 999) . '.jpg';
        $upload = wp_upload_bits($unique_name, null, $bin);
        if (!empty($upload['error']) || empty($upload['url'])) {
            return '';
        }

        $attachment = array(
            'guid'           => $upload['url'],
            'post_mime_type' => 'image/jpeg',
            'post_title'     => preg_replace('/\.[^.]+$/', '', $unique_name),
            'post_content'   => $user_prompt,
            'post_status'    => 'inherit'
        );
        $attach_id = wp_insert_attachment($attachment, $upload['file']);
        if ($attach_id && function_exists('wp_generate_attachment_metadata')) {
            $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
            wp_update_attachment_metadata($attach_id, $attach_data);
        }

        return (string)$upload['url'];
    }

    public static function rest_sync_studio_assets($request) {
        $params = $request->get_json_params();
        if (!is_array($params)) {
            return new WP_REST_Response(array('ok' => false, 'error' => '데이터가 없습니다.'), 400);
        }

        $upload_dir = wp_upload_dir();
        $target_dir = $upload_dir['basedir'] . '/bareun-studio';
        wp_mkdir_p($target_dir);

        if (!empty($params['resetAngleSamples'])) {
            delete_option(self::OPT_ANGLE_SAMPLES);
        }

        if (!empty($params['studioHtml'])) {
            file_put_contents($target_dir . '/detail-pages-editor.html', (string)$params['studioHtml']);
        }
        if (!empty($params['compilerJs'])) {
            file_put_contents($target_dir . '/bareun-detail-compiler.js', (string)$params['compilerJs']);
        }
        if (!empty($params['cardPromptsJs'])) {
            file_put_contents($target_dir . '/card-image-prompts.js', (string)$params['cardPromptsJs']);
        }
        if (!empty($params['angleRefs']) && is_array($params['angleRefs'])) {
            $angle_dir = $target_dir . '/director-angle-refs';
            wp_mkdir_p($angle_dir);
            foreach ($params['angleRefs'] as $fname => $b64) {
                $safe_f = sanitize_file_name((string)$fname);
                $decoded = base64_decode((string)$b64);
                if ($safe_f && $decoded !== false && strlen($decoded) > 512) {
                    file_put_contents($angle_dir . '/' . $safe_f, $decoded);
                }
            }
        }
        if (!empty($params['studioAiKeys']) && is_array($params['studioAiKeys'])) {
            $saved_keys = self::get_raw_ai_keys();
            if (!empty($params['studioAiKeys']['geminiKey'])) {
                $saved_keys['geminiKey'] = trim((string)$params['studioAiKeys']['geminiKey']);
            }
            if (!empty($params['studioAiKeys']['falKey'])) {
                $saved_keys['falKey'] = trim((string)$params['studioAiKeys']['falKey']);
            }
            update_option(self::OPT_STUDIO_AI_KEYS, $saved_keys, false);
        }
        if (!empty($params['config']) && is_array($params['config'])) {
            update_option(self::OPT_DETAIL_CFG, $params['config']);
            file_put_contents($target_dir . '/detail-pages-config.json', json_encode($params['config'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        }
        if (!empty($params['healthNotesConfig']) && is_array($params['healthNotesConfig']) && isset($params['healthNotesConfig']['notes'])) {
            update_option(self::OPT_HEALTH_NOTES_CFG, $params['healthNotesConfig'], false);
            file_put_contents($target_dir . '/health-notes-custom-config.json', json_encode($params['healthNotesConfig'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        }
        if (!empty($params['healthNotesDefaultConfig']) && is_array($params['healthNotesDefaultConfig']) && isset($params['healthNotesDefaultConfig']['notes'])) {
            file_put_contents($target_dir . '/health-notes-custom-config.default.json', json_encode($params['healthNotesDefaultConfig'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        }
        if (!empty($params['clinicGlobalInfo']) && is_array($params['clinicGlobalInfo']) && !empty($params['clinicGlobalInfo']['clinicName'])) {
            update_option(self::OPT_CLINIC_INFO, $params['clinicGlobalInfo'], false);
            file_put_contents($target_dir . '/clinic-global-info.json', json_encode($params['clinicGlobalInfo'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        }

        if (!empty($params['pluginPhp'])) {
            $installed_plugin_file = WP_PLUGIN_DIR . '/bareun-member-private-qna/bareun-member-private-qna.php';
            if (file_exists($installed_plugin_file) && is_writable($installed_plugin_file)) {
                @file_put_contents($installed_plugin_file, (string)$params['pluginPhp']);
            }
        }

        return new WP_REST_Response(array(
            'ok'         => true,
            'version'    => 'v4-argon-high-complete',
            'aiKeyState' => self::build_ai_key_status_payload(),
            'usage'      => self::get_studio_ai_usage_php(),
            'message'    => '실서버 스튜디오 V4 (얼굴미노출 가드 · 정방향 인물 고정 · 홈 스토리 · 무료 잔여량 측정) 에셋 동기화 성공!'
        ), 200);
    }

    public static function rest_ensure_assets_from_github($request) {
        $upload_dir = wp_upload_dir();
        $target_dir = $upload_dir['basedir'] . '/bareun-studio';
        wp_mkdir_p($target_dir);

        $gh_raw = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';
        $files = array(
            'detail-pages-editor.html',
            'bareun-detail-compiler.js',
            'card-image-prompts.js',
            'detail-pages-config.json',
            'clinic-global-info.json'
        );

        $downloaded = array();
        foreach ($files as $f) {
            $dest = $target_dir . '/' . $f;
            if (!file_exists($dest)) {
                $response = wp_remote_get($gh_raw . $f, array('timeout' => 20));
                if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
                    file_put_contents($dest, wp_remote_retrieve_body($response));
                    $downloaded[] = $f;
                }
            }
        }

        $angle_dir = $target_dir . '/director-angle-refs';
        wp_mkdir_p($angle_dir);
        $angle_files = array(
            'angle_front.jpg',
            'angle_front_smile.jpg',
            'angle_left15_smile.jpg',
            'angle_right15_smile.jpg',
            'angle_left30.jpg',
            'angle_right30.jpg',
            'angle_left_profile.jpg',
            'angle_right_profile.jpg'
        );
        foreach ($angle_files as $af) {
            $dest = $angle_dir . '/' . $af;
            if (!file_exists($dest)) {
                $response = wp_remote_get($gh_raw . 'director-angle-refs/' . $af, array('timeout' => 20));
                if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
                    file_put_contents($dest, wp_remote_retrieve_body($response));
                    $downloaded[] = 'director-angle-refs/' . $af;
                }
            }
        }

        return new WP_REST_Response(array(
            'ok'         => true,
            'downloaded' => $downloaded
        ), 200);
    }
}
Bareun_Custom_Studio_Engine_V4::init();
endif;

