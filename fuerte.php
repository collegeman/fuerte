<?php
/**
 * Plugin Name: Fuerte
 * Plugin URI: https://github.com/collegeman/fuerte
 * Description: A strong password generator with no dependencies, for JavaScript and PHP, Laravel and WordPress.
 * Version: 1.0.5
 * Requires at least: 2.5.0
 * Requires PHP: 7.3
 * Author: Aaron Collegeman
 * Author URI: https://github.com/collegeman
 * License: MIT
 * Network: true
 */

require_once __DIR__.'/src/Generator.php';

add_filter('random_password', function($password, $length, $special_chars, $extra_special_chars) {
  $generator = new \Collegeman\Fuerte\Generator;
  return apply_filters('fuerte', $generator->memorable(), $generator);
}, 10, 4);