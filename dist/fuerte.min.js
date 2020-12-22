/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _eff_short_wordlist_2_0_txt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eff_short_wordlist_2_0.txt */ "./src/eff_short_wordlist_2_0.txt");
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
    bank = _eff_short_wordlist_2_0_txt__WEBPACK_IMPORTED_MODULE_0__.default.split("\n");
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

/***/ "./src/eff_short_wordlist_2_0.txt":
/*!****************************************!*\
  !*** ./src/eff_short_wordlist_2_0.txt ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("aardvark\nabandoned\nabbreviate\nabdomen\nabhorrence\nabiding\nabnormal\nabrasion\nabsorbing\nabundant\nabyss\nacademy\naccountant\nacetone\nachiness\nacid\nacoustics\nacquire\nacrobat\nactress\nacuteness\naerosol\naesthetic\naffidavit\nafloat\nafraid\naftershave\nagain\nagency\naggressor\naghast\nagitate\nagnostic\nagonizing\nagreeing\naidless\naimlessly\najar\nalarmclock\nalbatross\nalchemy\nalfalfa\nalgae\naliens\nalkaline\nalmanac\nalongside\nalphabet\nalready\nalso\naltitude\naluminum\nalways\namazingly\nambulance\namendment\namiable\nammunition\namnesty\namoeba\namplifier\namuser\nanagram\nanchor\nandroid\nanesthesia\nangelfish\nanimal\nanklet\nannouncer\nanonymous\nanswer\nantelope\nanxiety\nanyplace\naorta\napartment\napnea\napostrophe\napple\napricot\naquamarine\narachnid\narbitrate\nardently\narena\nargument\naristocrat\narmchair\naromatic\narrowhead\narsonist\nartichoke\nasbestos\nascend\naseptic\nashamed\nasinine\nasleep\nasocial\nasparagus\nastronaut\nasymmetric\natlas\natmosphere\natom\natrocious\nattic\natypical\nauctioneer\nauditorium\naugmented\nauspicious\nautomobile\nauxiliary\navalanche\navenue\naviator\navocado\nawareness\nawhile\nawkward\nawning\nawoke\naxially\nazalea\nbabbling\nbackpack\nbadass\nbagpipe\nbakery\nbalancing\nbamboo\nbanana\nbarracuda\nbasket\nbathrobe\nbazooka\nblade\nblender\nblimp\nblouse\nblurred\nboatyard\nbobcat\nbody\nbogusness\nbohemian\nboiler\nbonnet\nboots\nborough\nbossiness\nbottle\nbouquet\nboxlike\nbreath\nbriefcase\nbroom\nbrushes\nbubblegum\nbuckle\nbuddhist\nbuffalo\nbullfrog\nbunny\nbusboy\nbuzzard\ncabin\ncactus\ncadillac\ncafeteria\ncage\ncahoots\ncajoling\ncakewalk\ncalculator\ncamera\ncanister\ncapsule\ncarrot\ncashew\ncathedral\ncaucasian\ncaviar\nceasefire\ncedar\ncelery\ncement\ncensus\nceramics\ncesspool\nchalkboard\ncheesecake\nchimney\nchlorine\nchopsticks\nchrome\nchute\ncilantro\ncinnamon\ncircle\ncityscape\ncivilian\nclay\nclergyman\nclipboard\nclock\nclubhouse\ncoathanger\ncobweb\ncoconut\ncodeword\ncoexistent\ncoffeecake\ncognitive\ncohabitate\ncollarbone\ncomputer\nconfetti\ncopier\ncornea\ncosmetics\ncotton\ncouch\ncoverless\ncoyote\ncoziness\ncrawfish\ncrewmember\ncrib\ncroissant\ncrumble\ncrystal\ncubical\ncucumber\ncuddly\ncufflink\ncuisine\nculprit\ncup\ncurry\ncushion\ncuticle\ncybernetic\ncyclist\ncylinder\ncymbal\ncynicism\ncypress\ncytoplasm\ndachshund\ndaffodil\ndagger\ndairy\ndalmatian\ndandelion\ndartboard\ndastardly\ndatebook\ndaughter\ndawn\ndaytime\ndazzler\ndealer\ndebris\ndecal\ndedicate\ndeepness\ndefrost\ndegree\ndehydrator\ndeliverer\ndemocrat\ndentist\ndeodorant\ndepot\nderanged\ndesktop\ndetergent\ndevice\ndexterity\ndiamond\ndibs\ndictionary\ndiffuser\ndigit\ndilated\ndimple\ndinnerware\ndioxide\ndiploma\ndirectory\ndishcloth\nditto\ndividers\ndizziness\ndoctor\ndodge\ndoll\ndominoes\ndonut\ndoorstep\ndorsal\ndouble\ndownstairs\ndozed\ndrainpipe\ndresser\ndriftwood\ndroppings\ndrum\ndryer\ndubiously\nduckling\nduffel\ndugout\ndumpster\nduplex\ndurable\ndustpan\ndutiful\nduvet\ndwarfism\ndwelling\ndwindling\ndynamite\ndyslexia\neagerness\nearlobe\neasel\neavesdrop\nebook\neccentric\necholess\neclipse\necosystem\necstasy\nedged\neditor\neducator\neelworm\neerie\neffects\neggnog\negomaniac\nejection\nelastic\nelbow\nelderly\nelephant\nelfishly\neliminator\nelk\nelliptical\nelongated\nelsewhere\nelusive\nelves\nemancipate\nembroidery\nemcee\nemerald\nemission\nemoticon\nemperor\nemulate\nenactment\nenchilada\nendorphin\nenergy\nenforcer\nengine\nenhance\nenigmatic\nenjoyably\nenlarged\nenormous\nenquirer\nenrollment\nensemble\nentryway\nenunciate\nenvoy\nenzyme\nepidemic\nequipment\nerasable\nergonomic\nerratic\neruption\nescalator\neskimo\nesophagus\nespresso\nessay\nestrogen\netching\neternal\nethics\netiquette\neucalyptus\neulogy\neuphemism\neuthanize\nevacuation\nevergreen\nevidence\nevolution\nexam\nexcerpt\nexerciser\nexfoliate\nexhale\nexist\nexorcist\nexplode\nexquisite\nexterior\nexuberant\nfabric\nfactory\nfaded\nfailsafe\nfalcon\nfamily\nfanfare\nfasten\nfaucet\nfavorite\nfeasibly\nfebruary\nfederal\nfeedback\nfeigned\nfeline\nfemur\nfence\nferret\nfestival\nfettuccine\nfeudalist\nfeverish\nfiberglass\nfictitious\nfiddle\nfigurine\nfillet\nfinalist\nfiscally\nfixture\nflashlight\nfleshiness\nflight\nflorist\nflypaper\nfoamless\nfocus\nfoggy\nfolksong\nfondue\nfootpath\nfossil\nfountain\nfox\nfragment\nfreeway\nfridge\nfrosting\nfruit\nfryingpan\ngadget\ngainfully\ngallstone\ngamekeeper\ngangway\ngarlic\ngaslight\ngathering\ngauntlet\ngearbox\ngecko\ngem\ngenerator\ngeographer\ngerbil\ngesture\ngetaway\ngeyser\nghoulishly\ngibberish\ngiddiness\ngiftshop\ngigabyte\ngimmick\ngiraffe\ngiveaway\ngizmo\nglasses\ngleeful\nglisten\nglove\nglucose\nglycerin\ngnarly\ngnomish\ngoatskin\ngoggles\ngoldfish\ngong\ngooey\ngorgeous\ngosling\ngothic\ngourmet\ngovernor\ngrape\ngreyhound\ngrill\ngroundhog\ngrumbling\nguacamole\nguerrilla\nguitar\ngullible\ngumdrop\ngurgling\ngusto\ngutless\ngymnast\ngynecology\ngyration\nhabitat\nhacking\nhaggard\nhaiku\nhalogen\nhamburger\nhandgun\nhappiness\nhardhat\nhastily\nhatchling\nhaughty\nhazelnut\nheadband\nhedgehog\nhefty\nheinously\nhelmet\nhemoglobin\nhenceforth\nherbs\nhesitation\nhexagon\nhubcap\nhuddling\nhuff\nhugeness\nhullabaloo\nhuman\nhunter\nhurricane\nhushing\nhyacinth\nhybrid\nhydrant\nhygienist\nhypnotist\nibuprofen\nicepack\nicing\niconic\nidentical\nidiocy\nidly\nigloo\nignition\niguana\nilluminate\nimaging\nimbecile\nimitator\nimmigrant\nimprint\niodine\nionosphere\nipad\niphone\niridescent\nirksome\niron\nirrigation\nisland\nisotope\nissueless\nitalicize\nitemizer\nitinerary\nitunes\nivory\njabbering\njackrabbit\njaguar\njailhouse\njalapeno\njamboree\njanitor\njarring\njasmine\njaundice\njawbreaker\njaywalker\njazz\njealous\njeep\njelly\njeopardize\njersey\njetski\njezebel\njiffy\njigsaw\njingling\njobholder\njockstrap\njogging\njohn\njoinable\njokingly\njournal\njovial\njoystick\njubilant\njudiciary\njuggle\njuice\njujitsu\njukebox\njumpiness\njunkyard\njuror\njustifying\njuvenile\nkabob\nkamikaze\nkangaroo\nkarate\nkayak\nkeepsake\nkennel\nkerosene\nketchup\nkhaki\nkickstand\nkilogram\nkimono\nkingdom\nkiosk\nkissing\nkite\nkleenex\nknapsack\nkneecap\nknickers\nkoala\nkrypton\nlaboratory\nladder\nlakefront\nlantern\nlaptop\nlaryngitis\nlasagna\nlatch\nlaundry\nlavender\nlaxative\nlazybones\nlecturer\nleftover\nleggings\nleisure\nlemon\nlength\nleopard\nleprechaun\nlettuce\nleukemia\nlevers\nlewdness\nliability\nlibrary\nlicorice\nlifeboat\nlightbulb\nlikewise\nlilac\nlimousine\nlint\nlioness\nlipstick\nliquid\nlistless\nlitter\nliverwurst\nlizard\nllama\nluau\nlubricant\nlucidity\nludicrous\nluggage\nlukewarm\nlullaby\nlumberjack\nlunchbox\nluridness\nluscious\nluxurious\nlyrics\nmacaroni\nmaestro\nmagazine\nmahogany\nmaimed\nmajority\nmakeover\nmalformed\nmammal\nmango\nmapmaker\nmarbles\nmassager\nmatchstick\nmaverick\nmaximum\nmayonnaise\nmoaning\nmobilize\nmoccasin\nmodify\nmoisture\nmolecule\nmomentum\nmonastery\nmoonshine\nmortuary\nmosquito\nmotorcycle\nmousetrap\nmovie\nmower\nmozzarella\nmuckiness\nmudflow\nmugshot\nmule\nmummy\nmundane\nmuppet\nmural\nmustard\nmutation\nmyriad\nmyspace\nmyth\nnail\nnamesake\nnanosecond\nnapkin\nnarrator\nnastiness\nnatives\nnautically\nnavigate\nnearest\nnebula\nnectar\nnefarious\nnegotiator\nneither\nnemesis\nneoliberal\nnephew\nnervously\nnest\nnetting\nneuron\nnevermore\nnextdoor\nnicotine\nniece\nnimbleness\nnintendo\nnirvana\nnuclear\nnugget\nnuisance\nnullify\nnumbing\nnuptials\nnursery\nnutcracker\nnylon\noasis\noat\nobediently\nobituary\nobject\nobliterate\nobnoxious\nobserver\nobtain\nobvious\noccupation\noceanic\noctopus\nocular\noffice\noftentimes\noiliness\nointment\nolder\nolympics\nomissible\nomnivorous\noncoming\nonion\nonlooker\nonstage\nonward\nonyx\noomph\nopaquely\nopera\nopium\nopossum\nopponent\noptical\nopulently\noscillator\nosmosis\nostrich\notherwise\nought\nouthouse\novation\noven\nowlish\noxford\noxidize\noxygen\noyster\nozone\npacemaker\npadlock\npageant\npajamas\npalm\npamphlet\npantyhose\npaprika\nparakeet\npassport\npatio\npauper\npavement\npayphone\npebble\npeculiarly\npedometer\npegboard\npelican\npenguin\npeony\npepperoni\nperoxide\npesticide\npetroleum\npewter\npharmacy\npheasant\nphonebook\nphrasing\nphysician\nplank\npledge\nplotted\nplug\nplywood\npneumonia\npodiatrist\npoetic\npogo\npoison\npoking\npoliceman\nponcho\npopcorn\nporcupine\npostcard\npoultry\npowerboat\nprairie\npretzel\nprincess\npropeller\nprune\npry\npseudo\npsychopath\npublisher\npucker\npueblo\npulley\npumpkin\npunchbowl\npuppy\npurse\npushup\nputt\npuzzle\npyramid\npython\nquarters\nquesadilla\nquilt\nquote\nracoon\nradish\nragweed\nrailroad\nrampantly\nrancidity\nrarity\nraspberry\nravishing\nrearrange\nrebuilt\nreceipt\nreentry\nrefinery\nregister\nrehydrate\nreimburse\nrejoicing\nrekindle\nrelic\nremote\nrenovator\nreopen\nreporter\nrequest\nrerun\nreservoir\nretriever\nreunion\nrevolver\nrewrite\nrhapsody\nrhetoric\nrhino\nrhubarb\nrhyme\nribbon\nriches\nridden\nrigidness\nrimmed\nriptide\nriskily\nritzy\nriverboat\nroamer\nrobe\nrocket\nromancer\nropelike\nrotisserie\nroundtable\nroyal\nrubber\nrudderless\nrugby\nruined\nrulebook\nrummage\nrunning\nrupture\nrustproof\nsabotage\nsacrifice\nsaddlebag\nsaffron\nsainthood\nsaltshaker\nsamurai\nsandworm\nsapphire\nsardine\nsassy\nsatchel\nsauna\nsavage\nsaxophone\nscarf\nscenario\nschoolbook\nscientist\nscooter\nscrapbook\nsculpture\nscythe\nsecretary\nsedative\nsegregator\nseismology\nselected\nsemicolon\nsenator\nseptum\nsequence\nserpent\nsesame\nsettler\nseverely\nshack\nshelf\nshirt\nshovel\nshrimp\nshuttle\nshyness\nsiamese\nsibling\nsiesta\nsilicon\nsimmering\nsingles\nsisterhood\nsitcom\nsixfold\nsizable\nskateboard\nskeleton\nskies\nskulk\nskylight\nslapping\nsled\nslingshot\nsloth\nslumbering\nsmartphone\nsmelliness\nsmitten\nsmokestack\nsmudge\nsnapshot\nsneezing\nsniff\nsnowsuit\nsnugness\nspeakers\nsphinx\nspider\nsplashing\nsponge\nsprout\nspur\nspyglass\nsquirrel\nstatue\nsteamboat\nstingray\nstopwatch\nstrawberry\nstudent\nstylus\nsuave\nsubway\nsuction\nsuds\nsuffocate\nsugar\nsuitcase\nsulphur\nsuperstore\nsurfer\nsushi\nswan\nsweatshirt\nswimwear\nsword\nsycamore\nsyllable\nsymphony\nsynagogue\nsyringes\nsystemize\ntablespoon\ntaco\ntadpole\ntaekwondo\ntagalong\ntakeout\ntallness\ntamale\ntanned\ntapestry\ntarantula\ntastebud\ntattoo\ntavern\nthaw\ntheater\nthimble\nthorn\nthroat\nthumb\nthwarting\ntiara\ntidbit\ntiebreaker\ntiger\ntimid\ntinsel\ntiptoeing\ntirade\ntissue\ntractor\ntree\ntripod\ntrousers\ntrucks\ntryout\ntubeless\ntuesday\ntugboat\ntulip\ntumbleweed\ntupperware\nturtle\ntusk\ntutorial\ntuxedo\ntweezers\ntwins\ntyrannical\nultrasound\numbrella\numpire\nunarmored\nunbuttoned\nuncle\nunderwear\nunevenness\nunflavored\nungloved\nunhinge\nunicycle\nunjustly\nunknown\nunlocking\nunmarked\nunnoticed\nunopened\nunpaved\nunquenched\nunroll\nunscrewing\nuntied\nunusual\nunveiled\nunwrinkled\nunyielding\nunzip\nupbeat\nupcountry\nupdate\nupfront\nupgrade\nupholstery\nupkeep\nupload\nuppercut\nupright\nupstairs\nuptown\nupwind\nuranium\nurban\nurchin\nurethane\nurgent\nurologist\nusername\nusher\nutensil\nutility\nutmost\nutopia\nutterance\nvacuum\nvagrancy\nvaluables\nvanquished\nvaporizer\nvaried\nvaseline\nvegetable\nvehicle\nvelcro\nvendor\nvertebrae\nvestibule\nveteran\nvexingly\nvicinity\nvideogame\nviewfinder\nvigilante\nvillage\nvinegar\nviolin\nviperfish\nvirus\nvisor\nvitamins\nvivacious\nvixen\nvocalist\nvogue\nvoicemail\nvolleyball\nvoucher\nvoyage\nvulnerable\nwaffle\nwagon\nwakeup\nwalrus\nwanderer\nwasp\nwater\nwaving\nwheat\nwhisper\nwholesaler\nwick\nwidow\nwielder\nwifeless\nwikipedia\nwildcat\nwindmill\nwipeout\nwired\nwishbone\nwizardry\nwobbliness\nwolverine\nwomb\nwoolworker\nworkbasket\nwound\nwrangle\nwreckage\nwristwatch\nwrongdoing\nxerox\nxylophone\nyacht\nyahoo\nyard\nyearbook\nyesterday\nyiddish\nyield\nyo-yo\nyodel\nyogurt\nyuppie\nzealot\nzebra\nzeppelin\nzestfully\nzigzagged\nzillion\nzipping\nzirconium\nzodiac\nzombie\nzookeeper\nzucchini");

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
/******/ 	__webpack_require__("./src/fuerte.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;