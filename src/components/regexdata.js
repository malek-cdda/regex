export const regexData = [
  {
    label: "Character Class",
    data: [
      {
        name: "characterSet",
        active: false,
        value: "(?=^.{8,}$)",
        realValue: "(?=^.{8,}$)",
      },
      {
        name: "negatedSet",
        active: false,
        value: "((?=.*d)|(?=.*W+))",
        realValue: "((?=.*d)|(?=.*W+))",
      },
      {
        name: "range",
        active: false,
        value: "(?=.*[A-Z])(?=.*[a-z])",
        realValue: "(?=.*[A-Z])(?=.*[a-z])",
      },
      {
        name: "matchAny",
        active: false,
        value:
          "(?=^.{8,}$)((?=.*\\d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
        realValue:
          "(?=^.{8,}$)((?=.*\\d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
      },
      {
        name: "word",
        active: false,
        // prettier-ignore
        value: "\\w",
        realValue: "\\w",
      },
      {
        name: "notWord",
        active: false,
        value: "\\W",
        realValue: "\\W",
      },
      {
        name: "digit",
        active: false,
        // prettier-ignore
        value: "(\\d{3})",
        realValue: "\\d",
      },
      {
        name: "notDigit",
        active: false,
        value: "\\D",
        realValue: "\\D",
      },
      {
        name: "whiteSpace",
        active: false,
        value: "\\s",
        realValue: "\\s",
      },
      {
        name: "notWhiteSpace",
        active: false,
        value: "\\S",
        realValue: "\\S",
      },
    ],
  },
  {
    label: "Anchors",
    data: [
      {
        name: "start",
        active: false,
        value: "^",
        realValue: "^",
      },
      {
        name: "end",
        active: false,
        value: "$",
        realValue: "$",
      },
      {
        name: "wordBoundary",
        active: false,
        value: "b",
        realValue: "b",
      },
      {
        name: "notWordBoundary",
        active: false,
        value: "B",
        realValue: "B",
      },
    ],
  },
  {
    label: "escapedCharacter",
    data: [
      {
        name: "octalEscape",
        active: false,
        value: "0",
        realValue: "0",
      },
      {
        name: "hexadecimalEscape",
        active: false,
        value: "xFF",
        realValue: "xFF",
      },
      {
        name: "unicodeEscape",
        active: false,
        value: "uFFFF",
        realValue: "uFFFF",
      },
      {
        name: "controlCharacter",
        active: false,
        value: "cI",
        realValue: "cI",
      },
      {
        name: "tab",
        active: false,
        value: "t",
        realValue: "t",
      },
      {
        name: "lineFeed",
        active: false,
        value: "n",
        realValue: "n",
      },
      {
        name: "verticalTab",
        active: false,
        value: "v",
        realValue: "v",
      },
      {
        name: "formFeed",
        active: false,
        value: "f",
        realValue: "f",
      },
      {
        name: "carriageReturn",
        active: false,
        value: "r",
        realValue: "r",
      },
      {
        name: "nullCharacter",
        active: false,
        value: "0",
        realValue: "0",
      },
    ],
  },
  {
    label: "groupReference",
    data: [
      {
        name: "capturingGroup",
        active: false,
        value: "(ABC)",
        realValue: "(ABC)",
      },
      {
        name: "namedCapturingGroup",
        active: false,
        value: "(?<name>ABC)",
        realValue: "(?<name>ABC)",
      },
      {
        name: "numericBackReference",
        active: false,
        value: "1",
        realValue: "1",
      },
      {
        name: "nonCapturingGroup",
        active: false,
        value: "(?:ABC)",
        realValue: "(?:ABC)",
      },
    ],
  },
  {
    label: "lookaHead",
    data: [
      {
        name: "positiveLookAhead",
        active: false,
        value: "(?=ABC)",
        realValue: "(?=ABC)",
      },
      {
        name: "negativeLookAhead",
        active: false,
        value: "(?!ABC)",
        realValue: "(?!ABC)",
      },
      {
        name: "positiveLookBehind",
        active: false,
        value: "(?<=ABC)",
        realValue: "(?<=ABC)",
      },
      {
        name: "negativeLookBehind",
        active: false,
        value: "(?<!ABC)",
        realValue: "(?<!ABC)",
      },
    ],
  },
  {
    label: "quantityAlternation",
    data: [
      {
        name: "plus",
        active: false,
        value: "+",
        realValue: "+",
      },
      {
        name: "star",
        active: false,
        value: "*",
        realValue: "*",
      },
      {
        name: "quantifier",
        active: false,
        value: "{1,3}",
        realValue: "{1,3}",
      },
      {
        name: "optional",
        active: false,
        value: "?",
        realValue: "?",
      },
      {
        name: "lazy",
        active: false,
        value: "?",
        realValue: "?",
      },
      {
        name: "alternation",
        active: false,
        value: "|",
        realValue: "|",
      },
    ],
  },
  {
    label: "substitution",
    data: [
      {
        name: "match",
        active: false,
        value: "$&",
        realValue: "$&",
      },
      {
        name: "captureGroup",
        active: false,
        value: "$1",
        realValue: "$1",
      },
      {
        name: "beforeMatch",
        active: false,
        value: "$`",
        realValue: "$`",
      },
      {
        name: "afterMatch",
        active: false,
        value: "$'",
        realValue: "$'",
      },
      {
        name: "escapedDollar",
        active: false,
        value: "$$",
        realValue: "$$",
      },
      {
        name: "escapedCharacter",
        active: false,
        value: "n",
        realValue: "n",
      },
    ],
  },
  {
    label: "flag",
    data: [
      {
        name: "global",
        active: false,
        value: "g",
        realValue: "g",
      },
      {
        name: "ignoreCase",
        active: false,
        value: "i",
        realValue: "i",
      },
      {
        name: "multiline",
        active: false,
        value: "m",
        realValue: "m",
      },
      {
        name: "unicode",
        active: false,
        value: "u",
        realValue: "u",
      },
      {
        name: "sticky",
        active: false,
        value: "y",
        realValue: "y",
      },
      {
        name: "dotAll",
        active: false,
        value: "s",
        realValue: "s",
      },
    ],
  },
  {
    label: "myTarget",
    data: [
      {
        name: "question",
        active: false,
        value: "?",
        realValue: "?",
      },
      {
        name: "equal",
        active: false,
        value: "=",
        realValue: "=",
      },
      {
        name: "dot",
        active: false,
        value: ".",
        realValue: ".",
      },
      {
        name: "uptick",
        active: false,
        value: "^",
        realValue: "^",
      },
      {
        name: "star",
        active: false,
        value: "*",
        realValue: "*",
      },
      {
        name: "bracketleft",
        active: false,
        value: "(",
        realValue: "(",
      },
      {
        name: "bracketright",
        active: false,
        value: ")",
        realValue: ")",
      },
      {
        name: "dollar",
        active: false,
        value: "$",
        realValue: "$",
      },
    ],
  },
];
