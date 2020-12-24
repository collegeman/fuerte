<?php
use Collegeman\Fuerte\Generator;

if (!function_exists('fuerte')) {

  /**
   * @return Generator
   */
  function fuerte()
  {
    return new Generator;
  }

}