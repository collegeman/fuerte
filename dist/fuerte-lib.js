/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fuerte-lib.js":
/*!***************************!*\
  !*** ./src/fuerte-lib.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fuerte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fuerte */ "./src/fuerte.js");


window.Fuerte = _fuerte__WEBPACK_IMPORTED_MODULE_0__.Fuerte;
window.fuerte = _fuerte__WEBPACK_IMPORTED_MODULE_0__.default;

/***/ }),

/***/ "./src/fuerte.js":
/*!***********************!*\
  !*** ./src/fuerte.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fuerte": () => /* binding */ Fuerte,
/* harmony export */   "default": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _eff_short_wordlist_1_txt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eff_short_wordlist_1.txt */ "./src/eff_short_wordlist_1.txt");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var bank = [];
var digits = '0123456789';
var symbols = '!@#_-.*%';
var lower = 'abcdefghijklmnopqrstuvwxyz';
var upper = lower.toUpperCase();

var Fuerte = function Fuerte() {
  this._listeners = [];
  this._symbols = false;
  this._capitalize = false;
  this._numbers = false;
  this._separator = Fuerte.SEPARATOR_HYPHENS;
  this.type(Fuerte.TYPE_MEMORABLE);
};

Fuerte.TYPE_RANDOM = 'random';
Fuerte.TYPE_MEMORABLE = 'memorable';
Fuerte.TYPE_PIN = 'pin';
Fuerte.SEPARATOR_HYPHENS = '-';
Fuerte.SEPARATOR_SPACES = ' ';
Fuerte.SEPARATOR_PERIODS = '.';
Fuerte.SEPARATOR_COMMAS = ',';
Fuerte.SEPARATOR_UNDERSCORES = '_';
Fuerte.SEPARATOR_DIGITS = '0';
Fuerte.SEPARATOR_DIGITS_AND_SYMBOLS = '0_';
var minSize = [];
minSize[Fuerte.TYPE_RANDOM] = 8;
minSize[Fuerte.TYPE_MEMORABLE] = 3;
minSize[Fuerte.TYPE_PIN] = 3;
var maxSize = [];
maxSize[Fuerte.TYPE_RANDOM] = 100;
maxSize[Fuerte.TYPE_MEMORABLE] = 15;
maxSize[Fuerte.TYPE_PIN] = 12;

