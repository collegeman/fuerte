<?php
namespace Collegeman\Fuerte;

/**
 * A strong password generator with no dependencies.
 * @package Collegeman\Fuerte
 */
class Generator
{
  const DIGITS = '012345679';
  const SYMBOLS = '!@#_-.*%';
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const TYPE_RANDOM = 'random';
  const TYPE_MEMORABLE = 'memorable';
  const TYPE_PIN = 'pin';

  const SEPARATOR_HYPHENS = '-';
  const SEPARATOR_SPACES = ' ';
  const SEPARATOR_PERIODS = '.';
  const SEPARATOR_COMMAS = ',';
  const SEPARATOR_UNDERSCORES = '_';
  const SEPARATOR_DIGITS = '0';
  const SEPARATOR_DIGITS_AND_SYMBOLS = '0_';

  protected static $words = null;
  protected static $bank = [];

  protected static $minSize = [
    self::TYPE_RANDOM => 8,
    self::TYPE_MEMORABLE => 4,
    self::TYPE_PIN => 3,
  ];

  protected static $maxSize = [
    self::TYPE_RANDOM => 100,
    self::TYPE_MEMORABLE => 15,
    self::TYPE_PIN => 12,
  ];

  protected $type = self::TYPE_MEMORABLE;
  protected $symbols = false;
  protected $capitalize = false;
  protected $numbers = false;
  protected $separator = self::SEPARATOR_SPACES;
  protected $size;

  public function __construct()
  {
    $this->size = self::$minSize[$this->type];
  }

  public function word()
  {
    if (empty(self::$bank)) {
      if (empty(self::$words)) {
        self::$words = file_get_contents(__DIR__.'/eff_short_wordlist_1.txt');
      }
      self::$bank = explode("\n", self::$words);
    }
    $i = self::arrayRand(self::$bank);
    $word = self::$bank[$i];
    unset(self::$bank[$i]);
    return $word;
  }

  public function type(string $type)
  {
    $this->type = $type;
    $this->size(0); // uses default min
    return $this;
  }

  public function random()
  {
    return $this->type(self::TYPE_RANDOM);
  }

  public function pin()
  {
    return $this->type(self::TYPE_PIN);
  }

  public function memorable()
  {
    return $this->type(self::TYPE_MEMORABLE);
  }

  public function symbols($symbols = null)
  {
    $this->symbols = is_null($symbols) ? true : (bool) $symbols;
    return $this;
  }

  public function numbers($numbers = null)
  {
    $this->numbers = is_null($numbers) ? true : (bool) $numbers;
    return $this;
  }

  public function separator($separator)
  {
    $this->separator = $separator;
    return $this;
  }

  public function capitalize($capitalize = null)
  {
    $this->capitalize = is_null($capitalize) ? true : (bool) $capitalize;
    return $this;
  }

  public function size(int $size)
  {
    $this->size = max(self::$minSize[$this->type], min($size, self::$maxSize[$this->type]));
    return $this;
  }

  /**
   * @param array $elements
   * @return mixed
   * @throws \Exception
   */
  public static function arrayRand(array $elements)
  {
    $keys = array_keys($elements);
    $min = 0;
    $max = count($keys) - 1;
    $rand = random_int($min, $max);
    return $keys[$rand];
  }

  /**
   * @return string
   */
  public function make()
  {
    $password = null;

    // Make a pin-type password
    if ($this->type === self::TYPE_PIN) {
      $password = self::randomChars(self::DIGITS, $this->size);

      // Make a memorable-type password
    } else if ($this->type === self::TYPE_MEMORABLE) {
      $words = [];
      for ($i = 0; $i < $this->size; $i++) {
        $words[] = $this->word();
      }
      if ($this->capitalize) {
        $which = self::arrayRand($words);
        $words[$which] = strtoupper($words[$which]);
      }
      $separatorBanks = [];
      $separator = $this->separator;
      if ($this->separator === self::SEPARATOR_DIGITS) {
        $separator = self::DIGITS;
        $separatorBanks[] = self::DIGITS;
      }
      if ($this->separator === self::SEPARATOR_DIGITS_AND_SYMBOLS) {
        $separator = self::DIGITS . self::SYMBOLS;
        $separatorBanks[] = self::DIGITS;
        $separatorBanks[] = self::SYMBOLS;
      }
      do {
        $password = '';
        foreach ($words as $i => $word) {
          $password .= $word;
          if ($i < count($words) - 1) {
            $password .= self::randomChars($separator, 1);
          }
        }
      } while (!self::containsChars($password, $separatorBanks));

    // Make a random password
    } else {
      $banks = [];
      $banks[] = self::UPPER;
      $banks[] = self::LOWER;
      if ($this->symbols) {
        $banks[] = self::SYMBOLS;
      }
      if ($this->numbers) {
        $banks[] = self::DIGITS;
      }
      do {
        $password = self::randomChars(implode('', $banks), $this->size);
      } while (!self::containsChars($password, $banks));
    }

    return $password;
  }

  public function __toString()
  {
    return $this->make();
  }

  private static function containsChars(string $string, array $banks)
  {
    if (count($banks) < 1) {
      return true;
    }

    foreach($banks as $bank) {
      $chars = str_split($bank);
      $contains = false;
      foreach($chars as $char) {
        if (stripos($string, $char) !== false) {
          $contains = true;
          break;
        }
      }
      if (!$contains) {
        return false;
      }
    }

    return true;
  }

  private static function randomChars(string $from, int $length)
  {
    if (strlen($from) < 1) {
      return null;
    }
    if (!$length) {
      $length = 1;
    }
    $bank = [];
    $random = [];
    while (count($random) < $length) {
      if (count($bank) < 1) {
        $bank = str_split($from);
      }
      $i = self::arrayRand($bank);
      array_push($random, $bank[$i]);
      unset($bank[$i]);
    }
    return implode('', $random);
  }

}