import words from './eff_short_wordlist_1.txt'

let bank = []

const Fuerte = function() {
  this._listeners = []
  this._symbols = false
  this._capitalize = false
  this._numbers = false
  this._separator = Fuerte.SEPARATOR_SPACES
  this.type(Fuerte.TYPE_MEMORABLE)
}

Fuerte.DIGITS = '0123456789'
Fuerte.SYMBOLS = '!@#_-.*%'
Fuerte.LOWER = 'abcdefghijklmnopqrstuvwxyz'
Fuerte.UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

Fuerte.TYPE_RANDOM = 'random'
Fuerte.TYPE_MEMORABLE = 'memorable'
Fuerte.TYPE_PIN = 'pin'

Fuerte.SEPARATOR_SPACES = ' '
Fuerte.SEPARATOR_HYPHENS = '-'
Fuerte.SEPARATOR_PERIODS = '.'
Fuerte.SEPARATOR_COMMAS = ','
Fuerte.SEPARATOR_UNDERSCORES = '_'
Fuerte.SEPARATOR_DIGITS = '0'
Fuerte.SEPARATOR_DIGITS_AND_SYMBOLS = '0_'

const minSize = []
minSize[Fuerte.TYPE_RANDOM] = 8
minSize[Fuerte.TYPE_MEMORABLE] = 4
minSize[Fuerte.TYPE_PIN] = 3

const maxSize = []
maxSize[Fuerte.TYPE_RANDOM] = 100
maxSize[Fuerte.TYPE_MEMORABLE] = 15
maxSize[Fuerte.TYPE_PIN] = 12

const rand = (elements) => {
  var random = new Uint32Array(1);
  window.crypto.getRandomValues(random)
  return parseFloat('0.' + random[0].toString())
}

const containsChars = (string, banks) => {
  if (banks.length < 1) {
    return true
  }

  for(let bank of banks) {
    let chars = bank.split('')
    let contains = false
    for(let char of chars) {
      if (string.indexOf(char) > -1) {
        contains = true
        break
      }
    }
    if (!contains) {
      return false
    }
  }

  return true
}

const first = (elements) => {
  return elements.length ? elements[0] : null
}

const randomChars = (from, length) => {
  if (from.length < 1) {
    return null
  }
  if (!length) {
    length = 1
  }
  let bank = []
  let random = []
  while (random.length < length) {
    if (bank.length < 1) {
      bank = from.split('')
    }
    let i = Math.round(rand() * (bank.length-1))
    random.push(bank[i])
    bank.splice(i, 1)
  }
  return random.join('')
}

const shuffle = (string) => {
  var a = string.split(""),
    n = a.length;

  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return string.join("");
}

Fuerte.prototype.addEventListener = function(listener) {
  this._listeners.push(listener)
  return this
}

Fuerte.prototype.removeEventListener = function(listener) {
  for (let i in this._listeners) {
    if (this._listeners[i] === listener) {
      this._listeners.splice(i, 1)
      break;
    }
  }
  return this
}

Fuerte.prototype.fire = function(event, data) {
  for (let listener of this._listeners) {
    listener(event, data)
  }
  return this
}

Fuerte.prototype.fireChangeEvent = function() {
  return this.fire('change', {
    type: this._type,
    size: this._size,
    capitalize: this._capitalize,
    numbers: this._numbers,
    symbols: this._symbols,
    size_min: minSize[this._type],
    size_max: maxSize[this._type],
  })
}

Fuerte.prototype.type = function(type) {
  this._type = type
  this.fireChangeEvent()
  return this.size(0) // uses default min
}

Fuerte.prototype.random = function() {
  return this.type(Fuerte.TYPE_RANDOM)
}

Fuerte.prototype.memorable = function() {
  return this.type(Fuerte.TYPE_MEMORABLE)
}

Fuerte.prototype.pin = function() {
  return this.type(Fuerte.TYPE_PIN)
}

Fuerte.prototype.symbols = function(bool) {
  this._symbols = bool === undefined ? true : !!bool
  this.fireChangeEvent()
  return this
}

Fuerte.prototype.numbers = function(bool) {
  this._numbers = bool === undefined ? true : !!bool
  this.fireChangeEvent()
  return this
}

Fuerte.prototype.separator = function(separator) {
  this._separator = separator
  this.fireChangeEvent()
  return this
}

Fuerte.prototype.capitalize = function(bool) {
  this._capitalize = bool === undefined ? true : !!bool
  this.fireChangeEvent()
  return this
}

Fuerte.prototype.size = function(number) {
  let n = parseInt(number)
  this._size = Math.max(minSize[this._type], Math.min(n, maxSize[this._type]))
  this.fireChangeEvent()
  return this
}

Fuerte.prototype.word = function() {
  if (bank.length < 1) {
    bank = words.split("\n")
  }
  let i = Math.round(rand() * (bank.length-1))
  let word = bank[i]
  bank.splice(i, 1)
  return word
}

Fuerte.prototype.toString = function() {
  return this.make()
}