var containsChars = function containsChars(string, banks) {
  if (banks.length < 1) {
    return true;
  }

  var _iterator = _createForOfIteratorHelper(banks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _bank = _step.value;

      var chars = _bank.split('');

      var contains = false;

      var _iterator2 = _createForOfIteratorHelper(chars),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _char = _step2.value;

          if (string.indexOf(_char) > -1) {
            contains = true;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (!contains) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
};

var first = function first(elements) {
  return elements.length ? elements[0] : null;
};

var randomChars = function randomChars(from, length) {
  if (from.length < 1) {
    return null;
  }

  if (!length) {
    length = 1;
  }

  var bank = [];
  var random = [];

  while (random.length < length) {
    if (bank.length < 1) {
      bank = from.split('');
    }

    var i = Math.round(Math.random() * (bank.length - 1));
    random.push(bank[i]);
    bank.splice(i, 1);
  }

  return random.join('');
};

var shuffle = function shuffle(string) {
  var a = string.split(""),
      n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }

  return string.join("");
};

Fuerte.prototype.addEventListener = function (listener) {
  this._listeners.push(listener);

  return this;
};

Fuerte.prototype.removeEventListener = function (listener) {
  for (var i in this._listeners) {
    if (this._listeners[i] === listener) {
      this._listeners.splice(i, 1);

      break;
    }
  }

  return this;
};

Fuerte.prototype.fire = function (event, data) {
  var _iterator3 = _createForOfIteratorHelper(this._listeners),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var listener = _step3.value;
      listener(event, data);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return this;
};

Fuerte.prototype.fireChangeEvent = function () {
  return this.fire('change', {
    type: this._type,
    size: this._size,
    capitalize: this._capitalize,
    numbers: this._numbers,
    symbols: this._symbols,
    size_min: minSize[this._type],
    size_max: maxSize[this._type]
  });
};

Fuerte.prototype.type = function (type) {
  this._type = type;
  this.fireChangeEvent();
  return this.size(0); // uses default min
};

Fuerte.prototype.random = function () {
  return this.type(Fuerte.TYPE_RANDOM);
};

Fuerte.prototype.memorable = function () {
  return this.type(Fuerte.TYPE_MEMORABLE);
};

Fuerte.prototype.pin = function () {
  return this.type(Fuerte.TYPE_PIN);
};

Fuerte.prototype.symbols = function (bool) {
  this._symbols = bool === undefined ? true : !!bool;
  this.fireChangeEvent();
  return this;
};

Fuerte.prototype.numbers = function (bool) {
  this._numbers = bool === undefined ? true : !!bool;
  this.fireChangeEvent();
  return this;
};

Fuerte.prototype.separator = function (separator) {
  this._separator = separator;
  this.fireChangeEvent();
  return this;
};

Fuerte.prototype.capitalize = function (bool) {
  this._capitalize = bool === undefined ? true : !!bool;
  this.fireChangeEvent();
  return this;
};

Fuerte.prototype.size = function (number) {
  var n = parseInt(number);
  this._size = Math.max(minSize[this._type], Math.min(n, maxSize[this._type]));
  this.fireChangeEvent();
  return this;
};

Fuerte.prototype.word = function () {
  if (bank.length < 1) {
    bank = _eff_short_wordlist_1_txt__WEBPACK_IMPORTED_MODULE_0__.default.split("\n");
  }

  var i = Math.round(Math.random() * (bank.length - 1));
  var word = bank[i];
  bank.splice(i, 1);
  return word;
};

Fuerte.prototype.toString = function () {
  return this.make();
};

Fuerte.prototype.make = function () {
  var password = null; // Make a pin-type password

  if (this._type === Fuerte.TYPE_PIN) {
    password = randomChars('0123456789', this._size); // Make a memorable-type password
  } else if (this._type === Fuerte.TYPE_MEMORABLE) {
    var _words = [];

    for (var i = 0; i < this._size; i++) {
      _words.push(this.word());
    }

    if (this._capitalize) {
      var which = Math.round(Math.random() * (_words.length - 1));
      _words[which] = _words[which].toUpperCase();
    }

    var separatorBanks = [];
    var separator = this._separator;

    if (this._separator === Fuerte.SEPARATOR_DIGITS) {
      separator = digits;
      separatorBanks.push(digits);
    }

    if (this._separator === Fuerte.SEPARATOR_DIGITS_AND_SYMBOLS) {
      separator = digits + symbols;
      separatorBanks.push(digits);
      separatorBanks.push(symbols);
    }

    do {
      password = '';

      for (var _i in _words) {
        password += _words[_i];

        if (_i < _words.length - 1) {
          password += randomChars(separator, 1);
        }
      }
    } while (!containsChars(password, separatorBanks)); // Make a random password

  } else {
    var banks = [];
    banks.push(upper);
    banks.push(lower);

    if (this._symbols) {
      banks.push(symbols);
    }

    if (this._numbers) {
      banks.push(digits);
    }

    do {
      password = randomChars(banks.join(''), this._size);
    } while (!containsChars(password, banks));
  }

  this.fire('make', {
    password: password
  });
  return password;
};

Fuerte.prototype.form = function (el) {
  var instance = this;
  var password = first(el.querySelectorAll(':scope [data-fuerte="password"]'));
  var btnGenerate = first(el.querySelectorAll(':scope [data-fuerte="generate"]'));

  if (btnGenerate) {
    btnGenerate.addEventListener('click', function (e) {
      instance.make();
      e.preventDefault();
    });
  }

  var selectType = first(el.querySelectorAll(':scope [data-fuerte="type"]'));

  if (selectType) {
    selectType.addEventListener('change', function (e) {
      instance.type(selectType.value);
      instance.make();
    });
  }

  var selectSeparator = first(el.querySelectorAll(':scope [data-fuerte="separator"]'));

  if (selectSeparator) {
    selectSeparator.addEventListener('change', function (e) {
      instance.separator(selectSeparator.value);
      instance.make();
    });
  }

  var checkCapitalize = first(el.querySelectorAll(':scope [data-fuerte="capitalize"]'));

  if (checkCapitalize) {
    checkCapitalize.addEventListener('change', function (e) {
      instance.capitalize(checkCapitalize.checked);
      instance.make();
    });
  }

  var checkNumbers = first(el.querySelectorAll(':scope [data-fuerte="numbers"]'));

  if (checkNumbers) {
    checkNumbers.addEventListener('change', function (e) {
      instance.numbers(checkNumbers.checked);
      instance.make();
    });
  }

  var checkSymbols = first(el.querySelectorAll(':scope [data-fuerte="symbols"]'));

  if (checkSymbols) {
    checkSymbols.addEventListener('change', function (e) {
      instance.symbols(checkSymbols.checked);
      instance.make();
    });
  }

  var rangeSize = first(el.querySelectorAll(':scope [data-fuerte="size"]'));
  var rangeSizeLabel = null;

  if (rangeSize) {
    rangeSize.addEventListener('change', function (e) {
      instance.size(rangeSize.value);
      instance.make();
    });

    if (rangeSize.id) {
      rangeSizeLabel = first(document.querySelectorAll('label[for="' + rangeSize.id + '"]'));
    }
  }

  instance.addEventListener(function (event, data) {
    if (event === 'make') {
      if (password) {
        password.value = data.password;
      }
    }

    if (event === 'change') {
      if (checkCapitalize) {
        checkCapitalize.value = data.capitalize;
        checkCapitalize.disabled = data.type !== Fuerte.TYPE_MEMORABLE;
      }

      if (checkNumbers) {
        checkNumbers.value = data.numbers;
        checkNumbers.disabled = data.type !== Fuerte.TYPE_RANDOM;
      }

      if (checkSymbols) {
        checkSymbols.value = data.symbols;
        checkSymbols.disabled = data.type !== Fuerte.TYPE_RANDOM;
      }

      if (selectSeparator) {
        selectSeparator.disabled = data.type !== Fuerte.TYPE_MEMORABLE;
      }

      if (rangeSize) {
        rangeSize.min = data.size_min;
        rangeSize.max = data.size_max;
        rangeSize.value = data.size;
        rangeSize.step = 1;

        if (rangeSizeLabel) {
          var label = data.size;

          if (data.type === Fuerte.TYPE_MEMORABLE) {
            label += ' words';
          } else if (data.type === Fuerte.TYPE_PIN) {
            label += ' digits';
          } else {
            label += ' characters';
          }

          rangeSizeLabel.innerHTML = label;
        }
      }
    }
  });
  instance.fireChangeEvent();
  instance.make();
};


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(el) {
  var instance = new Fuerte();

  if (el) {
    instance.form(el);
  }

  return instance;
}

/***/ }),

