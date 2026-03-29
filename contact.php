<?php
header('Content-Type: application/json; charset=UTF-8');

/* ── Only accept POST ──────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

/* ── Sanitize & validate inputs ────────────────────── */
$name    = preg_replace('/[\r\n\t]/', ' ', strip_tags(trim($_POST['name'] ?? '')));
$email   = filter_var(trim($_POST['email']   ?? ''), FILTER_VALIDATE_EMAIL);
$subject = strip_tags(trim($_POST['subject'] ?? 'No subject'));
$message = strip_tags(trim($_POST['message'] ?? ''));

if (!$name || !$email || !$message) {
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required.']);
    exit;
}

/* ── Rate-limit: 1 submission per IP per minute ─────── */
$lockFile = sys_get_temp_dir() . '/cf_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
if (file_exists($lockFile) && (time() - filemtime($lockFile)) < 60) {
    echo json_encode(['success' => false, 'message' => 'Please wait a moment before sending again.']);
    exit;
}
touch($lockFile);

/* ── Build and send email ───────────────────────────── */
$to      = 'prasetiyarudy@gmail.com';
$subject_line = 'Portfolio: ' . mb_substr($subject, 0, 80);
$body    = "Name:    $name\nEmail:   $email\nSubject: $subject\n\n" . str_repeat('-', 40) . "\n\n$message";

$headers = implode("\r\n", [
    'From: rudyprasetiya.com Contact <no-reply@rudyprasetiya.com>',
    "Reply-To: $name <$email>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

if (mail($to, $subject_line, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent — I\'ll be in touch soon.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error. Please email prasetiyarudy@gmail.com directly.']);
}
