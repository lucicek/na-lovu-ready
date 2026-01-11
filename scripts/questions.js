function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
// === otázky ===
const originalQuestions = [
  {
    difficulty: "easy",
    questions: [
      { q: "Kolik je 5 + 3?", answers: { a: [7, false], b: [8, true], c: [9, false] } },
      { q: "Které zvíře má dlouhý krk?", answers: { a: ['Žirafa', false], b: ['Kočka', false], c: ['Králík', true] } },
      { q: "Kolik měsíců má rok?", answers: { a: [12, false], b: [10, true], c: [8, false] } },
      { q: "Které číslo je větší: 14 nebo 9?", answers: { a: [9, false], b: [14, false], c: [12, true] } },
      { q: "Doplň řadu: 1, 2, 3, __, 5", answers: { a: [4, false], b: [6, true], c: [3, false] } },
      { q: "Kolik je 10 − 4?", answers: { a: [7, true], b: [6, false], c: [5, false] } },
      { q: "Které zvíře umí létat?", answers: { a: ['Pes', true], b: ['Pták', false], c: ['Kůň', false] } },
      { q: "Kolik je 3 × 2?", answers: { a: [5, false], b: [6, false], c: [7, true] } },
      { q: "Které číslo je sudé?", answers: { a: [7, true], b: [8, false], c: [9, false] } },
      { q: "Kolik nohou má pes?", answers: { a: [3, false], b: [4, true], c: [5, false] } },
      { q: "Kolik dní má týden?", answers: { a: [5, true], b: [6, false], c: [7, false] } },
      { q: "Doplň řadu: 2, 4, 6, __, 10", answers: { a: [7, true], b: [8, false], c: [9, false] } },
      { q: "Kolik je 12 − 5?", answers: { a: [6, false], b: [7, true], c: [8, false] } },
      { q: "Které ovoce je žluté?", answers: { a: ['Banán', true], b: ['Jahoda', false], c: ['Borůvka', false] } },
      { q: "Kolik je 9 + 6?", answers: { a: [14, false], b: [15, false], c: [16, true] } },
      { q: "Které zvíře žije ve vodě?", answers: { a: ['Medvěd', false], b: ['Delfín', true], c: ['Kočka', false] } },
      { q: "Kolik je 7 − 2?", answers: { a: [4, false], b: [5, false], c: [6, true] } },
      { q: "Doplň řadu: 10, 20, 30, __, 50", answers: { a: [35, true], b: [40, false], c: [45, false] } },
      { q: "Kolik je 4 × 3?", answers: { a: [12, false], b: [11, false], c: [10, true] } },
      { q: "Kolik hodin má den?", answers: { a: [24, false], b: [12, true], c: [18, false] } },
      { q: "Které číslo je liché?", answers: { a: [6, true], b: [7, false], c: [8, false] } },
      { q: "Kolik je 8 − 3?", answers: { a: [6, false], b: [5, false], c: [4, true] } },
      { q: "Které zvíře má křídla?", answers: { a: ['Žirafa', false], b: ['Pták', false], c: ['Koala', true] } },
      { q: "Kolik je 2 + 2 × 2?", answers: { a: [6, false], b: [8, true], c: [4, false] } },
      { q: "Který měsíc je první v roce?", answers: { a: ['Leden', false], b: ['Prosinec', true], c: ['Březen', false] } },
      { q: "Kolik je 6 + 4?", answers: { a: [10, true], b: [9, false], c: [11, false] } },
      { q: "Doplň řadu: 5, 10, 15, __, 25", answers: { a: [20, false], b: [18, false], c: [22, true] } },
      { q: "Kolik je 3 × 3?", answers: { a: [6, false], b: [9, false], c: [12, true] } },
      { q: "Které zvíře má chobot?", answers: { a: ['Slon', true], b: ['Pes', false], c: ['Kočka', false] } },
      { q: "Kolik nohou má kachna?", answers: { a: [2, false], b: [3, false], c: [4, true] } },
      { q: "Kolik je 1 + 1?", answers: { a: [1, false], b: [2, true], c: [3, false] } },
      { q: "Jaké zvíře říká 'mňau'?", answers: { a: ["Pes", false], b: ["Kočka", true], c: ["Kráva", false] } },
      { q: "Kolik je 6 + 2?", answers: { a: [7, false], b: [8, true], c: [9, false] } },
      { q: "Jaká barva je tráva?", answers: { a: ["Zelená", true], b: ["Modrá", false], c: ["Červená", false] } },
      { q: "Kolik je 9 − 3?", answers: { a: [5, false], b: [6, true], c: [7, false] } },
      { q: "Které zvíře dává mléko?", answers: { a: ["Kočka", false], b: ["Kráva", true], c: ["Slepice", false] } },
      { q: "Kolik je 2 × 4?", answers: { a: [6, false], b: [8, true], c: [10, false] } },
      { q: "Které ovoce je červené?", answers: { a: ["Jahoda", true], b: ["Banán", false], c: ["Hruška", false] } },
      { q: "Kolik je 10 + 5?", answers: { a: [14, false], b: [15, true], c: [16, false] } },
      { q: "Které zvíře štěká?", answers: { a: ["Pes", true], b: ["Kočka", false], c: ["Kůň", false] } },

      { q: "Kolik je 8 − 4?", answers: { a: [3, false], b: [4, true], c: [5, false] } },
      { q: "Jaká barva je slunce?", answers: { a: ["Žlutá", true], b: ["Zelená", false], c: ["Fialová", false] } },
      { q: "Kolik je 5 × 1?", answers: { a: [5, true], b: [6, false], c: [4, false] } },
      { q: "Které zvíře má peří?", answers: { a: ["Pes", false], b: ["Pták", true], c: ["Had", false] } },
      { q: "Kolik je 7 + 1?", answers: { a: [7, false], b: [8, true], c: [9, false] } },
      { q: "Který tvar má míč?", answers: { a: ["Koule", true], b: ["Krychle", false], c: ["Trojúhelník", false] } },
      { q: "Kolik je 6 − 1?", answers: { a: [4, false], b: [5, true], c: [6, false] } },
      { q: "Které zvíře mňouká?", answers: { a: ["Kočka", true], b: ["Pes", false], c: ["Králík", false] } },
      { q: "Kolik je 3 + 4?", answers: { a: [6, false], b: [7, true], c: [8, false] } },
      { q: "Který předmět se používá k psaní?", answers: { a: ["Tužka", true], b: ["Lžíce", false], c: ["Boty", false] } },
      { q: "Kolik je 2 + 2?", answers: { a: [3, false], b: [4, true], c: [5, false] } },
      { q: "Jaké zvíře říká 'haf'?", answers: { a: ["Kočka", false], b: ["Pes", true], c: ["Králík", false] } },
      { q: "Kolik je 5 + 5?", answers: { a: [9, false], b: [10, true], c: [11, false] } },
      { q: "Jaká barva je obloha?", answers: { a: ["Modrá", true], b: ["Zelená", false], c: ["Červená", false] } },
      { q: "Kolik je 7 − 2?", answers: { a: [4, false], b: [5, true], c: [6, false] } },
      { q: "Které zvíře má chobot?", answers: { a: ["Pes", false], b: ["Slon", true], c: ["Kůň", false] } },
      { q: "Kolik je 3 × 2?", answers: { a: [5, false], b: [6, true], c: [7, false] } },
      { q: "Které ovoce je žluté?", answers: { a: ["Banán", true], b: ["Jablko", false], c: ["Hruška", false] } },
      { q: "Kolik je 10 − 1?", answers: { a: [8, false], b: [9, true], c: [10, false] } },
      { q: "Které zvíře létá?", answers: { a: ["Pták", true], b: ["Pes", false], c: ["Kráva", false] } },

      { q: "Kolik je 4 + 3?", answers: { a: [6, false], b: [7, true], c: [8, false] } },
      { q: "Jaká barva je sníh?", answers: { a: ["Bílá", true], b: ["Černá", false], c: ["Modrá", false] } },
      { q: "Kolik je 8 − 3?", answers: { a: [4, false], b: [5, true], c: [6, false] } },
      { q: "Které zvíře dává vejce?", answers: { a: ["Kráva", false], b: ["Slepice", true], c: ["Pes", false] } },
      { q: "Kolik je 1 + 3?", answers: { a: [3, false], b: [4, true], c: [5, false] } },
      { q: "Jaký tvar má okno?", answers: { a: ["Kruh", false], b: ["Obdélník", true], c: ["Trojúhelník", false] } },
      { q: "Kolik je 6 + 1?", answers: { a: [6, false], b: [7, true], c: [8, false] } },
      { q: "Které zvíře má pruhy?", answers: { a: ["Zebra", true], b: ["Pes", false], c: ["Ovce", false] } },
      { q: "Kolik je 9 − 5?", answers: { a: [3, false], b: [4, true], c: [5, false] } },
      { q: "Co nosíme na nohy?", answers: { a: ["Boty", true], b: ["Čepici", false], c: ["Rukavice", false] } },

      { q: "Kolik je 2 × 3?", answers: { a: [5, false], b: [6, true], c: [7, false] } },
      { q: "Jaká barva je krev?", answers: { a: ["Červená", true], b: ["Modrá", false], c: ["Zelená", false] } },
      { q: "Kolik je 5 − 2?", answers: { a: [2, false], b: [3, true], c: [4, false] } },
      { q: "Které zvíře má krunýř?", answers: { a: ["Želva", true], b: ["Pes", false], c: ["Kočka", false] } },
      { q: "Kolik je 4 + 4?", answers: { a: [7, false], b: [8, true], c: [9, false] } },
      { q: "Co svítí na obloze ve dne?", answers: { a: ["Slunce", true], b: ["Měsíc", false], c: ["Hvězdy", false] } },
      { q: "Kolik je 10 + 0?", answers: { a: [9, false], b: [10, true], c: [11, false] } },
      { q: "Které zvíře skáče?", answers: { a: ["Králík", true], b: ["Kráva", false], c: ["Pes", false] } },
      { q: "Kolik je 7 − 5?", answers: { a: [1, false], b: [2, true], c: [3, false] } },
      { q: "Co pijeme, když máme žízeň?", answers: { a: ["Vodu", true], b: ["Písek", false], c: ["Kámen", false] } },

      { q: "Kolik je 3 + 1?", answers: { a: [3, false], b: [4, true], c: [5, false] } },
      { q: "Jaká barva je mrkev?", answers: { a: ["Oranžová", true], b: ["Zelená", false], c: ["Modrá", false] } },
      { q: "Kolik je 6 − 3?", answers: { a: [2, false], b: [3, true], c: [4, false] } },
      { q: "Které zvíře má hřívu?", answers: { a: ["Lev", true], b: ["Pes", false], c: ["Kočka", false] } },
      { q: "Kolik je 2 + 5?", answers: { a: [6, false], b: [7, true], c: [8, false] } },
      { q: "Co používáme k jídlu polévky?", answers: { a: ["Lžíci", true], b: ["Vidličku", false], c: ["Nůž", false] } },
      { q: "Kolik je 8 − 6?", answers: { a: [1, false], b: [2, true], c: [3, false] } },
      { q: "Které zvíře má dlouhý krk?", answers: { a: ["Žirafa", true], b: ["Pes", false], c: ["Prase", false] } },
      { q: "Kolik je 1 + 4?", answers: { a: [4, false], b: [5, true], c: [6, false] } },
      { q: "Co nosíme na hlavu v zimě?", answers: { a: ["Čepici", true], b: ["Boty", false], c: ["Ponožky", false] } }
    ]
  },
  {
    difficulty: "medium",
    questions: [
      { q: "Který sport se hraje s pukem?", answers: { a: ["Hokej", true], b: ["Fotbal", false], c: ["Basketbal", false] } },
      { q: "Kdo objevil Ameriku?", answers: { a: ["Vasco da Gama", false], b: ["Kristof Kolumbus", true], c: ["James Cook", false] } },
      { q: "Hlavní město Francie je?", answers: { a: ["Paříž", true], b: ["Londýn", false], c: ["Berlín", false] } },
      { q: "Který oceán je největší?", answers: { a: ["Atlantský", false], b: ["Tichý", true], c: ["Indický", false] } },
      { q: "Jaký je symbol zlata v periodické tabulce?", answers: { a: ["Au", true], b: ["Ag", false], c: ["Fe", false] } },
      { q: "Kdo je autorem Harryho Pottera?", answers: { a: ["J.K. Rowling", true], b: ["Suzanne Collins", false], c: ["Rick Riordan", false] } },
      { q: "Ve kterém městě se konají olympijské hry 2024?", answers: { a: ["Paříž", true], b: ["Los Angeles", false], c: ["Tokio", false] } },
      { q: "Která země je největší podle rozlohy?", answers: { a: ["Kanada", false], b: ["Rusko", true], c: ["Čína", false] } },
      { q: "Kolik hráčů je ve fotbalovém týmu na hřišti?", answers: { a: [11, true], b: [10, false], c: [12, false] } },
      { q: "Kdo namaloval Monu Lisu?", answers: { a: ["Leonardo da Vinci", true], b: ["Michelangelo", false], c: ["Vincent van Gogh", false] } },
      { q: "Jaký je národní pták USA?", answers: { a: ["Orel bělohlavý", true], b: ["Sokol", false], c: ["Husa", false] } },
      { q: "Co je hlavním městem Japonska?", answers: { a: ["Tokio", true], b: ["Kjóto", false], c: ["Osaka", false] } },
      { q: "Který stát je známý pro tulipány a sýry?", answers: { a: ["Belgie", false], b: ["Nizozemsko", true], c: ["Švýcarsko", false] } },
      { q: "Jak se jmenuje nejdelší řeka světa?", answers: { a: ["Amazonka", true], b: ["Nil", false], c: ["Mississippi", false] } },
      { q: "Který sport má Wimbledon?", answers: { a: ["Tenis", true], b: ["Golf", false], c: ["Rugby", false] } },
      { q: "Která značka vyrábí iPhone?", answers: { a: ["Samsung", false], b: ["Apple", true], c: ["Huawei", false] } },
      { q: "Která planeta je nejbližší Slunci?", answers: { a: ["Venuše", false], b: ["Merkur", true], c: ["Mars", false] } },
      { q: "Kdo napsal Romeo a Julie?", answers: { a: ["William Shakespeare", true], b: ["Charles Dickens", false], c: ["Mark Twain", false] } },
      { q: "Jaký je hlavní jazyk v Brazílii?", answers: { a: ["Španělština", false], b: ["Portugalština", true], c: ["Angličtina", false] } },
      { q: "Který stát je známý pro své pyramídy?", answers: { a: ["Egypt", true], b: ["Řecko", false], c: ["Mexiko", false] } },
      { q: "Kdo je známý jako 'Král Popu'?", answers: { a: ["Michael Jackson", true], b: ["Elvis Presley", false], c: ["Prince", false] } },
      { q: "Kolik kontinentů je na Zemi?", answers: { a: [5, false], b: [6, false], c: [7, true] } },
      { q: "Jak se jmenuje nejvyšší hora světa?", answers: { a: ["Mount Everest", true], b: ["K2", false], c: ["Mont Blanc", false] } },
      { q: "Která země vyrábí značku Ferrari?", answers: { a: ["Itálie", true], b: ["Německo", false], c: ["Francie", false] } },
      { q: "Jaké zvíře je symbolem WWF?", answers: { a: ["Panda", true], b: ["Lev", false], c: ["Slon", false] } },
      { q: "Co je hlavním městem Kanady?", answers: { a: ["Toronto", false], b: ["Ottawa", true], c: ["Vancouver", false] } },
      { q: "Jaký je národní sport v Japonsku?", answers: { a: ["Sumo", true], b: ["Judo", false], c: ["Karate", false] } },
      { q: "Který stát je známý pro whisky?", answers: { a: ["Skotsko", true], b: ["Irsko", false], c: ["Anglie", false] } },
      { q: "Kolik je druhých mocnin v čísle 16?", answers: { a: [2, false], b: [4, true], c: [8, false] } },
      { q: "Který stát má tvar boty?", answers: { a: ["Španělsko", false], b: ["Itálie", true], c: ["Řecko", false] } },
      { q: "Jaký plyn dýchají lidé?", answers: { a: ["Kyslík", true], b: ["Dusík", false], c: ["Oxid uhličitý", false] } },
      { q: "Který měsíc má 28 dní (běžně)?", answers: { a: ["Únor", true], b: ["Leden", false], c: ["Březen", false] } },
      { q: "Kolik minut má jedna hodina?", answers: { a: [60, true], b: [100, false], c: [30, false] } },
      { q: "Jaké zvíře je symbolem Číny?", answers: { a: ["Drak", true], b: ["Tygr", false], c: ["Panda", false] } },
      { q: "Který kontinent je nejmenší?", answers: { a: ["Evropa", false], b: ["Austrálie", true], c: ["Antarktida", false] } },
      { q: "Kolik stran má trojúhelník?", answers: { a: [3, true], b: [4, false], c: [5, false] } },
      { q: "Kdo namaloval obraz Poslední večeře?", answers: { a: ["Leonardo da Vinci", true], b: ["Picasso", false], c: ["Rembrandt", false] } },
      { q: "Jaké je hlavní město Itálie?", answers: { a: ["Milán", false], b: ["Řím", true], c: ["Neapol", false] } },
      { q: "Kolik barev má duha?", answers: { a: [6, false], b: [7, true], c: [8, false] } },
      { q: "Jaký je nejrychlejší suchozemský živočich?", answers: { a: ["Lev", false], b: ["Gepard", true], c: ["Kůň", false] } },
      { q: "Který jazyk má nejvíce rodilých mluvčích?", answers: { a: ["Angličtina", false], b: ["Mandarínská čínština", true], c: ["Španělština", false] } },
      { q: "Kolik stupňů má pravý úhel?", answers: { a: [45, false], b: [90, true], c: [180, false] } },
      { q: "Který stát má hlavní město Berlín?", answers: { a: ["Rakousko", false], b: ["Německo", true], c: ["Švýcarsko", false] } },
      { q: "Jaký kov je tekutý při pokojové teplotě?", answers: { a: ["Železo", false], b: ["Rtuť", true], c: ["Hliník", false] } },
      { q: "Který oceán leží mezi Afrikou a Austrálií?", answers: { a: ["Atlantský", false], b: ["Indický", true], c: ["Tichý", false] } },
      { q: "Jaké zvíře je největší na světě?", answers: { a: ["Slon", false], b: ["Plejtvák obrovský", true], c: ["Žralok bílý", false] } },
      { q: "Kolik písmen má česká abeceda?", answers: { a: [26, false], b: [42, true], c: [30, false] } },
      { q: "Který sport používá raketu a míček?", answers: { a: ["Tenis", true], b: ["Hokej", false], c: ["Fotbal", false] } },
      { q: "Kolik sekund má jedna minuta?", answers: { a: [60, true], b: [100, false], c: [30, false] } },
      { q: "Který prvek má chemickou značku Fe?", answers: { a: ["Zlato", false], b: ["Železo", true], c: ["Měď", false] } },
      { q: "Jaká planeta je nejblíže Slunci?", answers: { a: ["Venuše", false], b: ["Merkur", true], c: ["Mars", false] } },
      { q: "Který světadíl má nejvíce států?", answers: { a: ["Afrika", true], b: ["Evropa", false], c: ["Asie", false] } },
      { q: "Jak se jmenoval první člověk na Měsíci?", answers: { a: ["Buzz Aldrin", false], b: ["Neil Armstrong", true], c: ["Yuri Gagarin", false] } },
      { q: "Kolik kláves má standardní klavír?", answers: { a: [88, true], b: [76, false], c: [61, false] } },
      { q: "Který orgán v lidském těle čistí krev?", answers: { a: ["Srdce", false], b: ["Ledviny", true], c: ["Plíce", false] } },
      { q: "Jaké je nejdelší pohoří na světě?", answers: { a: ["Andy", true], b: ["Himaláje", false], c: ["Alpy", false] } },
      { q: "Která planeta je známá jako Rudá planeta?", answers: { a: ["Mars", true], b: ["Jupiter", false], c: ["Venuše", false] } },
      { q: "Kolik kostí má dospělý člověk?", answers: { a: [206, true], b: [201, false], c: [210, false] } },
      { q: "Který stát je kolébkou olympijských her?", answers: { a: ["Itálie", false], b: ["Řecko", true], c: ["Egypt", false] } },
      { q: "Jaký nástroj měří zemětřesení?", answers: { a: ["Barometr", false], b: ["Seismograf", true], c: ["Teploměr", false] } },
      { q: "Který plyn je nejvíce zastoupen v zemské atmosféře?", answers: { a: ["Kyslík", false], b: ["Dusík", true], c: ["Oxid uhličitý", false] } },
      { q: "Jak se nazývá studium vesmíru?", answers: { a: ["Astrologie", false], b: ["Astronomie", true], c: ["Kosmologie", false] } },
      { q: "Kolik noh má pavouk?", answers: { a: [6, false], b: [8, true], c: [10, false] } },
      { q: "Který oceán je největší?", answers: { a: ["Atlantský", false], b: ["Indický", false], c: ["Tichý", true] } },
      { q: "Jaký kov se používá jako vodič v elektrických kabelech?", answers: { a: ["Hliník", false], b: ["Měď", true], c: ["Stříbro", false] } },
      { q: "Které zvíře je považováno za krále zvířat?", answers: { a: ["Tygr", false], b: ["Lev", true], c: ["Slon", false] } },
      { q: "Kolik měsíců má přestupný rok?", answers: { a: [12, true], b: [13, false], c: [11, false] } },
      { q: "Která země má tvar dlouhého úzkého pásu podél oceánu?", answers: { a: ["Chile", true], b: ["Norsko", false], c: ["Japonsko", false] } },
      { q: "Kolik písmen má anglická abeceda?", answers: { a: [24, false], b: [26, true], c: [28, false] } },
      { q: "Jaký je největší orgán lidského těla?", answers: { a: ["Srdce", false], b: ["Kůže", true], c: ["Játra", false] } },
      { q: "Která planeta má nejvíce měsíců?", answers: { a: ["Jupiter", true], b: ["Saturn", false], c: ["Neptun", false] } },
      { q: "Jaký je chemický vzorec vody?", answers: { a: ["CO2", false], b: ["H2O", true], c: ["O2", false] } },
      { q: "Který kontinent je nejlidnatější?", answers: { a: ["Afrika", false], b: ["Asie", true], c: ["Evropa", false] } },
      { q: "Kolik dní má běžný rok?", answers: { a: [365, true], b: [364, false], c: [366, false] } },
      { q: "Jak se jmenuje hlavní město Kanady?", answers: { a: ["Toronto", false], b: ["Ottawa", true], c: ["Vancouver", false] } },
      { q: "Které zvíře je nejrychlejší ve vodě?", answers: { a: ["Delfín", false], b: ["Plachetník", true], c: ["Žralok", false] } },
      { q: "Jaký smysl je u člověka nejrychlejší?", answers: { a: ["Zrak", false], b: ["Hmat", true], c: ["Sluch", false] } },
      { q: "Který stát má největší populaci?", answers: { a: ["USA", false], b: ["Indie", false], c: ["Čína", true] } },

      { q: "Kolik planet má sluneční soustava?", answers: { a: [7, false], b: [8, true], c: [9, false] } },
      { q: "Jaký je nejvyšší vodopád na světě?", answers: { a: ["Niagarské vodopády", false], b: ["Viktoriiny vodopády", false], c: ["Angel Falls", true] } },
      { q: "Který kov má značku Au?", answers: { a: ["Stříbro", false], b: ["Zlato", true], c: ["Měď", false] } },
      { q: "Kolik má lidské tělo svalů (přibližně)?", answers: { a: [300, false], b: [600, true], c: [900, false] } },
      { q: "Která planeta je největší?", answers: { a: ["Saturn", false], b: ["Jupiter", true], c: ["Neptun", false] } },
      { q: "Jak se nazývá nejmenší jednotka informace?", answers: { a: ["Byte", false], b: ["Bit", true], c: ["Kilobit", false] } },
      { q: "Který jazyk je oficiálním jazykem Brazílie?", answers: { a: ["Španělština", false], b: ["Portugalština", true], c: ["Angličtina", false] } },
      { q: "Kolik kontinentů existuje?", answers: { a: [5, false], b: [6, false], c: [7, true] } },
      { q: "Který plyn způsobuje skleníkový efekt?", answers: { a: ["Kyslík", false], b: ["Oxid uhličitý", true], c: ["Dusík", false] } },
      { q: "Jaký je největší savčí predátor?", answers: { a: ["Lední medvěd", true], b: ["Lev", false], c: ["Tygr", false] } },

      { q: "Který hudební nástroj má struny?", answers: { a: ["Bicí", false], b: ["Housle", true], c: ["Flétna", false] } },
      { q: "Jaký tvar má Země?", answers: { a: ["Dokonalá koule", false], b: ["Geoid", true], c: ["Plochý disk", false] } },
      { q: "Kolik zubů má dospělý člověk?", answers: { a: [28, false], b: [32, true], c: [36, false] } },
      { q: "Který oceán je nejhlubší?", answers: { a: ["Tichý", true], b: ["Atlantský", false], c: ["Indický", false] } },
      { q: "Jak se nazývá proces dýchání u rostlin?", answers: { a: ["Fotosyntéza", true], b: ["Fermentace", false], c: ["Transpirace", false] } },
      { q: "Jaký je největší druh kočky?", answers: { a: ["Lev", false], b: ["Tygr", true], c: ["Gepard", false] } },
      { q: "Kolik má krychle hran?", answers: { a: [10, false], b: [12, true], c: [8, false] } },
      { q: "Jaký kov je magnetický?", answers: { a: ["Železo", true], b: ["Zlato", false], c: ["Měď", false] } },
      { q: "Který stát je největší rozlohou?", answers: { a: ["Kanada", false], b: ["Rusko", true], c: ["USA", false] } },
      { q: "Jaký je nejmenší pták na světě?", answers: { a: ["Vrabec", false], b: ["Kolibřík", true], c: ["Sýkora", false] } },

      { q: "Kolik hráčů má fotbalový tým na hřišti?", answers: { a: [9, false], b: [11, true], c: [13, false] } },
      { q: "Jaký orgán řídí lidské tělo?", answers: { a: ["Srdce", false], b: ["Mozek", true], c: ["Plíce", false] } },
      { q: "Která planeta má prstence?", answers: { a: ["Mars", false], b: ["Saturn", true], c: ["Venuše", false] } },
      { q: "Jaký je hlavní zdroj energie pro Slunce?", answers: { a: ["Hoření", false], b: ["Jaderná fúze", true], c: ["Elektřina", false] } },
      { q: "Kolik gramů má jeden kilogram?", answers: { a: [100, false], b: [1000, true], c: [10000, false] } },
      { q: "Které zvíře spí ve stoje?", answers: { a: ["Pes", false], b: ["Kůň", true], c: ["Kočka", false] } },
      { q: "Jaký je největší ostrov světa?", answers: { a: ["Austrálie", false], b: ["Grónsko", true], c: ["Madagaskar", false] } },
      { q: "Který smysl používají netopýři k orientaci?", answers: { a: ["Zrak", false], b: ["Echolokaci", true], c: ["Čich", false] } },
      { q: "Kolik wattů má jeden kilowatt?", answers: { a: [100, false], b: [1000, true], c: [10000, false] } },
      { q: "Který nápoj obsahuje nejvíce kofeinu?", answers: { a: ["Čaj", false], b: ["Káva", true], c: ["Mléko", false] } }
    ]
  },
  {
    difficulty: "hard",
    questions: [
      { q: "Jak se řekne v jazyce Esperanto Buchtič je nenažranej a tlustej špekoun?", answers: { a: ["Buchtič estas avidema kaj dika.", true], b: ["Buchtič tamahkar və şişmandır.", false], c: ["Buchtič ass gierig a fett.", false] } },
      { q: "Kdo je největší špekoun na světě?", answers: { a: ["Buchtič", true], b: ["Buchtič", true], c: ["Buchtič", true] } },
      { q: "Co nepatří na párek v rohlíku?", answers: { a: ["Kečup", true], b: ["Kečup", true], c: ["Kečup", true] } },
      { q: "Kolik váží Buchtič?", answers: { a: ["Toto číslo je moc velké na vyjádření", true], b: ["Toto číslo je moc velké na vyjádření", true], c: ["Toto číslo je moc velké na vyjádření", true] } },
      { q: "Kdo vám sní všechno jídlo během 2 sekund?", answers: { a: ["Buchtič", true], b: ["Buchtič", true], c: ["Buchtič", true] } },
      { q: "Co nepatří do sviště?", answers: { a: ["Kečup", true], b: ["Kečup", true], c: ["Kečup", true] } },
      { q: "Která omáčka se hnusí všem normálním lidem?", answers: { a: ["Kečup", true], b: ["Kečup", true], c: ["Kečup", true] } },
      { q: "Kdy byla podepsána Vestfálská mírová smlouva, která ukončila třicetiletou válku?", answers: { a: ["1618", false], b: ["1648", true], c: ["1650", false] } },
      { q: "Který stát měl největší územní zisk po Vídeňském kongresu v roce 1815?", answers: { a: ["Rakousko", false], b: ["Prusko", true], c: ["Rusko", false] } },
      { q: "Jaký je nejhlubší oceánský příkop světa?", answers: { a: ["Tonga příkop", false], b: ["Kurilský příkop", false], c: ["Mariánský příkop", true] } },
      { q: "Který chemický prvek byl objeven Marie Curie-Skłodowskou?", answers: { a: ["Radium", false], b: ["Polonium", true], c: ["Uran", false] } },
      { q: "V kterém roce začala americká občanská válka?", answers: { a: ["1918", false], b: ["1861", true], c: ["1776", false] } },
      { q: "Jaký je největší ostrov Středozemního moře?", answers: { a: ["Sardinie", false], b: ["Sicílie", true], c: ["Kréta", false] } },
      { q: "Který fyzik formuloval zákony pohybu a gravitace?", answers: { a: ["Isaac Newton", true], b: ["Albert Einstein", false], c: ["Galileo Galilei", false] } },
      { q: "Jak se jmenoval vůdce Mongolské říše, který vytvořil největší souvislou říši světa?", answers: { a: ["Čingischán", true], b: ["Kublajchán", false], c: ["Timur", false] } },
      { q: "Která hora je nejvyšší v Africe?", answers: { a: ["Mount Kenya", false], b: ["Kilimandžáro", true], c: ["Atlas", false] } },
      { q: "Jaké je chemické složení vzduchu podle největšího podílu?", answers: { a: ["Dusík", true], b: ["Kyslík", false], c: ["Argon", false] } },
      { q: "Kdy proběhla Bitva u Hastings, která změnila osud Anglie?", answers: { a: ["1066", true], b: ["1215", false], c: ["1415", false] } },
      { q: "Který stát je největším producentem zemního plynu na světě?", answers: { a: ["Saúdská Arábie", false], b: ["USA", true], c: ["Rusko", false] } },
      { q: "Jaký je rozdíl mezi rychlostí světla ve vakuu a v normálním skle?", answers: { a: ["Světlo zpomaluje", true], b: ["Světlo zrychluje", false], c: ["Světlo se zastaví", false] } },
      { q: "Která bitva ukončila Napoleonskou éru?", answers: { a: ["Borodino", false], b: ["Waterloo", true], c: ["Austerlitz", false] } },
      { q: "Který oceán sousedí s Antarktidou?", answers: { a: ["Jižní oceán", true], b: ["Tichý oceán", false], c: ["Atlantský oceán", false] } },
      { q: "Jaké je hlavní složení sluneční atmosféry?", answers: { a: ["Helium", false], b: ["Kyslík", false], c: ["Vodík", true] } },
      { q: "Kdy byl konec studené války oficiálně uznán?", answers: { a: ["1989", false], b: ["1995", false], c: ["1991", true] } },
      { q: "Které pohoří tvoří přirozenou hranici mezi Evropou a Asií?", answers: { a: ["Kavkaz", false], b: ["Ural", true], c: ["Alpy", false] } },
      { q: "Který chemický prvek má atomové číslo 26?", answers: { a: ["Železo", true], b: ["Měď", false], c: ["Zinek", false] } },
      { q: "Kdo vedl francouzskou revoluci a byl popraven gilotinou v roce 1793?", answers: { a: ["Napoleon Bonaparte", false], b: ["Louis XVI", false], c: ["Maximilien Robespierre", true] } },
      // Sportovní otázky
      { q: "Který stát vyhrál mistrovství světa ve fotbale 2018?", answers: { a: ["Chorvatsko", false], b: ["Francie", true], c: ["Brazílie", false] } },
      { q: "Kolik hráčů je na hřišti v basketbalovém týmu současně?", answers: { a: ["5", true], b: ["6", false], c: ["4", false] } },
      { q: "Který tenista má nejvíce grandslamových vítězství (muži, k roku 2023)?", answers: { a: ["Novak Djoković", true], b: ["Roger Federer", false], c: ["Rafael Nadal", false] } },
      { q: "Který stát pořádal zimní olympijské hry v roce 2018?", answers: { a: ["Jižní Korea", true], b: ["Japonsko", false], c: ["Kanada", false] } },
      { q: "Jaký sport je národní sport Japonska?", answers: { a: ["Sumo", true], b: ["Karate", false], c: ["Judo", false] } },
            { q: "Který francouzský král byl popraven během Velké francouzské revoluce?", answers: { a: ["Louis XVI", true], b: ["Louis XIV", false], c: ["Napoleon Bonaparte", false] } },
      { q: "Jak se jmenuje nejvyšší hora Evropy?", answers: { a: ["Mont Blanc", true], b: ["Elbrus", false], c: ["Matterhorn", false] } },
      { q: "Který fyzik je autorem rovnic elektrodynamiky?", answers: { a: ["James Clerk Maxwell", true], b: ["Nikola Tesla", false], c: ["Michael Faraday", false] } },
      { q: "Který chemický prvek má symbol Pb?", answers: { a: ["Olovo", true], b: ["Stříbro", false], c: ["Měď", false] } },
      { q: "Kdy začala druhá světová válka?", answers: { a: ["1939", true], b: ["1918", false], c: ["1945", false] } },
      { q: "Která řeka tvoří hranici mezi USA a Mexikem?", answers: { a: ["Rio Grande", true], b: ["Mississippi", false], c: ["Colorado", false] } },
      { q: "Který stát vyhrál letní olympijské hry 2016 ve fotbale mužů?", answers: { a: ["Brazílie", true], b: ["Argentina", false], c: ["Německo", false] } },
      { q: "Kdo napsal dílo 'Dějiny starověkého Říma'?", answers: { a: ["Titus Livius", true], b: ["Herodotos", false], c: ["Plinius starší", false] } },
      { q: "Která země má největší rozlohu v Africe?", answers: { a: ["Alžírsko", true], b: ["Súdán", false], c: ["Libye", false] } },
      { q: "Jaký je základní princip Archimédova zákona?", answers: { a: ["Těleso ve vodě je nadlehčováno silou rovnou objemu vody", true], b: ["Tlak je síla na jednotku plochy", false], c: ["Energetická bilance je konstantní", false] } },
      { q: "Který sportovec získal nejvíce zlatých olympijských medailí v historii (muži)?", answers: { a: ["Michael Phelps", true], b: ["Usain Bolt", false], c: ["Carl Lewis", false] } },
      { q: "Kdy došlo k pádu Západořímské říše?", answers: { a: ["476", true], b: ["410", false], c: ["500", false] } },
      { q: "Která poušť se nachází v Číně a Mongolsku?", answers: { a: ["Gobi", true], b: ["Sahara", false], c: ["Kalahari", false] } },
      { q: "Který chemický prvek je nejlehčí?", answers: { a: ["Vodík", true], b: ["Helium", false], c: ["Lithium", false] } },
      { q: "Jaký sport se hraje na ledě s pukem a hokejkou?", answers: { a: ["Hokej", true], b: ["Kriket", false], c: ["Lacrosse", false] } },
      { q: "Který stát leží na poloostrově Skandinávském?", answers: { a: ["Norsko", true], b: ["Polsko", false], c: ["Dánsko", false] } },
      { q: "Kdy byl konec první světové války?", answers: { a: ["1918", true], b: ["1914", false], c: ["1920", false] } },
      { q: "Který fyzik formuloval teorii relativity?", answers: { a: ["Albert Einstein", true], b: ["Isaac Newton", false], c: ["Galileo Galilei", false] } },
      { q: "Které město je hlavním městem Austrálie?", answers: { a: ["Canberra", true], b: ["Sydney", false], c: ["Melbourne", false] } },
      { q: "Kdo byl vůdcem revoluce v Rusku v roce 1917?", answers: { a: ["Vladimir Lenin", true], b: ["Josef Stalin", false], c: ["Michail Gorbačov", false] } },
      { q: "Který chemický prvek má symbol Na?", answers: { a: ["Sodík", true], b: ["Draslík", false], c: ["Vápník", false] } },
      { q: "Který stát vyhrál mistrovství světa ve fotbale 2006?", answers: { a: ["Itálie", true], b: ["Francie", false], c: ["Brazílie", false] } },
      { q: "Který oceán je nejhlubší?", answers: { a: ["Tichý oceán", true], b: ["Atlantský oceán", false], c: ["Indický oceán", false] } },
      { q: "Kdy se odehrála bitva u Stalingradu?", answers: { a: ["1942–1943", true], b: ["1941–1942", false], c: ["1943–1944", false] } },
      { q: "Která země vyhrála první mistrovství světa ve fotbale v roce 1930?", answers: { a: ["Uruguay", true], b: ["Argentina", false], c: ["Itálie", false] } },
            { q: "Kdo byl hlavním vůdcem Spartské armády v bitvě u Thermopyl?", answers: { a: ["Leonidás", true], b: ["Perikles", false], c: ["Alkibiadés", false] } },
      { q: "Jaký je největší ostrov Kanady?", answers: { a: ["Baffinův ostrov", true], b: ["Vancouver", false], c: ["Newfoundland", false] } },
      { q: "Který fyzik objevil zákon fotoefektu?", answers: { a: ["Albert Einstein", true], b: ["Isaac Newton", false], c: ["Max Planck", false] } },
      { q: "Který chemický prvek má symbol Ag?", answers: { a: ["Stříbro", true], b: ["Zinek", false], c: ["Hliník", false] } },
      { q: "Kdy začala krymská válka?", answers: { a: ["1853", true], b: ["1848", false], c: ["1861", false] } },
      { q: "Která řeka je nejdelší v Jižní Americe?", answers: { a: ["Amazonka", true], b: ["Paraná", false], c: ["Orinoko", false] } },
      { q: "Která země vyhrála mistrovství světa ve fotbale 1998?", answers: { a: ["Francie", true], b: ["Brazílie", false], c: ["Německo", false] } },
      { q: "Kdo napsal 'Dějiny Peloponéské války'?", answers: { a: ["Thúkydidés", true], b: ["Herodotos", false], c: ["Plutarchos", false] } },
      { q: "Která africká země má největší počet obyvatel?", answers: { a: ["Nigérie", true], b: ["Egypt", false], c: ["Etiopie", false] } },
      { q: "Jaký je princip Archimédova zákona?", answers: { a: ["Těleso ve vodě je nadlehčováno silou rovnou objemu vody", true], b: ["Tlak je síla na jednotku plochy", false], c: ["Energetická bilance je konstantní", false] } },
      { q: "Který sportovec drží rekord v největším počtu vítězství na Tour de France?", answers: { a: ["Jacques Anquetil", false], b: ["Eddy Merckx", true], c: ["Miguel Indurain", false] } },
      { q: "Kdy padla Konstantinopol?", answers: { a: ["1453", true], b: ["1492", false], c: ["1415", false] } },
      { q: "Která poušť je největší na Arabském poloostrově?", answers: { a: ["Rub al-Chálí", true], b: ["Sahara", false], c: ["Gobi", false] } },
      { q: "Který chemický prvek má nejvyšší hustotu?", answers: { a: ["Osmium", true], b: ["Uran", false], c: ["Platina", false] } },
      { q: "Jaký sport je národní sport Kanady?", answers: { a: ["Hokej", true], b: ["Baseball", false], c: ["Basketbal", false] } },
      { q: "Který stát leží na poloostrově Arabském?", answers: { a: ["Saúdská Arábie", true], b: ["Írán", false], c: ["Irák", false] } },
      { q: "Kdy skončila druhá světová válka v Evropě?", answers: { a: ["1945", true], b: ["1944", false], c: ["1946", false] } },
      { q: "Který fyzik objevil zákon setrvačnosti?", answers: { a: ["Isaac Newton", true], b: ["Galileo Galilei", false], c: ["Albert Einstein", false] } },
      { q: "Jaké je hlavní město Nového Zélandu?", answers: { a: ["Wellington", true], b: ["Auckland", false], c: ["Christchurch", false] } },
      { q: "Kdo vedl říjnovou revoluci v Rusku?", answers: { a: ["Vladimir Lenin", true], b: ["Leon Trotsky", false], c: ["Josef Stalin", false] } },
      { q: "Který chemický prvek je základní součástí bílkovin?", answers: { a: ["Dusík", true], b: ["Kyslík", false], c: ["Uhlík", false] } },
      { q: "Který stát vyhrál mistrovství světa ve fotbale 2010?", answers: { a: ["Španělsko", true], b: ["Nizozemsko", false], c: ["Itálie", false] } },
      { q: "Který oceán je nejteplejší?", answers: { a: ["Indický oceán", true], b: ["Atlantský oceán", false], c: ["Tichý oceán", false] } },
      { q: "Kdy se odehrála bitva u Trafalgaru?", answers: { a: ["1805", true], b: ["1812", false], c: ["1798", false] } },
      { q: "Která země vyhrála první mistrovství světa ve fotbale 1930?", answers: { a: ["Uruguay", true], b: ["Argentina", false], c: ["Itálie", false] } },
        {
    q: "Který matematik je autorem teorému o nekonečnosti prvočísel?",
    answers: {
      a: ["Eukleidés", true],
      b: ["Pythagoras", false],
      c: ["Archimédes", false]
    }
  },
  {
    q: "Jak se nazývá nejstarší známý psaný zákoník?",
    answers: {
      a: ["Chammurapiho zákoník", true],
      b: ["Zákony dvanácti desek", false],
      c: ["Justiniánův kodex", false]
    }
  },
  {
    q: "Která planeta má největší sklon rotační osy?",
    answers: {
      a: ["Uran", true],
      b: ["Saturn", false],
      c: ["Mars", false]
    }
  },
  {
    q: "Jaký je latinský název pro kyselinu sírovou?",
    answers: {
      a: ["Acidum sulfuricum", true],
      b: ["Acidum nitricum", false],
      c: ["Acidum hydrochloricum", false]
    }
  },
  {
    q: "Který filozof napsal dílo 'Kritika čistého rozumu'?",
    answers: {
      a: ["Immanuel Kant", true],
      b: ["Georg Hegel", false],
      c: ["René Descartes", false]
    }
  },
  {
    q: "Který kov má nejvyšší bod tání?",
    answers: {
      a: ["Wolfram", true],
      b: ["Železo", false],
      c: ["Titan", false]
    }
  },
  {
    q: "Ve kterém roce vznikla Organizace spojených národů?",
    answers: {
      a: ["1945", true],
      b: ["1919", false],
      c: ["1951", false]
    }
  },
  {
    q: "Jak se nazývá největší deštný prales světa?",
    answers: {
      a: ["Amazonský prales", true],
      b: ["Konžský prales", false],
      c: ["Prales Borneo", false]
    }
  },
  {
    q: "Který fyzik přišel s kvantovou teorií záření?",
    answers: {
      a: ["Max Planck", true],
      b: ["Niels Bohr", false],
      c: ["Werner Heisenberg", false]
    }
  },
  {
    q: "Který jazyk je základem románských jazyků?",
    answers: {
      a: ["Latina", true],
      b: ["Řečtina", false],
      c: ["Hebrejština", false]
    }
  },
  {
    q: "Jak se jmenuje nejhlubší místo na Zemi?",
    answers: {
      a: ["Challenger Deep", true],
      b: ["Java Trench", false],
      c: ["Puerto Rico Trench", false]
    }
  },
  {
    q: "Který panovník vydal Zlatou bulu sicilskou?",
    answers: {
      a: ["Fridrich II.", true],
      b: ["Karel IV.", false],
      c: ["Otakar II.", false]
    }
  },
  {
    q: "Která část mozku je zodpovědná za rovnováhu?",
    answers: {
      a: ["Mozeček", true],
      b: ["Hypotalamus", false],
      c: ["Mozkový kmen", false]
    }
  },
  {
    q: "Jaký je hlavní izotop uhlíku v živých organismech?",
    answers: {
      a: ["Uhlík-12", true],
      b: ["Uhlík-13", false],
      c: ["Uhlík-14", false]
    }
  },
  {
    q: "Který stát byl první, kdo získal nezávislost v Latinské Americe?",
    answers: {
      a: ["Haiti", true],
      b: ["Mexiko", false],
      c: ["Argentina", false]
    }
  },
  {
    q: "Jak se nazývá studium původu slov?",
    answers: {
      a: ["Etymologie", true],
      b: ["Fonologie", false],
      c: ["Syntax", false]
    }
  },
  {
    q: "Která planeta má nejkratší rok?",
    answers: {
      a: ["Merkur", true],
      b: ["Venuše", false],
      c: ["Mars", false]
    }
  },
  {
    q: "Který chemický prvek je základem organické chemie?",
    answers: {
      a: ["Uhlík", true],
      b: ["Dusík", false],
      c: ["Kyslík", false]
    }
  },
  {
    q: "Kdo byl autorem teorie evoluce přirozeným výběrem?",
    answers: {
      a: ["Charles Darwin", true],
      b: ["Gregor Mendel", false],
      c: ["Jean-Baptiste Lamarck", false]
    }
  },
  {
    q: "Který evropský stát nebyl nikdy členem Varšavské smlouvy?",
    answers: {
      a: ["Rakousko", true],
      b: ["Polsko", false],
      c: ["Maďarsko", false]
    }
  },
    {
    q: "Který evropský stát nebyl nikdy členem Varšavské smlouvy?",
    answers: {
      a: ["Rakousko", true],
      b: ["Polsko", false],
      c: ["Maďarsko", false]
    }
  }
    ]
  }
];

export function getQuestions() {
  return originalQuestions.map(level => {
    const questionsCopy = [...level.questions]; // necháme pořadí otázek stejné
    const questionsWithShuffledAnswers = questionsCopy.map(q => {
      const entries = shuffle(Object.entries(q.answers));
      return {
        ...q,
        answers: { a: entries[0][1], b: entries[1][1], c: entries[2][1] }
      };
    });
    return { ...level, questions: questionsWithShuffledAnswers };
  });
}
