//@ts-check

function freqTable(str, chars = 1) {
  let table = {};
  for (let i = 0; i < str.length; i++) {
    //
    ch = str.substring(i, i + chars - 1);
    if (!table.hasOwnProperty(ch)) table.ch = 1;
    else table.ch += 1;
  }
  return table;
}

function freqTable(str, chars = 1) {
  let chrs = [];
  let freqs = [];
  for (let i = 0; i < str.length; i++) {
    //
    ch = str.substring(i, i + chars);
    //renders > as " &gt; "
    let idx;
    idx = chrs.indexOf(ch);
    if (idx == -1) {
      chrs.push(ch);
      freqs.push(1);
    } else freqs[idx] += 1;
  }
  let table = [];
  chrs.forEach((e, i) => table.push([chrs[i], freqs[i]]));
  return table;
}

function sortTable(table) {
  return table.sort((a, b) => b[1] - a[1]); //sort from highest to lowest freuqency
}

//TODO
//input is [ reslt of chars=1, result of chars=2 ... ]
function abridge(arrays) {
  // lf = least-frequent of the highest-char array
  // find all the lower-char components
  // if the frequency of lf is the same as all the lower-char components:
  //		remove all the lower-char components
  // else:
  //		remove lf (?)
}

/**
 *
 * @param {Array} table
 * @returns
 */

/**
 *
 * @param {string} totallyAString
 * @returns
 */
function TotallyPassAString(totallyAString) {
  return totallyAString;
}
TotallyPassAString();

function huffmanTree(table) {
  while (table.length > 1) {
    table.sort((a, b) => b[1] - a[1]); //highest to lowest freq
    a = table.pop();
    b = table.pop();
    ab = [[a[0], b[0]], a[1] + b[1]];
    //if I wanted more elegance I would insert in a way that doesn't require a full sort
    //but I don't
    table.push(ab);
  }
  return table[0][0];
}

function encodeChar(ch, subtree, path = "") {
  if (Array.isArray(subtree)) {
    let output = "";
    output += encodeChar(ch, subtree[0], path + "0");
    output += encodeChar(ch, subtree[1], path + "1");
    return output;
  } else if (ch == subtree) {
    return path;
  } else {
    return "";
  }
}

function encode(text, huffTree, chars = 1) {
  let output = "";
  for (let i = 0; i < text.length; i += chars) {
    ch = text.substring(i, i + chars);
    e = encodeChar(ch, huffTree);
    while (e == "" && chars > 1) {
      e = encode(ch, huffTree, chars - 1);
      chars--;
    }
    //output = e + output;
    output += e;
  }
  return output;
}

function bin2charCode(bin, bytes) {
  let chunks = Math.ceil(bin.length / bytes);
  let output = "";
  for (let i = 0; i < chunks; i++) {
    let chk = bin.substring(i * bytes, (i + 1) * bytes);
    chk = chk.split("").reverse().join("");
    let cc = parseInt(chk, 2);
    output += String.fromCodePoint(cc);
  }
  return output;
}

//takes the output of console.log for the huffman tree
function shortenArray(arStr) {
  let a = arStr;
  a = a.replace(/"[\[\], ]"/g, "`$&`");
  a = a.replace(/, /g, ",");
  a = a.replace(/"/g, "");
  a = a.replace(/&amp;/g, `&`);
  a = a.replace(/&gt;/g, `>`);
  a = a.replace(/&lt;/g, `<`);
  a = a.replace(/&quot;/g, `"`);
  return a;
}

/*the technique used in bytebeats featuring
    "unescape(escape(str).replace(/u(..)/g,"$1%"))" */
//(also, don't use toString() on the Huffman tree, it flattens it)
function minibake(str) {
  str = str.replace(/, /g, ",");
  let len = Math.floor(str.length / 2);
  let output = "";
  for (i = 0; i < len; i++) {
    c1 = str.substring(i * 2, i * 2 + 1);
    c2 = str.substring(i * 2 + 1, i * 2 + 2);
    cc1 = c1.charCodeAt(0);
    cc2 = c2.charCodeAt(0);
    cmb = (cc1 << 8) | cc2;
    //output += String.fromCharCode(cmb);
    output += String.fromCodePoint(cmb);
  }
  return output;
}

test = `(t>>t%(t&1?t>>15&1?51:t>>14&3?58:65:39)&t>>4&255)/2+(3e5/(t-(t>>2&1024)&4095)&63)+(t>>11&1)*((t>>15&1?19:t>>14&3?17:15)/10*t%78+((t>>9&3)+2)*(t>>15&1?30:t>>14&3?27:20)/20*t%39)/1.5;`;

testTable = freqTable(test, 1);
testTree = huffmanTree(testTable);
testEncoding = encode(test, testTree, 1);
console.log(testTree);
console.log(testEncoding);

c = bin2charCode(testEncoding, 16);
console.log(c);

d = testTree;

o = "";

u = (index, subtree) => (
  //s = subtree[ (c >> index) & 1 ], //c as number
  (s = subtree[(c.charCodeAt(index / 16) >> index % 16) & 1]),
  s == ";" ? 0 : (Array.isArray(s) ? 0 : ((o += s), (s = d)), u(index + 1, s))
);

u(0, d);

console.log(o);
