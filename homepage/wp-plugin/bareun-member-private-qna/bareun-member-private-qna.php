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

class Bareun_Member_Private_QnA_Plugin {
    const TABLE_SLUG = 'bareun_private_qna';
    const OPT_SEEDED = 'bareun_private_qna_seeded_v1';
    const OPT_OAUTH  = 'bareun_social_oauth_config_v1';

    public static function init() {
        add_action('init', array(__CLASS__, 'maybe_ensure_schema'));
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
    }

    public static function table_name() {
        global $wpdb;
        return $wpdb->prefix . self::TABLE_SLUG;
    }

    public static function maybe_ensure_schema() {
        if (get_option(self::OPT_SEEDED) === '1') {
            return;
        }
        global $wpdb;
        $table = self::table_name();
        $charset_collate = $wpdb->get_charset_collate();

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
            status VARCHAR(20) NOT NULL DEFAULT 'waiting',
            master_reply LONGTEXT NULL,
            client_ip VARCHAR(64) NOT NULL DEFAULT '',
            created_at DATETIME NOT NULL,
            replied_at DATETIME NULL,
            PRIMARY KEY (id),
            KEY idx_part_id (part_id),
            KEY idx_user_id (user_id),
            KEY idx_status (status)
        ) {$charset_collate};";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);

        $count = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table}");
        if ($count === 0) {
            self::seed_initial_private_records();
        }
        update_option(self::OPT_SEEDED, '1');
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

    public static function handle_get_qna(\WP_REST_Request $request) {
        self::send_nocache();
        self::maybe_ensure_schema();
        global $wpdb;
        $table = self::table_name();
        $actor = self::get_current_actor($request);
        $is_master = $actor && !empty($actor['isMaster']);
        $actor_id  = $actor ? (int) $actor['id'] : 0;

        $part = sanitize_key($request->get_param('part') ?? 'all');
        if ($part && $part !== 'all') {
            $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$table} WHERE part_id = %s ORDER BY id DESC LIMIT 200", $part), ARRAY_A);
        } else {
            $rows = $wpdb->get_results("SELECT * FROM {$table} ORDER BY id DESC LIMIT 300", ARRAY_A);
        }

        $items = array();
        foreach ((array) $rows as $r) {
            $owner_id = (int) $r['user_id'];
            $is_mine  = ($actor_id > 0 && $owner_id === $actor_id);
            $can_read = $is_master || $is_mine;

            $entry = array(
                'id'           => (int) $r['id'],
                'partId'       => $r['part_id'],
                'maskedAuthor' => self::mask_name($r['member_name']),
                'provider'     => $r['social_provider'],
                'status'       => $r['status'],
                'createdAt'    => substr($r['created_at'], 0, 16),
                'repliedAt'    => $r['replied_at'] ? substr($r['replied_at'], 0, 16) : null,
                'isPrivate'    => true,
                'isMine'       => $is_mine,
                'canRead'      => $can_read
            );

            if ($can_read) {
                $entry['title']           = $r['title'];
                $entry['content']         = $r['content'];
                $entry['symptomDuration'] = $r['symptom_duration'];
                $entry['masterReply']     = $r['master_reply'];
            } else {
                $entry['title'] = '🔒 비공개 건강 상담 질문입니다 (작성자 본인 · 마스터 전용)';
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
                    'createdAt'       => $r['created_at']
                );
            }
            $items[] = $entry;
        }

        return new \WP_REST_Response(array(
            'ok'       => true,
            'isMaster' => $is_master,
            'items'    => $items
        ), 200);
    }

    public static function handle_create_qna(\WP_REST_Request $request) {
        self::send_nocache();
        self::maybe_ensure_schema();
        $actor = self::get_current_actor($request);
        if (!$actor) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '회원가입 및 로그인 후 질문을 작성하실 수 있습니다.'), 401);
        }

        $params   = $request->get_json_params();
        $part_id  = sanitize_key($params['partId'] ?? 'lumbar');
        $title    = sanitize_text_field($params['title'] ?? '');
        $content  = sanitize_textarea_field($params['content'] ?? '');
        $duration = sanitize_text_field($params['symptomDuration'] ?? '1~6개월');
        $phone    = sanitize_text_field($params['phone'] ?? $actor['phone']);
        $age_grp  = sanitize_text_field($params['ageGroup'] ?? $actor['ageGroup']);
        $gender   = sanitize_text_field($params['gender'] ?? $actor['gender']);

        if (empty($title) || empty($content)) {
            return new \WP_REST_Response(array('ok' => false, 'message' => '질문 제목과 상세 증상 내용을 모두 입력해 주세요.'), 400);
        }

        if ($phone !== '') update_user_meta($actor['id'], 'bareun_phone', $phone);
        if ($age_grp !== '') update_user_meta($actor['id'], 'bareun_age_group', $age_grp);
        if ($gender !== '') update_user_meta($actor['id'], 'bareun_gender', $gender);

        global $wpdb;
        $table = self::table_name();
        $now   = current_time('mysql');

        $wpdb->insert($table, array(
            'part_id'          => $part_id,
            'user_id'          => (int) $actor['id'],
            'member_name'      => $actor['name'],
            'member_email'     => $actor['email'],
            'member_phone'     => $phone,
            'social_provider'  => $actor['provider'],
            'gender'           => $gender,
            'age_group'        => $age_grp,
            'symptom_duration' => $duration,
            'title'            => $title,
            'content'          => $content,
            'status'           => 'waiting',
            'master_reply'     => '',
            'client_ip'        => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
            'created_at'       => $now,
            'replied_at'       => null
        ));

        return new \WP_REST_Response(array(
            'ok'      => true,
            'id'      => (int) $wpdb->insert_id,
            'message' => '비공개 질문이 안전하게 등록되었습니다.'
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
        $wpdb->update(
            $table,
            array(
                'master_reply' => $reply,
                'status'       => $status,
                'replied_at'   => trim($reply) !== '' ? current_time('mysql') : null
            ),
            array('id' => $id)
        );

        return new \WP_REST_Response(array('ok' => true, 'status' => $status), 200);
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
}

Bareun_Member_Private_QnA_Plugin::init();
