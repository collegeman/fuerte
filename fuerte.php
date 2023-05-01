<?php
/**
 * Plugin Name: Fuerte
 * Plugin URI: https://github.com/collegeman/fuerte
 * Description: A strong password generator with no dependencies, for JavaScript and PHP, Laravel and WordPress.
 * Version: 1.0.9
 * Requires at least: 2.5.0
 * Requires PHP: 7.4
 * Author: Aaron Collegeman
 * Author URI: https://github.com/collegeman
 * License: MIT
 * Network: true
 */

require_once __DIR__.'/src/Generator.php';

function enqueue_fuerte_password_generator() {
  static $enqueued;

  if (apply_filters('fuerte_style_passwords', true)) {
    if (empty($enqueued)) {
      add_filter('random_password', function ($password, $length, $special_chars, $extra_special_chars) {
        if (!$extra_special_chars) {
          $generator = apply_filters('fuerte', (new \Collegeman\Fuerte\Generator)->memorable(), $length, $special_chars, $extra_special_chars);
          if ($generator) {
            $password = $generator->make();
          }
        }
        return $password;
      }, 10, 4);

      add_filter('password_hint', function () {
        return __("Hint: Use a long password composed of words that are meaningful to you: that way it's easy for you to remember but hard for a computer to guess.");
      });

      $enqueued = true;
    }
  }
}

add_action('login_enqueue_scripts', 'enqueue_fuerte_password_generator');

add_action('login_head', function() {
  if (apply_filters('fuerte_style_passwords', true)) {
    ?>
      <style>
        #pass1 {
          font-size: 14px !important;
          padding-left: 10px;
          font-family: monospace !important;
        }
        .button-generate-pw {
          width: 2.5rem;
          height: 2.5rem;
          min-width: 40px;
          min-height: 40px;
          margin: 0;
          padding: 5px 9px;
          position: absolute;
          right: 0;
          top: 0;
          background: transparent !important;
          border: 1px solid transparent  !important;
          box-shadow: none  !important;
        }
        .button-generate-pw > .dashicons {
          position: relative;
          font-size: 20px;
          width: 1.25rem;
          height: 1.25rem;
          top: 0.25rem;
        }
      </style>
    <?php
  }
});

add_action('login_footer', function() {
  if (apply_filters('fuerte_style_passwords', true)) {
    ?>
      <script src="<?php echo esc_attr( plugins_url('dist/fuerte-lib.js', __FILE__) )?>"></script>
      <script>
        (function() {
          var btnHidePassword = document.querySelectorAll('.wp-hide-pw');
          var input = document.getElementById('pass1');
          if (btnHidePassword.length && input) {
            btnHidePassword = btnHidePassword[0]
            var btnGenerateNewPassword = document.createElement('button');
            btnGenerateNewPassword.type = 'button'
            btnGenerateNewPassword.className = 'button button-secondary button-generate-pw';
            btnGenerateNewPassword.title = 'Generate another random password';
            btnGenerateNewPassword.addEventListener('click', function(e) {
              input.value = fuerte().memorable().make()
              e.preventDefault();
            });
            var label = document.createElement('span')
            label.className = 'dashicons dashicons-controls-repeat';
            btnGenerateNewPassword.appendChild(label)
            btnHidePassword.parentNode.replaceChild(btnGenerateNewPassword, btnHidePassword);
          }
        })()
      </script>
    <?php
  }
});

add_action('user_edit_form_tag', 'enqueue_fuerte_password_generator');