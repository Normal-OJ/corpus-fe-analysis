import { trimPrefix } from '@/util/util'

const roleChoices = [
    "Target_Child",
    "Target_Adult",
    "Child",
    "Mother",
    "Father",
    "Brother",
    "Sister",
    "Sibling",
    "Grandfather",
    "Grandmother",
    "Relative",
    "Participant",
    "Investigator",
    "Partner",
    "Boy",
    "Girl",
    "Adult",
    "Teenager",
    "Male",
    "Female",
    "Visitor",
    "Friend",
    "Playmate",
    "Caretaker",
    "Environment",
    "Group",
    "Unidentified",
    "Uncertain",
    "Other",
    "Text",
    "Media",
    "PlayRole",
    "LENA",
    "Justice",
    "Attorney",
    "Doctor",
    "Nurse",
    "Student",
    "Teacher",
    "Host",
    "Guest",
    "Leader",
    "Member",
    "Narrator",
    "Speaker",
    "Audience",
]
const raceChoices = [
    'Asian',
    'Black',
    'Latino',
    'Multiple',
    'Native',
    'Pacific',
    'Unknown',
    'White',
]
const SESChoices = [
    'UNK',
    'WC',
    'UC',
    'MC',
    'LI',
]
const educationChoices = [
    'Elem',
    'HS',
    'UG',
    'Grad',
    'Doc',
]
const sexChoices = {
    '男': "male",
    '女': "female",
    '未知': "unknown",
}

class Speaker {
    constructor(
        language,
        corpus = '',
        nameCode,
        age = '',
        sex = '',
        group = '',
        SES = '',
        role,
        education = '',
        customField = '',
        name = '',
        race = '',
    ) {
        this.language = language;
        this.corpus = corpus;
        this.nameCode = nameCode;
        this.age = age;
        this.sex = sex;
        this.group = group;
        this.SES = SES;
        this.role = role;
        this.education = education;
        this.customField = customField;
        this.name = name;
        this.race = race;
    }

    /**
     * deserialize header to a Speaker
     * @param {String} header 
     * @returns {Speaker} 
     */
    static deserializeHeader(header) {
        let attrs = header.split('|');
        if (attrs.length != 10)
            throw 'Invalid header format';
        return new Speaker()
    }

    /**
     * parse string like "4;05.07" to a age structure
     * @param {String} a 
     */
    static parsedAge(a) {
        let y, m, d;
        let _;
        y = m = d = '';
        if (!a) return { y, m, d };
        // strip space
        a = a.trim();
        if (a.match(/^\d{1,2};\d\d:\d\d$/g)) {
            // all occurred
            [y, m, d] = a.split(/[:;]/g);
        } else if (a.match(/^\d{1,2};\d\d:$/g)) {
            // only year and month
            [y, m, _] = a.split(/[:;]/g);
        } else if (a.match(/^\d{1,2};$/g)) {
            // only year
            [y, _] = a.split(';');
        } else {
            // invalid input
            throw 'not a valid format';
        }
        return { y, m, d };
    }

    /**
     * use this function to format month and day to the form accepted by Chat file
     * @param {String} d 
     */
    static formatMonthOrDay(d) {
        if (!d) return '';
        if (d.length > 2)
            return d.slice(-2);
        else
            return d.padStart(2, '0');
    }

    /**
     * formatted age
     */
    get ageString() {
        let ret = '';
        if ('y' in this.age) {
            ret += trimPrefix(this.age.trim(), '0') + ';';
            if ('m' in this.age) {
                ret += this.formatMonthOrDay(this.age.m) + '.';
                if ('d' in this.age) {
                    ret += this.formatMonthOrDay(this.age.d);
                }
            }
        }
        return ret;
    }

    /**
     * parse the SES field in ID header into race and SES
     * @param {String} s SES attribute in the ID header, e.g. Asian,WC 
     */
    static parsedSES(s) {
        // the two 
        if (s.indexOf(',') !== -1) {
            [this.race, this.SES] = s.trim().split(',').forEach(x => x.trim());
        }
    }

    get SESString() {
        return [this.race, this.SES].filter(x => x).join(',');
    }

    /**
     * ID header for this speaker (without newline)
     * format: language|corpus|code|age|sex|group|SES|role|education|custom|
     */
    get header() {
        let infos = [
            this.language,
            this.corpus,
            this.nameCode,
            this.ageString,
            this.sex,
            this.group,
            this.SESString,
            this.role,
            this.education,
            this.customField,
        ];
        return `@ID:\t${infos.join("|")}|`;
    }
}

export {
    Speaker,
    roleChoices,
    raceChoices,
    SESChoices,
    educationChoices,
    sexChoices,
};
