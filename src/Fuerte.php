<?php
namespace Collegeman\Fuerte;

/**
 * @method Generator memorable()
 * @method Generator pin()
 * @method Generator random()
 * @method Generator capitalize(mixed $capitalize = null)
 * @method Generator symbols(mixed $symbols = null)
 * @method Generator numbers(mixed $symbols = null)
 * @method Generator size(mixed $symbols = null)
 * @method Generator separator(string $separator)
 * @method string make()
 */
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