/***/ "./src/eff_short_wordlist_1.txt":
/*!**************************************!*\
  !*** ./src/eff_short_wordlist_1.txt ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("acid\nacorn\nacre\nacts\nafar\naffix\naged\nagent\nagile\naging\nagony\nahead\naide\naids\naim\najar\nalarm\nalias\nalibi\nalien\nalike\nalive\naloe\naloft\naloha\nalone\namend\namino\nample\namuse\nangel\nanger\nangle\nankle\napple\napril\napron\naqua\narea\narena\nargue\narise\narmed\narmor\narmy\naroma\narray\narson\nart\nashen\nashes\natlas\natom\nattic\naudio\navert\navoid\nawake\naward\nawoke\naxis\nbacon\nbadge\nbagel\nbaggy\nbaked\nbaker\nbalmy\nbanjo\nbarge\nbarn\nbash\nbasil\nbask\nbatch\nbath\nbaton\nbats\nblade\nblank\nblast\nblaze\nbleak\nblend\nbless\nblimp\nblink\nbloat\nblob\nblog\nblot\nblunt\nblurt\nblush\nboast\nboat\nbody\nboil\nbok\nbolt\nboned\nboney\nbonus\nbony\nbook\nbooth\nboots\nboss\nbotch\nboth\nboxer\nbreed\nbribe\nbrick\nbride\nbrim\nbring\nbrink\nbrisk\nbroad\nbroil\nbroke\nbrook\nbroom\nbrush\nbuck\nbud\nbuggy\nbulge\nbulk\nbully\nbunch\nbunny\nbunt\nbush\nbust\nbusy\nbuzz\ncable\ncache\ncadet\ncage\ncake\ncalm\ncameo\ncanal\ncandy\ncane\ncanon\ncape\ncard\ncargo\ncarol\ncarry\ncarve\ncase\ncash\ncause\ncedar\nchain\nchair\nchant\nchaos\ncharm\nchase\ncheek\ncheer\nchef\nchess\nchest\nchew\nchief\nchili\nchill\nchip\nchomp\nchop\nchow\nchuck\nchump\nchunk\nchurn\nchute\ncider\ncinch\ncity\ncivic\ncivil\nclad\nclaim\nclamp\nclap\nclash\nclasp\nclass\nclaw\nclay\nclean\nclear\ncleat\ncleft\nclerk\nclick\ncling\nclink\nclip\ncloak\nclock\nclone\ncloth\ncloud\nclump\ncoach\ncoast\ncoat\ncod\ncoil\ncoke\ncola\ncold\ncolt\ncoma\ncome\ncomic\ncomma\ncone\ncope\ncopy\ncoral\ncork\ncost\ncot\ncouch\ncough\ncover\ncozy\ncraft\ncramp\ncrane\ncrank\ncrate\ncrave\ncrawl\ncrazy\ncreme\ncrepe\ncrept\ncrib\ncried\ncrisp\ncrook\ncrop\ncross\ncrowd\ncrown\ncrumb\ncrush\ncrust\ncub\ncult\ncupid\ncure\ncurl\ncurry\ncurse\ncurve\ncurvy\ncushy\ncut\ncycle\ndab\ndad\ndaily\ndairy\ndaisy\ndance\ndandy\ndarn\ndart\ndash\ndata\ndate\ndawn\ndeaf\ndeal\ndean\ndebit\ndebt\ndebug\ndecaf\ndecal\ndecay\ndeck\ndecor\ndecoy\ndeed\ndelay\ndenim\ndense\ndent\ndepth\nderby\ndesk\ndial\ndiary\ndice\ndig\ndill\ndime\ndimly\ndiner\ndingy\ndisco\ndish\ndisk\nditch\nditzy\ndizzy\ndock\ndodge\ndoing\ndoll\ndome\ndonor\ndonut\ndose\ndot\ndove\ndown\ndowry\ndoze\ndrab\ndrama\ndrank\ndraw\ndress\ndried\ndrift\ndrill\ndrive\ndrone\ndroop\ndrove\ndrown\ndrum\ndry\nduck\nduct\ndude\ndug\nduke\nduo\ndusk\ndust\nduty\ndwarf\ndwell\neagle\nearly\nearth\neasel\neast\neaten\neats\nebay\nebony\nebook\necho\nedge\neel\neject\nelbow\nelder\nelf\nelk\nelm\nelope\nelude\nelves\nemail\nemit\nempty\nemu\nenter\nentry\nenvoy\nequal\nerase\nerror\nerupt\nessay\netch\nevade\neven\nevict\nevil\nevoke\nexact\nexit\nfable\nfaced\nfact\nfade\nfall\nfalse\nfancy\nfang\nfax\nfeast\nfeed\nfemur\nfence\nfend\nferry\nfetal\nfetch\nfever\nfiber\nfifth\nfifty\nfilm\nfilth\nfinal\nfinch\nfit\nfive\nflag\nflaky\nflame\nflap\nflask\nfled\nflick\nfling\nflint\nflip\nflirt\nfloat\nflock\nflop\nfloss\nflyer\nfoam\nfoe\nfog\nfoil\nfolic\nfolk\nfood\nfool\nfound\nfox\nfoyer\nfrail\nframe\nfray\nfresh\nfried\nfrill\nfrisk\nfrom\nfront\nfrost\nfroth\nfrown\nfroze\nfruit\ngag\ngains\ngala\ngame\ngap\ngas\ngave\ngear\ngecko\ngeek\ngem\ngenre\ngift\ngig\ngills\ngiven\ngiver\nglad\nglass\nglide\ngloss\nglove\nglow\nglue\ngoal\ngoing\ngolf\ngong\ngood\ngooey\ngoofy\ngore\ngown\ngrab\ngrain\ngrant\ngrape\ngraph\ngrasp\ngrass\ngrave\ngravy\ngray\ngreen\ngreet\ngrew\ngrid\ngrief\ngrill\ngrip\ngrit\ngroom\ngrope\ngrowl\ngrub\ngrunt\nguide\ngulf\ngulp\ngummy\nguru\ngush\ngut\nguy\nhabit\nhalf\nhalo\nhalt\nhappy\nharm\nhash\nhasty\nhatch\nhate\nhaven\nhazel\nhazy\nheap\nheat\nheave\nhedge\nhefty\nhelp\nherbs\nhers\nhub\nhug\nhula\nhull\nhuman\nhumid\nhump\nhung\nhunk\nhunt\nhurry\nhurt\nhush\nhut\nice\nicing\nicon\nicy\nigloo\nimage\nion\niron\nislam\nissue\nitem\nivory\nivy\njab\njam\njaws\njazz\njeep\njelly\njet\njiffy\njob\njog\njolly\njolt\njot\njoy\njudge\njuice\njuicy\njuly\njumbo\njump\njunky\njuror\njury\nkeep\nkeg\nkept\nkick\nkilt\nking\nkite\nkitty\nkiwi\nknee\nknelt\nkoala\nkung\nladle\nlady\nlair\nlake\nlance\nland\nlapel\nlarge\nlash\nlasso\nlast\nlatch\nlate\nlazy\nleft\nlegal\nlemon\nlend\nlens\nlent\nlevel\nlever\nlid\nlife\nlift\nlilac\nlily\nlimb\nlimes\nline\nlint\nlion\nlip\nlist\nlived\nliver\nlunar\nlunch\nlung\nlurch\nlure\nlurk\nlying\nlyric\nmace\nmaker\nmalt\nmama\nmango\nmanor\nmany\nmap\nmarch\nmardi\nmarry\nmash\nmatch\nmate\nmath\nmoan\nmocha\nmoist\nmold\nmom\nmoody\nmop\nmorse\nmost\nmotor\nmotto\nmount\nmouse\nmousy\nmouth\nmove\nmovie\nmower\nmud\nmug\nmulch\nmule\nmull\nmumbo\nmummy\nmural\nmuse\nmusic\nmusky\nmute\nnacho\nnag\nnail\nname\nnanny\nnap\nnavy\nnear\nneat\nneon\nnerd\nnest\nnet\nnext\nniece\nninth\nnutty\noak\noasis\noat\nocean\noil\nold\nolive\nomen\nonion\nonly\nooze\nopal\nopen\nopera\nopt\notter\nouch\nounce\nouter\noval\noven\nowl\nozone\npace\npagan\npager\npalm\npanda\npanic\npants\npanty\npaper\npark\nparty\npasta\npatch\npath\npatio\npayer\npecan\npenny\npep\nperch\nperky\nperm\npest\npetal\npetri\npetty\nphoto\nplank\nplant\nplaza\nplead\nplot\nplow\npluck\nplug\nplus\npoach\npod\npoem\npoet\npogo\npoint\npoise\npoker\npolar\npolio\npolka\npolo\npond\npony\npoppy\npork\nposer\npouch\npound\npout\npower\nprank\npress\nprint\nprior\nprism\nprize\nprobe\nprong\nproof\nprops\nprude\nprune\npry\npug\npull\npulp\npulse\npuma\npunch\npunk\npupil\npuppy\npurr\npurse\npush\nputt\nquack\nquake\nquery\nquiet\nquill\nquilt\nquit\nquota\nquote\nrabid\nrace\nrack\nradar\nradio\nraft\nrage\nraid\nrail\nrake\nrally\nramp\nranch\nrange\nrank\nrant\nrash\nraven\nreach\nreact\nream\nrebel\nrecap\nrelax\nrelay\nrelic\nremix\nrepay\nrepel\nreply\nrerun\nreset\nrhyme\nrice\nrich\nride\nrigid\nrigor\nrinse\nriot\nripen\nrise\nrisk\nritzy\nrival\nriver\nroast\nrobe\nrobin\nrock\nrogue\nroman\nromp\nrope\nrover\nroyal\nruby\nrug\nruin\nrule\nrunny\nrush\nrust\nrut\nsadly\nsage\nsaid\nsaint\nsalad\nsalon\nsalsa\nsalt\nsame\nsandy\nsanta\nsatin\nsauna\nsaved\nsavor\nsax\nsay\nscale\nscam\nscan\nscare\nscarf\nscary\nscoff\nscold\nscoop\nscoot\nscope\nscore\nscorn\nscout\nscowl\nscrap\nscrub\nscuba\nscuff\nsect\nsedan\nself\nsend\nsepia\nserve\nset\nseven\nshack\nshade\nshady\nshaft\nshaky\nsham\nshape\nshare\nsharp\nshed\nsheep\nsheet\nshelf\nshell\nshine\nshiny\nship\nshirt\nshock\nshop\nshore\nshout\nshove\nshown\nshowy\nshred\nshrug\nshun\nshush\nshut\nshy\nsift\nsilk\nsilly\nsilo\nsip\nsiren\nsixth\nsize\nskate\nskew\nskid\nskier\nskies\nskip\nskirt\nskit\nsky\nslab\nslack\nslain\nslam\nslang\nslash\nslate\nslaw\nsled\nsleek\nsleep\nsleet\nslept\nslice\nslick\nslimy\nsling\nslip\nslit\nslob\nslot\nslug\nslum\nslurp\nslush\nsmall\nsmash\nsmell\nsmile\nsmirk\nsmog\nsnack\nsnap\nsnare\nsnarl\nsneak\nsneer\nsniff\nsnore\nsnort\nsnout\nsnowy\nsnub\nsnuff\nspeak\nspeed\nspend\nspent\nspew\nspied\nspill\nspiny\nspoil\nspoke\nspoof\nspool\nspoon\nsport\nspot\nspout\nspray\nspree\nspur\nsquad\nsquat\nsquid\nstack\nstaff\nstage\nstain\nstall\nstamp\nstand\nstank\nstark\nstart\nstash\nstate\nstays\nsteam\nsteep\nstem\nstep\nstew\nstick\nsting\nstir\nstock\nstole\nstomp\nstony\nstood\nstool\nstoop\nstop\nstorm\nstout\nstove\nstraw\nstray\nstrut\nstuck\nstud\nstuff\nstump\nstung\nstunt\nsuds\nsugar\nsulk\nsurf\nsushi\nswab\nswan\nswarm\nsway\nswear\nsweat\nsweep\nswell\nswept\nswim\nswing\nswipe\nswirl\nswoop\nswore\nsyrup\ntacky\ntaco\ntag\ntake\ntall\ntalon\ntamer\ntank\ntaper\ntaps\ntarot\ntart\ntask\ntaste\ntasty\ntaunt\nthank\nthaw\ntheft\ntheme\nthigh\nthing\nthink\nthong\nthorn\nthose\nthrob\nthud\nthumb\nthump\nthus\ntiara\ntidal\ntidy\ntiger\ntile\ntilt\ntint\ntiny\ntrace\ntrack\ntrade\ntrain\ntrait\ntrap\ntrash\ntray\ntreat\ntree\ntrek\ntrend\ntrial\ntribe\ntrick\ntrio\ntrout\ntruce\ntruck\ntrump\ntrunk\ntry\ntug\ntulip\ntummy\nturf\ntusk\ntutor\ntutu\ntux\ntweak\ntweet\ntwice\ntwine\ntwins\ntwirl\ntwist\nuncle\nuncut\nundo\nunify\nunion\nunit\nuntie\nupon\nupper\nurban\nused\nuser\nusher\nutter\nvalue\nvapor\nvegan\nvenue\nverse\nvest\nveto\nvice\nvideo\nview\nviral\nvirus\nvisa\nvisor\nvixen\nvocal\nvoice\nvoid\nvolt\nvoter\nvowel\nwad\nwafer\nwager\nwages\nwagon\nwake\nwalk\nwand\nwasp\nwatch\nwater\nwavy\nwheat\nwhiff\nwhole\nwhoop\nwick\nwiden\nwidow\nwidth\nwife\nwifi\nwilt\nwimp\nwind\nwing\nwink\nwipe\nwired\nwiry\nwise\nwish\nwispy\nwok\nwolf\nwomb\nwool\nwoozy\nword\nwork\nworry\nwound\nwoven\nwrath\nwreck\nwrist\nxerox\nyahoo\nyam\nyard\nyear\nyeast\nyelp\nyield\nyo-yo\nyodel\nyoga\nyoyo\nyummy\nzebra\nzero\nzesty\nzippy\nzone\nzoom");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/fuerte-lib.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;