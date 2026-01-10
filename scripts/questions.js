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
      { q: "Který stát je známý pro whisky?", answers: { a: ["Skotsko", true], b: ["Irsko", false], c: ["Anglie", false] } }
    ]
  },
  {
    difficulty: "hard",
    questions: [
      { q: "Kdo je největší špekoun na světě?", answers: { a: ["Buchtič", true], b: ["Buchtič", true], c: ["Buchtič", true] } },
      { q: "Co nepatří na párek v rohlíku?", answers: { a: ["Kečup", true], b: ["Kečup", true], c: ["Kečup", true] } },
      { q: "Kolik váží Buchtič?", answers: { a: ["Toto číslo je moc velké na vyjádření", true], b: ["Toto číslo je moc velké na vyjádření", true], c: ["Toto číslo je moc velké na vyjádření", true] } },
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
      { q: "Která země vyhrála první mistrovství světa ve fotbale 1930?", answers: { a: ["Uruguay", true], b: ["Argentina", false], c: ["Itálie", false] } }
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
