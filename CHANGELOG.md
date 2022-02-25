# Changelog
 
## 1.0.8

* Bump support for PHP to ^7.4
 
## 1.0.7

* In PHP library, switched from using `array_rand()` to using `random_int()`, the latter being suitable for cryptographic applications
* In JavaScript library, switch from using `Math.random()` to using `Crypto.getRandomValues()`, the latter, while still a PRNG, is suitable for cryptographic applications
 
## 1.0.6

First public release.