Fuerte.prototype.make = function() {
  let password = null

  // Make a pin-type password
  if (this._type === Fuerte.TYPE_PIN) {
    password = randomChars(Fuerte.DIGITS, this._size)

  // Make a memorable-type password
  } else if (this._type === Fuerte.TYPE_MEMORABLE) {
    let words = []
    for (let i = 0; i < this._size; i++) {
      words.push(this.word())
    }
    if (this._capitalize) {
      let which = Math.round(rand() * (words.length-1))
      words[which] = words[which].toUpperCase()
    }
    let separatorBanks = []
    let separator = this._separator
    if (this._separator === Fuerte.SEPARATOR_DIGITS) {
      separator = Fuerte.DIGITS
      separatorBanks.push(Fuerte.DIGITS)
    } else if (this._separator === Fuerte.SEPARATOR_DIGITS_AND_SYMBOLS) {
      separator = Fuerte.DIGITS + Fuerte.SYMBOLS
      separatorBanks.push(Fuerte.DIGITS)
      separatorBanks.push(Fuerte.SYMBOLS)
    }
    do {
      password = ''
      for (let i in words) {
        password += words[i]
        if (i < words.length - 1) {
          password += randomChars(separator, 1)
        }
      }
    } while (!containsChars(password, separatorBanks))

  // Make a random password
  } else {
    let banks = []
    banks.push(Fuerte.UPPER)
    banks.push(Fuerte.LOWER)
    if (this._symbols) {
      banks.push(Fuerte.SYMBOLS)
    }
    if (this._numbers) {
      banks.push(Fuerte.DIGITS)
    }
    do {
      password = randomChars(banks.join(''), this._size)
    } while (!containsChars(password, banks))
  }

  this.fire('make', { password })
  return password
}

Fuerte.prototype.form = function(el) {
  let instance = this

  let password = first(el.querySelectorAll(':scope [data-fuerte="password"]'))

  let btnGenerate = first(el.querySelectorAll(':scope [data-fuerte="generate"]'))
  if (btnGenerate) {
    btnGenerate.addEventListener('click', (e) => {
      instance.make()
      e.preventDefault()
    })
  }

  let selectType = first(el.querySelectorAll(':scope [data-fuerte="type"]'))
  if (selectType) {
    selectType.addEventListener('change', (e) => {
      instance.type(selectType.value)
      instance.make()
    })
  }

  let selectSeparator = first(el.querySelectorAll(':scope [data-fuerte="separator"]'))
  if (selectSeparator) {
    selectSeparator.addEventListener('change', (e) => {
      instance.separator(selectSeparator.value)
      instance.make()
    })
  }

  let checkCapitalize = first(el.querySelectorAll(':scope [data-fuerte="capitalize"]'))
  if (checkCapitalize) {
    checkCapitalize.addEventListener('change', (e) => {
      instance.capitalize(checkCapitalize.checked)
      instance.make()
    })
  }

  let checkNumbers = first(el.querySelectorAll(':scope [data-fuerte="numbers"]'))
  if (checkNumbers) {
    checkNumbers.addEventListener('change', (e) => {
      instance.numbers(checkNumbers.checked)
      instance.make()
    })
  }

  let checkSymbols = first(el.querySelectorAll(':scope [data-fuerte="symbols"]'))
  if (checkSymbols) {
    checkSymbols.addEventListener('change', (e) => {
      instance.symbols(checkSymbols.checked)
      instance.make()
    })
  }

  let rangeSize = first(el.querySelectorAll(':scope [data-fuerte="size"]'))
  let rangeSizeLabel = null
  if (rangeSize) {
    rangeSize.addEventListener('change', (e) => {
      instance.size(rangeSize.value)
      instance.make()
    })
    if (rangeSize.id) {
      rangeSizeLabel = first(document.querySelectorAll('label[for="' + rangeSize.id + '"]'))
    }
  }

  instance.addEventListener((event, data) => {
    if (event === 'make') {
      if (password) {
        password.value = data.password
      }
    }

    if (event === 'change') {
      if (checkCapitalize) {
        checkCapitalize.value = data.capitalize
        checkCapitalize.disabled = data.type !== Fuerte.TYPE_MEMORABLE
      }
      if (checkNumbers) {
        checkNumbers.value = data.numbers
        checkNumbers.disabled = data.type !== Fuerte.TYPE_RANDOM
      }
      if (checkSymbols) {
        checkSymbols.value = data.symbols
        checkSymbols.disabled = data.type !== Fuerte.TYPE_RANDOM
      }
      if (selectSeparator) {
        selectSeparator.disabled = data.type !== Fuerte.TYPE_MEMORABLE
      }
      if (rangeSize) {
        rangeSize.min = data.size_min
        rangeSize.max = data.size_max
        rangeSize.value = data.size
        rangeSize.step = 1
        if (rangeSizeLabel) {
          let label = data.size
          if (data.type === Fuerte.TYPE_MEMORABLE) {
            label += ' words'
          } else if (data.type === Fuerte.TYPE_PIN) {
            label += ' digits'
          } else {
            label += ' characters'
          }
          rangeSizeLabel.innerHTML = label
        }
      }
    }
  })

  instance.fireChangeEvent()

  instance.make()
}

export { Fuerte }

export default function(el) {
  let instance = new Fuerte()
  if (el) {
    instance.form(el)
  }
  return instance
}