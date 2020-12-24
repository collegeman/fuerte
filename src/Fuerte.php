<?php
namespace Collegeman\Fuerte;

class Fuerte
{
  protected static $instance;

  public static function __callStatic($name, $args)
  {
    return self::instance()->{$name}(...$args);
  }

  protected static function instance()
  {
    return self::$instance ? self::$instance : (self::$instance = new Generator);
  }
}