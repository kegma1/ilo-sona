import re
import json

def write_to_json(words):
    with open("dictionary.json", "w") as outfile:
        json.dump([word.__dict__ for word in words], outfile)

class Word:
    def __init__(self, word, defs, alias=None):
        self.word = word
        self.defs = defs
        self.alias = alias
        
    def __str__(self):
        defs = ""
        for def_ in self.defs:
            for k, v in def_.items():
                defs += f"\t{k}: {v}\n"
        return f'word: {self.word}\nalias: {self.alias}\ndefs:\n{defs}'


def parse_string(string):
    word_regex = re.compile(r'(?<=\<w lang\=\"toki\">)(.*)(?=\<\/w\>)')
    match = word_regex.search(string)
    word = ""
    alias = None
    if match:
        word = match.group()
        if ' <sep></sep> ' in word:
            word, alias = word.split(' <sep></sep> ')
        else:
            alias = None
    else:
        return None
    defs = {}
    for def_match in re.finditer(r'<t[^>]*><pos>([^<]+)</pos>(.*?)</t>', string, re.DOTALL):
        pos, span = def_match.groups()
        meanings = re.findall(r'<span[^>]*>([^<]+)</span>', span)
        if pos not in defs:
            defs[pos] = []
        defs[pos].extend(meanings)
    if ' <sep> ' in word:
        word, alias = word.split(' <sep> ')
        word = word + "<sep></sep>" + alias
    return Word(word, defs, alias)



def parse_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    words = []
    for match in re.finditer(r'<div>.*?(<w.*?</w>).*?<ts>.*?</ts>.*?</div>', content, re.DOTALL):
        w = match.group()
        word = parse_string(w)
        if word:
            words.append(word)
    return words



filepath = './dict.txt'
words = parse_file(filepath)
write_to_json(words)

    

