import { Section, Role, Minigame, MCQ, PvpAction, TextBundleItem, Building } from './types';

export const GAME_CONFIG = {
    gameDuration: 120, // in seconds (2 minutes for demo)
    initialCapital: 200,
    initialKnowledge: 50,
    initialSustainabilityPoints: 1000,
    passiveIncomeInterval: 5000, // ms
    passiveCapital: 15,
    passiveKnowledge: 5,
    aiActionInterval: 7000, // ms
    aiAttackChance: 0.3, // 30% chance to attack on action interval
};

export const RANKING_CONFIG = {
    defaultRank: 1200,
    kFactor: 32,
};

export const TIIMIEN_NIMET = ["Rannikon Ritarit", "Aaltojen Valtiaat", "Myrskynsilmät"];

export const RAKENNUKSET: Building[] = [
    { id: 'b1', name: 'Aallonmurtaja', cost: 100, points: 50, description: 'Vähentää myrskyvahinkoja ja suojaa eroosiolta.' },
    { id: 'b2', name: 'Tutkimuslaitos', cost: 120, points: 20, description: 'Parantaa Tieto-resurssin tuottoa.' },
    { id: 'b3', name: 'Matkailukeskus', cost: 150, points: 0, description: 'Lisää passiivista Pääoma-tuloa merkittävästi.' },
    { id: 'b4', name: 'Sensoriverkko', cost: 80, points: 10, description: 'Varoittaa saapuvista hyökkäyksistä aiemmin.' },
];


const YHTEENVETO: Section = {
  id: 'A',
  title: 'Yhteenveto',
  content: `Rannikot on reaaliaikainen, kilpailullinen moninpeli, joka on suunniteltu 15–16-vuotiaille yläkoululaisille. Pelin tavoitteena on opettaa rannikkomaantieteen, eroosion, merivirtojen ja ihmisen toiminnan vaikutuksia rannikkoalueisiin innostavalla ja vuorovaikutteisella tavalla. Pelaajat jaetaan kolmen hengen joukkueisiin, jotka kilpailevat toisiaan vastaan hallitsemalla omaa rannikkoaluettaan, vastaamalla monivalintakysymyksiin, suorittamalla minipelejä ja käyttämällä strategisia sabotaasi- ja puolustusmekaniikkoja.`
};

const PELIN_KONSEPTI: Section = {
  id: 'B',
  title: 'Pelin Konsepti ja Säännöt',
  content: {
    Formaatti: `Jatkuva, reaaliaikainen moninpeli. Kaikki joukkueet toimivat samanaikaisesti.`,
    Joukkueet: `Pelaajat jaetaan automaattisesti kolmen hengen joukkueisiin. Jokainen pelaaja valitsee tai hänelle annetaan yksi kolmesta erikoisroolista.`,
    Mekaniikat: `Pelaajat keräävät resursseja, rakentavat ja kehittävät omaa rannikkoaluettaan, sekä voivat hyökätä vastustajien kimppuun sabotaasi-iskuilla. Onnistuneet toiminnot vaativat monivalintakysymyksiin vastaamista tai minipelien suorittamista.`,
    Resurssit: `Pelin pääresurssit ovat 'Tieto' (jota saadaan kysymyksistä) ja 'Pääoma' (joka kertyy passiivisesti ja onnistuneista toimista).`,
    Pelin_kesto: `Normaali luokkatilapeli kestää 20–30 minuuttia, opettajan säädettävissä.`,
    Voittoehdot: `Pelin voittaa joukkue, jolla on eniten 'Kestävyyspisteitä' pelin lopussa. Pisteitä saa alueen hyvinvoinnista, onnistuneista toimista ja tutkimuksesta, ja menettää sabotaasin ja ympäristöongelmien kautta.`
  }
};

export const PELAAJIEN_ROOLIT: Section = {
  id: 'C',
  title: 'Pelaajien Roolit ja Kyvyt',
  content: [
    {
      name: 'Tutkija',
      description: 'Keskittyy tiedon keräämiseen ja ympäristön ymmärtämiseen. Erinomainen puolustuksessa ja ongelmien ennakoinnissa.',
      abilities: [
        '+20% Tieto-resursseja oikeista vastauksista.',
        'Voi käyttää kyvyn "Ennuste", joka paljastaa yhden tulevan ympäristökatastrofin 1 minuutin etukäteen.',
        'Puolustusminipelit ovat 15% helpompia.'
      ]
    },
    {
      name: 'Insinööri',
      description: 'Vastaa rakentamisesta ja teknologisista ratkaisuista. Vahva hyökkäyksessä ja infrastruktuurin kehittämisessä.',
      abilities: [
        'Rakentamisen ja parannusten Pääoma-kustannukset ovat 10% alhaisemmat.',
        'Sabotaasitoiminnot ovat 15% tehokkaampia.',
        'Voi rakentaa "Sensoriverkon", joka antaa 30 sekunnin varoituksen saapuvasta hyökkäyksestä.'
      ]
    },
    {
      name: 'Yhteisökoordinaattori',
      description: 'Hallitsee yhteisön hyvinvointia ja resursseja. Tukee tiimiä ja generoi passiivista tuloa.',
      abilities: [
        '+15% passiivista Pääoma-tuloa koko joukkueelle.',
        'Voi käyttää kyvyn "Valistuskampanja", joka tekee joukkueen immuuniksi PR-iskuille 2 minuutin ajan.',
        'Saa bonuspisteitä onnistuneista investoinneista paikallisiin yrityksiin.'
      ]
    }
  ] as Role[]
};

const OTTELUN_KULKU: Section = {
    id: 'D',
    title: 'Ottelun Kulku ja Käyttöliittymä',
    content: `
**Pelaajan Polku:**
1.  **Aula:** Pelaaja syöttää nimensä ja liittyy opettajan luomaan peliin koodilla. → [NÄPPÄIN: "Liity peliin"]
2.  **Joukkueenmuodostus:** Järjestelmä muodostaa automaattisesti 3 hengen joukkueet. Pelaajat näkevät tiimikaverinsa.
3.  **Roolin valinta:** Pelaaja valitsee yhden kolmesta roolista (Tutkija, Insinööri, Yhteisökoordinaattori).
4.  **Pelinäkymä:** Päänäkymä avautuu.

**Käyttöliittymän Paneelit:**
*   **Vasen (Oma Alue):** Visuaalinen esitys omasta rannikkoalueesta. Näyttää rakennukset, tilan ja resurssitasot (Tieto, Pääoma, Kestävyyspisteet).
*   **Keskus (Toimintovalikko):** Painikkeet käytettävissä oleville toiminnoille. → [NÄPPÄIMET: "Rakenna", "Tutki", "Hyökkää", "Puolusta", "Käytä kykyä"]
*   **Oikea (Maailmankartta):** Yleiskuva kaikkien joukkueiden alueista ja pisteistä. Tästä valitaan hyökkäyksen kohde.
*   **Yläpalkki:** Jäljellä oleva peliaika, joukkueen yhteiset resurssit, ilmoitukset.
*   **Ponnahdusikkunat:** Monivalintakysymykset ja minipelit ilmestyvät tarvittaessa toimintojen yhteydessä.

**Pelin Loppu:**
1.  Aika loppuu.
2.  **Loppunäkymä:** Näyttää tulostaulun, voittajajoukkueen ja henkilökohtaiset statistiikat.
3.  Siirtymä opettajan johtamaan purkukeskusteluun.`
};

const JOUKKUEENMUODOSTUS: Section = {
    id: 'E',
    title: 'Joukkueenmuodostusalgoritmi',
    content: {
        description: `Joukkueenmuodostuksen tavoitteena on luoda mahdollisimman tasapainoiset ja toimivat kolmen hengen joukkueet automaattisesti. Algoritmi ottaa huomioon useita tekijöitä varmistaakseen reilun pelikokemuksen.

**Säännöt:**
1.  **Taitotaso (ELO-pisteet):** Jos järjestelmässä on historiatietoa pelaajista, se pyrkii jakamaan korkean, keskitason ja matalan ELO-pisteen pelaajat tasaisesti joukkueisiin. Uudet pelaajat lasketaan keskitasoisiksi.
2.  **Roolijakauma:** Järjestelmä pyrkii varmistamaan, että jokaisessa joukkueessa on eri roolin valinneita pelaajia, jos mahdollista. Ensisijaisesti tämä tapahtuu pelaajien omien toiveiden kautta.
3.  **Kaveritoive (Opettajan asetus):** Opettaja voi sallia pelaajien muodostaa ennalta 1–2 hengen ryhmiä, jotka algoritmi pyrkii pitämään yhdessä ja täydentää kolmanneksi pelaajaksi.
4.  **Pariton pelaajamäärä:** Jos pelaajia on pariton määrä, viimeinen pelaaja (tai kaksi) muodostaa pienemmän joukkueen, joka saa pienen resurssikompensaation (esim. +10% passiivista tuloa) tasoittamaan tilannetta. Vaihtoehtoisesti opettaja voi liittyä peliin tasaamaan joukkueet.
5.  **Opettajan ohitus:** Opettajalla on aina mahdollisuus manuaalisesti siirtää pelaajia joukkueiden välillä ennen pelin alkua.`,
        pseudocode: `
FUNCTION createTeams(playerList, allowFriendPairing):
    // Osio 1: Kaveriparien käsittely
    pairedPlayers = []
    unpairedPlayers = []
    IF allowFriendPairing:
        FOR each player in playerList:
            IF player has a friend request AND request is accepted:
                create pair (player, friend)
                add pair to a temporary list
                remove both from playerList
        FOR each pair in temporary list:
             // Muodosta joukkue parin ympärille
             team = new Team(pair)
             add team to finalTeams
             pairedPlayers.add(player, friend)

    unpairedPlayers = all players in playerList not in pairedPlayers

    // Osio 2: Jäljelle jääneiden pelaajien lajittelu
    // Lajittele ELO-pisteiden mukaan laskevasti. Uusilla pelaajilla on oletus-ELO.
    sortedPlayers = sortByELO(unpairedPlayers, descending)

    // Osio 3: Joukkueiden täyttäminen ja luominen
    teamsToFill = all teams from finalTeams with < 3 members
    
    // Täytä vajaat joukkueet ensin
    FOR player in sortedPlayers:
        IF teamsToFill is not empty:
            find team in teamsToFill with lowest average ELO
            add player to that team
            remove team from teamsToFill if full
            remove player from sortedPlayers
    
    // Luo uudet joukkueet lopuista pelaajista
    WHILE sortedPlayers.length >= 3:
        // Käärmeperiaate (Serpentine draft) tasapainotukseen
        player1 = sortedPlayers.pop_first() // paras
        player2 = sortedPlayers.pop_last()  // huonoin
        player3 = sortedPlayers.pop_last()  // toiseksi huonoin
        newTeam = new Team(player1, player2, player3)
        add newTeam to finalTeams

    // Osio 4: Jäännöspelaajien käsittely
    IF sortedPlayers.length > 0:
        // Luo pienempi joukkue ja anna kompensaatio
        leftoverTeam = new Team(sortedPlayers)
        leftoverTeam.setResourceBonus(1.10) // 10% bonus
        add leftoverTeam to finalTeams

    RETURN finalTeams
`
    }
};

const PELIN_MEKANIIKAT: Section = {
    id: 'F',
    title: 'Pelin Mekaniikat',
    content: {
        Toiminnot: `
- **Rakenna:** Käytä Pääomaa rakentaaksesi puolustuksia (esim. aallonmurtaja) tai infrastruktuuria (esim. tutkimuslaitos). Vaatii onnistuneen minipelin.
- **Tutki:** Käytä Tieto-resurssia avataksesi uusia teknologioita tai puolustuksia. Vaatii oikean vastauksen vaikeaan monivalintakysymykseen.
- **Investoi:** Käytä Pääomaa parantaaksesi passiivista tulonlähdettä (esim. turismi, kalastus). Riskialtis minipeli, jossa voi menettää osan investoinnista.
- **Hyökkää/Sabotoi:** Valitse kohdejoukkue ja sabotaasityyppi. Käyttää resursseja ja vaatii onnistuneen minipelin/kysymyksen.
- **Puolustu:** Kun hyökkäys havaitaan, joukkue saa ilmoituksen ja voi yrittää puolustautua suorittamalla puolustusminipelin. Onnistuminen vähentää tai kumoaa vahingon.
- **Tiedustele:** Käytä pieni määrä Tieto-resurssia nähdäksesi vastustajan resurssitasot ja puolustukset lyhyen aikaa.`,
        Resurssit_ja_kustannukset: `
- **Perusrakennus (aallonmurtaja):** 100 Pääomaa.
- **Perustutkimus (eroosionsuojaus):** 80 Tietoa.
- **Perushyökkäys (väärä informaatio):** 50 Pääomaa, 30 Tietoa.
- **Toimintojen cooldown:** 60 sekuntia per hyökkäys/rakennus.`,
        Passiivinen_tulo: `Jokainen joukkue saa +10 Pääomaa ja +5 Tietoa per 30 sekuntia. Investoinnit ja rakennukset voivat parantaa tätä.`,
        Reilun_pelin_säännöt: `
- Yhtä joukkuetta ei voi hyökätä peräkkäin enempää kuin kaksi kertaa (muiden joukkueiden on hyökättävä välissä).
- Jos joukkueen Kestävyyspisteet putoavat alle 20% maksimista, se saa "Kriisiapu"-tilan, joka tekee siitä immuunin hyökkäyksille 2 minuutin ajaksi.`
    }
};

export const MINIPELIT_JA_KYSYMYKSET: Section = {
  id: 'G',
  title: 'Minipelit ja Kysymysjärjestelmä',
  content: {
    minigames: [
      {
        name: 'Virtausten hallinta',
        instructions: 'Ohjaa veden virtausta asettamalla esteitä oikeisiin paikkoihin niin, että vesi ohjautuu pois suojeltavalta alueelta aikarajan sisällä.',
        success: 'Eroosiovahinko estetty, rakennus onnistuu.',
        failure: 'Rakennus epäonnistuu, menetät puolet resursseista.',
        time: '30 sekuntia',
        scoring: '+50 Kestävyyspistettä'
      },
      {
        name: 'Saasteiden suodatus',
        instructions: 'Klikkaa ja poista saastepartikkeleita vedestä ennen kuin ne saavuttavat rannan. Varo klikkaamasta kaloja!',
        success: 'Veden laatu paranee, sabotaasi torjuttu.',
        failure: 'Alueen Kestävyyspisteet laskevat.',
        time: '25 sekuntia',
        scoring: 'Torjutun sabotaasin arvon mukaan'
      },
      {
        name: 'Budjetin tasapainotus',
        instructions: 'Jaa käytettävissä oleva budjetti eri kohteisiin (ympäristö, turismi, teollisuus) liukusäätimillä. Tavoitteena on saavuttaa mahdollisimman korkea tyytyväisyysindeksi.',
        success: 'Onnistunut investointi, passiivinen tulo kasvaa.',
        failure: 'Investointi tuottaa tappiota.',
        time: '20 sekuntia',
        scoring: '+10 Pääomaa/min'
      },
      {
        name: 'Salauksen purku',
        instructions: 'Ratkaise nopea sanasokkelo tai logiikkatehtävä, joka liittyy ympäristöaiheiseen termiin. Tämä on yleinen hyökkäysminipeli.',
        success: 'Hyökkäys onnistuu, kohde kärsii vahinkoa.',
        failure: 'Hyökkäys epäonnistuu, menetät käytetyt resurssit.',
        time: '35 sekuntia',
        scoring: '-100 Kestävyyspistettä kohteelle'
      },
      {
        name: 'Lajintunnistus',
        instructions: 'Tunnista ja luokittele nopeasti kuvista paikallisia rannikon eläin- ja kasvilajeja. Oikea tunnistus antaa bonuspisteitä.',
        success: 'Tutkimus onnistuu, saat Tieto-bonuksen.',
        failure: 'Tutkimus epäonnistuu.',
        time: '40 sekuntia',
        scoring: '+50 Tietoa'
      },
      {
        name: 'Hätätoimenpiteet',
        instructions: 'Myrsky on iskemässä. Raahaa ja pudota oikeat resurssit (hiekkasäkit, varoituskyltit) oikeisiin paikkoihin kartalla ennen kuin myrsky saapuu.',
        success: 'Myrskyn aiheuttamat vahingot vähenevät 80%.',
        failure: 'Kärsit täydet myrskyvahingot.',
        time: '20 sekuntia',
        scoring: 'Säästettyjen Kestävyyspisteiden mukaan'
      }
    ] as Minigame[],
    questions: [
        { id: 1, question: "Mitä tarkoittaa abraasio?", options: { A: "Maan kohoamista", B: "Aaltojen aiheuttamaa rannan kulumista", C: "Jokisuiston muodostumista", D: "Meriveden suolapitoisuuden nousua" }, answer: "B", explanation: "Abraasio on prosessi, jossa aallot, virrat ja jää kuluttavat rantaa mekaanisesti." },
        { id: 2, question: "Mikä seuraavista on tyypillinen suomalainen rannikkotyyppi?", options: { A: "Vuono", B: "Ria", C: "Saaristorannikko", D: "Koralliriutta" }, answer: "C", explanation: "Suomen rannikko on kuuluisa laajasta saaristostaan, joka on syntynyt maankohoamisen ja jääkauden seurauksena." },
        { id:3, question: "Mitä on rehevöityminen?", options: { A: "Maan kuivuminen", B: "Metsien kasvu", C: "Vesistön ravinnekuormituksen lisääntyminen", D: "Happikato" }, answer: "C", explanation: "Rehevöityminen johtuu liiallisista ravinteista (typpi, fosfori), jotka aiheuttavat levien liikakasvua ja lopulta happikatoa." },
        { id: 4, question: "Mikä on pääasiallinen syy Itämeren alhaiseen suolapitoisuuteen?", options: { A: "Vähäinen haihtuminen", B: "Kapeat ja matalat yhteydet valtamereen", C: "Runsas sateiden määrä", D: "Kaikki yllä mainitut" }, answer: "D", explanation: "Itämeri on murtovetinen allas, johon virtaa paljon makeaa vettä joista ja sateista, ja sen yhteys suolaiseen valtamereen on heikko." },
        { id: 5, question: "Mitä aallonmurtajan rakentaminen voi aiheuttaa viereiselle ranta-alueelle?", options: { A: "Rannan kasvua aallonmurtajan takana", B: "Lisääntynyttä eroosiota aallonmurtajan vieressä", C: "Veden laadun heikkenemistä", D: "Sekä A että B" }, answer: "D", explanation: "Aallonmurtaja kerää hiekkaa suojan puolelle, mutta voi samalla lisätä eroosiota rakenteen sivustoilla muuttamalla virtauksia." },
        { id: 6, question: "Mikä ilmiö aiheuttaa merenpinnan nousua globaalisti?", options: { A: "Laivojen vesikuorma", B: "Maanjäristykset", C: "Ilmaston lämpeneminen ja jäätiköiden sulaminen", D: "Kuun vetovoiman heikkeneminen" }, answer: "C", explanation: "Lämpenevä ilmasto sulattaa jäätiköitä ja laajentaa merivettä lämpölaajenemisen kautta, mikä nostaa merenpintaa." },
        { id: 7, question: "Mitä tarkoittaa maankohoaminen?", options: { A: "Vuorten syntyminen", B: "Maan kohoaminen jääkauden jälkeisen paineen helpottaessa", C: "Merenpohjan vajoaminen", D: "Tulivuorenpurkaus" }, answer: "B", explanation: "Suomessa on tyypillistä postglasiaalinen maankohoaminen, kun jäämassan painosta vapautunut maankuori palautuu hitaasti." },
        { id: 8, question: "Mikä on dyyni?", options: { A: "Kivikkoinen ranta", B: "Tuulen kasaama hiekkakinos", C: "Vedenalainen kanjoni", D: "Savikkoalue" }, answer: "B", explanation: "Dyynit ovat tuulen muodostamia hiekkakasoja, jotka ovat tärkeitä rannikon ekosysteemejä ja luontaisia suojia." },
        { id: 9, question: "Mikä on mangrovemetsien merkitys rannikolle?", options: { A: "Ne sitovat hiilidioksidia", B: "Ne suojaavat rantaa eroosiolta ja myrskyiltä", C: "Ne ovat tärkeä elinympäristö monille lajeille", D: "Kaikki yllä mainitut" }, answer: "D", explanation: "Mangrovemetsät ovat erittäin tärkeitä trooppisille rannikoille, tarjoten monia ekosysteemipalveluita." },
        { id: 10, question: "Mikä on delta?", options: { A: "Jyrkkä kallioranta", B: "Joen suistoon kerrostunut maa-alue", C: "Syvä merenlahti", D: "Saari" }, answer: "B", explanation: "Delta muodostuu, kun joki laskee mereen tai järveen ja sen kuljettama sedimentti kerrostuu suistoon." },
        { id: 11, question: "Mitä öljyvuoto aiheuttaa meriluonnolle?", options: { A: "Se parantaa veden lämmöneristystä", B: "Se on myrkyllistä eläimille ja kasveille", C: "Se lisää veden suolapitoisuutta", D: "Sillä ei ole vaikutusta" }, answer: "B", explanation: "Öljy on erittäin haitallista, se tuhoaa eläinten lämmöneristyksen ja on myrkyllistä niellen tai ihokosketuksessa." },
        { id: 12, question: "Mikä on hyökyaalto eli tsunami?", options: { A: "Suuri vuorovesiaalto", B: "Myrskyn aiheuttama aalto", C: "Maanjäristyksen tai vedenalaisen maanvyörymän aiheuttama aalto", D: "Jokitulva" }, answer: "C", explanation: "Tsunamit ovat massiivisia aaltoja, jotka saavat energiansa suurista, äkillisistä veden massan siirtymistä." },
        { id: 13, question: "Miksi rannikoiden rakentamista säännellään tarkasti?", options: { A: "Maisemahaittojen vuoksi", B: "Eroosioriskien ja luonnon monimuotoisuuden suojelemiseksi", C: "Rakennusmateriaalien säästämiseksi", D: "Meluhaittojen vuoksi" }, answer: "B", explanation: "Rannikot ovat herkkiä ja dynaamisia ympäristöjä, joiden rakentaminen voi kiihdyttää eroosiota ja tuhota tärkeitä elinympäristöjä." },
        { id: 14, question: "Mikä on murtovesi?", options: { A: "Erittäin suolainen vesi", B: "Täysin makea vesi", C: "Makean ja suolaisen veden sekoitus", D: "Saastunut vesi" }, answer: "C", explanation: "Murtovettä esiintyy jokisuistoissa ja Itämeren kaltaisissa altaissa, joissa makea vesi sekoittuu suolaiseen." },
        { id: 15, question: "Miten laivaliikenne voi vaikuttaa rannikkoekosysteemeihin?", options: { A: "Vieraslajien leviäminen painolastivesien mukana", B: "Melusaaste", C: "Päästöt veteen ja ilmaan", D: "Kaikki yllä mainitut" }, answer: "D", explanation: "Laivaliikenteellä on monia ympäristövaikutuksia, kuten vieraslajien leviäminen ja erilaiset päästöt." },
        { id: 16, question: "Mikä on silokallio?", options: { A: "Tulivuoren jähmettynyttä laavaa", B: "Jääkauden sileäksi hioma kalliomuodostelma", C: "Hiekkakivikerrostuma", D: "Korallimuodostelma" }, answer: "B", explanation: "Silokalliot ovat yleisiä Suomen rannikolla, ja ne ovat selvä merkki mannerjäätikön liikkeestä ja kulutuksesta." },
        { id: 17, question: "Mitä tarkoittaa kestävä kalastus?", options: { A: "Kalastetaan vain suuria kaloja", B: "Kalastetaan niin, että kalakannat eivät vaarannu tulevaisuudessa", C: "Käytetään vain tietynlaisia verkkoja", D: "Kalastetaan vain viikonloppuisin" }, answer: "B", explanation: "Kestävä kalastus varmistaa, että kalakannat pysyvät elinvoimaisina ja ekosysteemi terveenä pitkällä aikavälillä." },
        { id: 18, question: "Mikä on vuorovesi-ilmiön pääasiallinen aiheuttaja?", options: { A: "Maan pyörimisliike", B: "Auringon ja erityisesti Kuun vetovoima", C: "Merivirrat", D: "Tuuli" }, answer: "B", explanation: "Kuun painovoima vetää vesimassoja puoleensa, aiheuttaen nousu- ja laskuveden eli vuorovesi-ilmiön." },
        { id: 19, question: "Mikä on hiekkasärkkä?", options: { A: "Kivinen niemi", B: "Virtausten kasaama pitkä ja kapea hiekkakannas", C: "Syvä vedenalainen hauta", D: "Jyrkkä kallio" }, answer: "B", explanation: "Hiekkasärkät muodostuvat, kun rannansuuntaiset virtaukset kasaavat hiekkaa ja sedimenttiä pitkänomaiseksi muodostelmaksi." },
        { id: 20, question: "Miksi muovijäte on erityisen haitallista merissä?", options: { A: "Se hajoaa mikromuoveiksi, jotka päätyvät ravintoketjuun", B: "Eläimet voivat sekoa siihen tai syödä sitä", C: "Se ei maadu satoihin vuosiin", D: "Kaikki yllä mainitut" }, answer: "D", explanation: "Muoviroska aiheuttaa monenlaisia ongelmia meriekosysteemeille, fyysisistä haitoista kemiallisiin ja pitkäaikaisiin saasteisiin." },
        { id: 21, question: "Mikä on atolli?", options: { A: "Tulivuorisaari", B: "Rengasmainen koralliriutta, joka ympäröi laguunia", C: "Jäävuori", D: "Jokisuisto" }, answer: "B", explanation: "Atollit muodostuvat tyypillisesti uponneen tulivuorisaaren ympärille kasvaneista koralliriutoista." },
        { id: 22, question: "Mitä on rantavyöhykkeen kaavoitus?", options: { A: "Rantatonttien myymistä", B: "Maan- ja vedenkäytön suunnittelua rannikkoalueilla", C: "Uimarantojen rakentamista", D: "Kalastusalueiden merkitsemistä" }, answer: "B", explanation: "Kaavoituksella pyritään ohjaamaan rakentamista ja muuta maankäyttöä kestävällä tavalla, suojellen samalla rannikon arvoja." },
        { id: 23, question: "Mikä on hiidenkirnu?", options: { A: "Meteoriitin kraatteri", B: "Jääkauden sulamisvesien pyörteen hioma kuoppa kalliossa", C: "Vanha tulivuoren kraatteri", D: "Ihmisen kaivama kuoppa" }, answer: "B", explanation: "Hiidenkirnut syntyivät, kun jäätikköjoen pyörteessä pyörivät kivet hioivat kallioon syvän, sylinterimäisen kolon." },
        { id: 24, question: "Mitä on suojelualue?", options: { A: "Alue, jolla on sotilaallista toimintaa", B: "Alue, joka on varattu teollisuudelle", C: "Luonnon monimuotoisuuden tai kulttuuriarvojen säilyttämiseksi perustettu alue", D: "Yksityinen metsästysalue" }, answer: "C", explanation: "Suojelualueilla, kuten kansallispuistoilla, rajoitetaan ihmisen toimintaa luonnon tai kulttuuriperinnön suojelemiseksi." },
        { id: 25, question: "Mikä on Golf-virta?", options: { A: "Kylmä merivirta Etelämantereelta", B: "Lämmin merivirta, joka tuo lämpöä Pohjois-Eurooppaan", C: "Joki Yhdysvalloissa", D: "Tyynenmeren päävirtaus" }, answer: "B", explanation: "Golf-virta on voimakas ja lämmin Atlantin merivirta, joka vaikuttaa merkittävästi Euroopan, myös Suomen, ilmastoon." },
        { id: 26, question: "Mitä tarkoittaa eroosio?", options: { A: "Maanpinnan kuluminen ja maa-aineksen siirtyminen", B: "Kallioperän muodostuminen", C: "Kasvien yhteyttäminen", D: "Veden haihtuminen" }, answer: "A", explanation: "Eroosio on prosessi, jossa tuuli, vesi, jää tai painovoima kuluttaa ja siirtää maa-ainesta paikasta toiseen." },
        { id: 27, question: "Miksi Hailuoto on saari?", options: { A: "Se on aina ollut erillinen manner", B: "Maankohoaminen on nostanut sen merestä", C: "Tulivuorenpurkaus loi sen", D: "Se on suuri hiekkasärkkä" }, answer: "B", explanation: "Hailuoto, kuten monet Suomen rannikon saaret, on noussut merestä jääkauden jälkeisen maankohoamisen seurauksena." },
        { id: 28, question: "Mitä on sinilevä?", options: { A: "Syötävä merilevä", B: "Kala", C: "Syyanobakteerien massaesiintymä, joka voi olla myrkyllinen", D: "Vedenalainen kasvi" }, answer: "C", explanation: "Sinileväkukinnot ovat merkki rehevöitymisestä ja voivat tuottaa myrkkyjä, jotka ovat vaarallisia ihmisille ja eläimille." },
        { id: 29, question: "Mikä on luoto?", options: { A: "Suuri, metsäinen saari", B: "Pieni, puuton kalliosaari", C: "Vedenalainen harjanne", D: "Hiekkaranta" }, answer: "B", explanation: "Luoto on tyypillinen pieni ja karu kalliosaari Suomen saaristossa." },
        { id: 30, question: "Miten ilmastonmuutos vaikuttaa Itämereen?", options: { A: "Veden lämpötila nousee ja jääpeite pienenee", B: "Suolapitoisuus saattaa muuttua sateiden lisääntyessä", C: "Rehevöityminen voi pahentua", D: "Kaikki yllä mainitut" }, answer: "D", explanation: "Ilmastonmuutoksella on monia kompleksisia vaikutuksia Itämeren herkkään ekosysteemiin." },
        { id: 31, question: "Mikä on majakka?", options: { A: "Satamavarasto", B: "Laivojen ohjaamiseen tarkoitettu valotorni", C: "Kalastusalus", D: "Linnake" }, answer: "B", explanation: "Majakat ovat historiallisesti ja edelleen tärkeitä merenkulun turvalaitteita, jotka ohjaavat aluksia vaarallisilla vesillä." },
        { id: 32, question: "Mikä on pooki?", options: { A: "Majakka", B: "Tunnusmajakka, jossa ei ole valoa", C: "Poiju", D: "Satama-allas" }, answer: "B", explanation: "Pooki eli tunnusmajakka on päivämerenkulun apuväline, rakennelma joka auttaa paikantamaan ilman valolaitetta." },
        { id: 33, question: "Mikä on merimetso ja miksi se on joskus kiistanalainen laji?", options: { A: "Pingviini, joka syö liikaa jäätelöä", B: "Lintu, jonka ulosteet voivat tuhota puustoa saarilta", C: "Hylje, joka kilpailee kalastajien kanssa", D: "Valas, joka eksyy laivareiteille" }, answer: "B", explanation: "Merimetson kasvaneet kannat ovat aiheuttaneet paikoin ristiriitoja, koska niiden suuret yhdyskunnat ja voimakkaasti emäksinen uloste voivat tappaa pesimäsaarten kasvillisuuden." },
        { id: 34, question: "Mitä on haamuverkko?", options: { A: "Hämähäkin seitti", B: "Kalastajien veteen kadonnut verkko, joka jatkaa pyytämistä", C: "Langaton internetyhteys", D: "Perhokalastussiima" }, answer: "B", explanation: "Haamuverkot ovat vakava ympäristöongelma, sillä ne pyydystävät ja tappavat mereneläviä hallitsemattomasti vuosikausia." },
        { id: 35, question: "Mitä on vedenalainen melu?", options: { A: "Valaiden laulu", B: "Ihmisen toiminnasta (esim. laivat, rakentaminen) aiheutuva ääni", C: "Aaltojen kohina", D: "Kalojen pulikointi" }, answer: "B", explanation: "Vedenalainen melu voi häiritä ja vahingoittaa mereneläimiä, jotka käyttävät ääntä viestintään, suunnistamiseen ja saalistukseen." },
        { id: 36, question: "Mikä on Kööpenhaminan 'Pieni merenneito' -patsaan materiaali?", options: { A: "Marmori", B: "Kulta", C: "Pronssi", D: "Puu" }, answer: "C", explanation: "Tämä kuuluisa rannikkoteos on valmistettu pronssista ja se on yksi Tanskan tunnetuimmista symboleista." },
        { id: 37, question: "Mitä tarkoittaa FAO:n kalastusaluejärjestelmä?", options: { A: "Järjestelmä kalastuslupien myyntiin", B: "Maailman merien jakaminen tilastollisiin kalastusalueisiin", C: "Opas parhaista kalapaikoista", D: "Kalasäilykkeiden laatustandardi" }, answer: "B", explanation: "YK:n elintarvike- ja maatalousjärjestö FAO on jakanut maailman meret alueisiin kalastustietojen keräämisen ja hallinnoinnin helpottamiseksi." },
        { id: 38, question: "Mikä on siirtolohkare?", options: { A: "Meteoriitti", B: "Jääkauden mukanaan kuljettama ja uuteen paikkaan jättämä suuri kivi", C: "Ihmisen siirtämä kivi", D: "Hiekkadyynin osa" }, answer: "B", explanation: "Siirtolohkareet ovat yleisiä Suomessa ja ne ovat todisteita mannerjäätikön valtavasta voimasta." },
        { id: 39, question: "Minkä maan rannikolla sijaitsee maailman suurin koralliriutta, Iso valliriutta?", options: { A: "Brasilia", B: "Japani", C: "Australia", D: "Meksiko" }, answer: "C", explanation: "Iso valliriutta sijaitsee Koillis-Australian rannikolla ja se on maailman suurin elävien organismien luoma rakennelma." },
        { id: 40, question: "Mitä tarkoittaa 'ekologinen käytävä' rannikolla?", options: { A: "Vesiväylä laivoille", B: "Alue, joka yhdistää elinympäristöjä ja mahdollistaa lajien liikkumisen", C: "Luontopolku turisteille", D: "Kalojen kutureitti" }, answer: "B", explanation: "Ekologiset käytävät ovat elintärkeitä luonnon monimuotoisuudelle, sillä ne auttavat ylläpitämään lajien geneettistä vaihtelua ja populaatioiden elinvoimaisuutta." }
    ] as MCQ[]
  }
};

const PVP_INTERAKTIOT: Section = {
    id: 'H',
    title: 'Konkreettiset PvP-interaktiot',
    content: [
      {
        name: 'Väärän informaation levitys',
        description: 'Aiheuta paniikkia vastustajan alueella levittämällä huhuja myrskystä. Vähentää hetkellisesti Pääoman tuottoa.',
        cost: '50 Pääomaa, 30 Tietoa',
        difficulty: 'Helppo MCQ',
        cooldown: '3 min',
        effect: '-20% Pääoman tuotto 2 minuutin ajan.',
        defense: 'Yhteisökoordinaattorin "Valistuskampanja" tai onnistunut PR-minipeli.'
      },
      {
        name: 'Teollisuuspäästöt',
        description: 'Sabotoi vastustajan teollisuuslaitosta aiheuttaen pienen saastevuodon. Laskee Kestävyyspisteitä.',
        cost: '80 Pääomaa',
        difficulty: '"Salauksen purku" -minipeli',
        cooldown: '5 min',
        effect: '-75 Kestävyyspistettä.',
        defense: '"Saasteiden suodatus" -minipelin onnistunut suoritus, vähentää vahingon 50%.'
      },
      {
        name: 'Tutkimustulosten varastaminen',
        description: 'Varasta vastustajajoukkueen viimeisin tutkimustulos. Saat itsellesi bonuksen, vastustaja menettää sen.',
        cost: '100 Tietoa',
        difficulty: 'Vaikea MCQ',
        cooldown: '8 min',
        effect: 'Saat vastustajan viimeisimmän teknologian käyttöösi ilmaiseksi.',
        defense: 'Insinöörin "Sensoriverkko" antaa varoituksen ja mahdollisuuden torjua varkaus vaikealla "Salauksen purku" -minipelillä.'
      },
      {
        name: 'Infrastruktuurin sabotointi',
        description: 'Vahingoita vastustajan aallonmurtajaa tai muuta puolustusrakennetta, tehden heistä haavoittuvaisempia.',
        cost: '120 Pääomaa, 50 Tietoa',
        difficulty: 'Vaikea "Virtausten hallinta" -minipeli',
        cooldown: '7 min',
        effect: 'Yksi vastustajan rakennus tuhoutuu.',
        defense: 'Aktiivinen puolustus onnistuneella "Hätätoimenpiteet"-minipelillä voi korjata vahingon heti.'
      }
    ] as PvpAction[]
};

const PISTEYTYS_JA_TASAPAINO: Section = {
    id: 'I',
    title: 'Pisteytys ja Tasapainotus',
    content: `
**Pisteiden Lähde (Kestävyyspisteet):**
*   **Peruspisteet alussa:** 1000 Kestävyyspistettä (KP) per joukkue.
*   **Onnistunut rakennus:** +50 KP
*   **Onnistunut tutkimus:** +75 KP
*   **Onnistunut investointi:** +10 KP per minuutti (vaikuttaa passiiviseen tuloon)
*   **Onnistunut puolustus:** +25 KP ja hyökkäyksen vahingon torjuminen.
*   **Minipelin bonus:** Nopeudesta ja tehokkuudesta riippuen +5-20 bonus-KP.
*   **Passiivinen kasvu:** +5 KP per minuutti, jos alueen tila on "Hyvä".

**Pisteiden Menetys:**
*   **Epäonnistunut toiminto:** Menettää toimintoon käytetyt resurssit.
*   **Onnistunut sabotaasi-isku (kohteena):** Vahinko vaihtelee -50 KP ... -150 KP iskun tyypistä riippuen.
*   **Ympäristöongelmat (esim. myrsky):** -100 KP ilman suojausta.
*   **Alueen tila "Huono":** -10 KP per minuutti.

**Tasapainotus ja ELO-järjestelmä:**
*   Jos ranked-pelitila on käytössä, käytetään ELO-kaltaista järjestelmää.
*   Voitosta joukkueen jäsenet saavat pisteitä, jotka perustuvat vastustajajoukkueen ELO-keskiarvoon.
*   \`PisteidenMuutos = K * (OmaTulos - OdotettuTulos)\`
    *   \`K\` = Kerroin (esim. 32)
    *   \`OmaTulos\` = 1 voitosta, 0.5 tasapelistä, 0 häviöstä.
    *   \`OdotettuTulos\` = Lasketaan joukkueiden ELO-keskiarvojen perusteella. Vahvempaa vastustajaa vastaan odotettu tulos on pienempi, joten voitosta saa enemmän pisteitä.
`
};

const OPETTAJAN_TYOKALUT: Section = {
    id: 'J',
    title: 'Opettajan Työkalut ja Luokkatila',
    content: {
        Opettajan_asetukset: `
Opettaja voi säätää pelin asetuksia ennen sen aloittamista:
- **Pelin kesto:** 15–45 minuuttia.
- **Poista PvP käytöstä:** Mahdollistaa yhteistyö- tai rakentelupainotteisen pelin ilman suoria hyökkäyksiä.
- **Pakota tasapainoiset tiimit:** Varmistaa, että algoritmi priorisoi ELO-tasapainoa.
- **Salli kaveriparit:** Pelaajat voivat toivoa pääsevänsä samaan joukkueeseen.
- **Näytä raportit:** Pääsy reaaliaikaisiin ja pelin jälkeisiin raportteihin oppilaiden suoriutumisesta.`,
        Esimerkki_oppitunnin_kulku_25_min: `
- **0-2 min:** Opettaja esittelee pelin tavoitteet ja jakaa pelikoodin. Oppilaat liittyvät peliin.
- **2-4 min:** Joukkueenmuodostus ja roolin valinta. Opettaja tarkistaa joukkueet ja tekee tarvittaessa manuaalisia muutoksia.
- **4-5 min:** Opettaja käynnistää pelin. Lyhyt alkuanimaatio ja ohjeistus.
- **5-20 min:** Aktiivinen pelivaihe. Pelaajat tekevät yhteistyötä, vastaavat kysymyksiin ja suorittavat minipelejä. Opettaja kiertää luokassa ja auttaa tarvittaessa, sekä seuraa yleisnäkymää omalta koneeltaan.
- **20-22 min:** Peli päättyy. Tulostaulu ja voittajat julkistetaan.
- **22-25 min:** Opettajan johtama lyhyt purkukeskustelu (debrief) pelin tuloksista ja opituista asioista.`
    }
};

const RAPORTOINTI_JA_PURKU: Section = {
    id: 'K',
    title: 'Raportointi ja Purkukeskustelu',
    content: {
        Esimerkki_raportin_sisältö_opettajalle: `
**Yhteenveto:**
- Voittajajoukkue: Rannikon Ritarit (Pelaajat: Anna, Pekka, Liisa)
- Loppupisteet: Ritarit 1540 KP, Aaltojen valtiaat 1210 KP, Myrskynsilmät 980 KP.

**Joukkuekohtainen analyysi (Rannikon Ritarit):**
- Oikein vastatut kysymykset: 12/15 (80%)
- Onnistuneet rakennukset: 4
- Onnistuneet hyökkäykset: 2
- Onnistuneet puolustukset: 3
- Vaikeimmat kysymykset: Kysymys #18 (Vuorovesi), Kysymys #25 (Golf-virta).

**Yksilösuoritukset (Pekka, Insinööri):**
- Rooli: Insinööri
- Suoritetut minipelit: 5 (onnistumisprosentti 80%)
- Aktiivisin toiminto: Rakentaminen.
- Vahvuudet: Nopea reagointi puolustustilanteissa.

**Luokan yleiskatsaus:**
- Keskimääräinen vastausprosentti: 72%
- Yleisimmin väärin vastattu kysymysaihe: Merivirrat.`,
        Purkukeskustelun_runko: `
"Hyvää työtä kaikille! Katsotaanpa vähän pelin tuloksia.
1.  **Mitä opitte?** Mikä oli mielenkiintoisin tai yllättävin asia, jonka opitte rannikoista pelin aikana?
2.  **Strategiat:** Voittajajoukkue, mikä oli teidän strategianne? Mikä teki siitä onnistuneen?
3.  **Yhteistyö:** Miten yhteistyö sujui teidän joukkueessanne? Miten eri roolit (Tutkija, Insinööri, Yhteisökoordinaattori) täydensivät toisiaan?
4.  **Haasteet:** Mikä oli pelin haastavin osa? Oliko jokin kysymys tai minipeli erityisen vaikea? (Opettaja voi nostaa esiin raportin tietoja, esim. "Huomasin, että merivirtoja koskevat kysymykset olivat monelle haastavia. Kerrataanpa lyhyesti Golf-virran merkitys...")
5.  **Yhteys todellisuuteen:** Miten pelissä näkyvät asiat, kuten eroosio, saastuminen ja rakentaminen, liittyvät todellisen maailman uutisiin tai ongelmiin Suomessa?
Jatkotehtävänä voitte tutkia oman lähialueenne rannikon tilaa tai valita yhden pelissä esiintyneen ympäristöongelman ja tehdä siitä lyhyen esitelmän."`
    }
};

const OTTELUN_ESIMERKKIKULKU: Section = {
    id: 'L',
    title: 'Yhden ottelun esimerkkikulku',
    content: [
      "Peli alkaa. Joukkue 'Aaltojen valtiaat' (Matti/Tutkija, Sari/Insinööri, Kalle/Koordinaattori) aloittaa.",
      "Kalle (Koordinaattori) päättää investoida turismiin. Hän onnistuu 'Budjetin tasapainotus' -minipelissä, ja joukkueen passiivinen Pääoma-tulo kasvaa.",
      "Samaan aikaan Matti (Tutkija) vastaa oikein kysymykseen maankohoamisesta, ja joukkue saa 80 Tieto-pistettä.",
      "Vastustajajoukkue 'Myrskynsilmät' aloittaa hyökkäyksen: 'Väärän informaation levitys'.",
      "Aaltojen valtiaat saavat ilmoituksen. Kalle käyttää 'Valistuskampanja'-kykynsä ja torjuu hyökkäyksen välittömästi.",
      "Sari (Insinööri) käyttää kerättyjä resursseja ja aloittaa aallonmurtajan rakentamisen. Hän suorittaa 'Virtausten hallinta' -minipelin onnistuneesti. Aallonmurtaja valmistuu ja joukkue saa +50 KP.",
      "Peliin iskee satunnainen tapahtuma: 'Öljyvuotoriski'. Kaikkien joukkueiden on suoritettava 'Saasteiden suodatus' -minipeli.",
      "Matti onnistuu minipelissä erinomaisesti ja saa bonuspisteitä.",
      "Nähdessään Myrskynsilmien resurssien olevan vähissä, Sari (Insinööri) käynnistää 'Teollisuuspäästöt'-sabotaasin heitä vastaan.",
      "Sari onnistuu 'Salauksen purku' -minipelissä. Myrskynsilmät epäonnistuvat puolustuksessa ja menettävät 75 KP.",
      "Pelin viimeisillä minuuteilla Matti (Tutkija) käyttää 'Ennuste'-kykyään ja näkee, että peliin on tulossa myrsky. Joukkue ehtii valmistautua.",
      "Myrsky iskee. Aaltojen valtiaat menettävät vain vähän pisteitä aallonmurtajan ja valmistautumisen ansiosta. Muut joukkueet kärsivät enemmän.",
      "Aika loppuu. Aaltojen valtiaat voittavat korkeimmilla Kestävyyspisteillään."
    ]
};

const SAAVUTETTAVUUS_JA_TURVALLISUUS: Section = {
    id: 'M',
    title: 'Saavutettavuus, turvallisuus ja kiusaamisen esto',
    content: `
- **Ei vapaata chattia:** Pelissä ei ole vapaata tekstichattia pelaajien välillä kiusaamisen ja häirinnän estämiseksi. Viestintä tapahtuu ennalta määriteltyjen pikaviestien ja signaalien avulla (esim. "Hyökätään tuonne!", "Tarvitsen apua!").
- **Anonymiteetti:** Pelaajat käyttävät pelin sisäisiä nimiä. Opettaja näkee oikeat nimet raporteissa.
- **Visuaalinen selkeys:** Käyttöliittymässä käytetään selkeitä kontrasteja, isoja fonttija ja ikoneita. Värisokeille on tarjolla vaihtoehtoinen väripaletti.
- **Kiusaamisen vastaiset mekaniikat:**
    - Anti-grief-sääntö: Samaa joukkuetta ei voi targetoida jatkuvasti.
    - "Kriisiapu"-tila estää jo valmiiksi heikossa asemassa olevan joukkueen täydellisen tuhoamisen.
- **Opettajan valvonta:** Opettajalla on täysi kontrolli pelisessioon. Hän voi poistaa pelaajan pelistä kesken kaiken, jos sopimatonta käytöstä ilmenee luokassa. Pelin tarkoitus on oppiminen, ei murskavoittojen hakeminen.
`
};

const LOKALISAATIO: Section = {
    id: 'N',
    title: 'Lokalisaatio ja pelin suomenkieliset tekstit',
    content: [
      { key: "ui.join_game", value: "Liity peliin" },
      { key: "ui.start_attack", value: "Aloita hyökkäys" },
      { key: "ui.defend", value: "Puolustu" },
      { key: "ui.build", value: "Rakenna" },
      { key: "ui.research", value: "Tutki" },
      { key: "ui.invest", value: "Investoi" },
      { key: "ui.use_ability", value: "Käytä kykyä" },
      { key: "ui.end_turn", value: "Lopeta vuoro (jos vuoropohjainen tila)" },
      { key: "game.lobby.title", value: "Peliaula" },
      { key: "game.lobby.enter_code", value: "Syötä pelin koodi" },
      { key: "game.team_formation", value: "Joukkueita muodostetaan..." },
      { key: "game.select_role", value: "Valitse roolisi" },
      { key: "role.researcher", value: "Tutkija" },
      { key: "role.engineer", value: "Insinööri" },
      { key: "role.coordinator", value: "Yhteisökoordinaattori" },
      { key: "resource.knowledge", value: "Tieto" },
      { key: "resource.capital", value: "Pääoma" },
      { key: "resource.sustainability_points", value: "Kestävyyspisteet" },
      { key: "notification.attack_incoming", value: "Varoitus! Hyökkäys tulossa!" },
      { key: "notification.build_complete", value: "Rakennus valmis!" },
      { key: "notification.storm_warning", value: "Myrskyvaroitus!" },
      { key: "game.end.title", value: "Peli päättyi!" },
      { key: "game.end.winner", value: "Voittaja" },
      { key: "tooltip.sustainability_info", value: "Tämä mittaa rannikkoalueesi yleistä terveyttä ja hyvinvointia." }
    ] as TextBundleItem[]
};

const PIKAOHJE: Section = {
    id: 'O',
    title: 'Pikaohje opettajalle ja oppilaille',
    content: `
**Pelin Tavoite:** Kerätä eniten Kestävyyspisteitä pelin loppuun mennessä kehittämällä omaa rannikkoaluetta ja häiritsemällä vastustajia.

**Pelin Kulku:**
1.  **Liity peliin:** Käytä opettajan antamaa koodia.
2.  **Valitse rooli:** Valitse yksi kolmesta roolista: Tutkija, Insinööri tai Yhteisökoordinaattori. Jokaisella on omat vahvuutensa.
3.  **Tee yhteistyötä:** Peli on joukkuepeli! Kommunikoikaa ja suunnitelkaa yhdessä.

**Tärkeimmät Toiminnot:**
*   **Vastaa kysymyksiin:** Oikeat vastaukset antavat **Tieto**-resurssia.
*   **Suorita minipelejä:** Onnistuneet minipelit mahdollistavat rakentamisen, hyökkäämisen ja puolustautumisen.
*   **Rakenna ja Tutki:** Käytä resursseja parantaaksesi aluettasi ja avataksesi uusia mahdollisuuksia.
*   **Hyökkää strategisesti:** Valitse oikea hetki ja oikea kohde heikentääksesi vastustajia.
*   **Puolustaudu aina:** Kun saat varoituksen hyökkäyksestä, reagoikaa nopeasti!

**Resurssit:**
*   **Pääoma (€):** Kertyy passiivisesti ja onnistuneista toimista. Käytetään rakentamiseen ja hyökkäyksiin.
*   **Tieto (💡):** Saadaan pääasiassa kysymyksistä. Käytetään tutkimukseen ja erikoiskykyihin.
*   **Kestävyyspisteet (💚):** Voittopisteet. Mittaavat alueesi hyvinvointia.

**Vinkit voittoon:**
*   **Tasapaino:** Älä unohda puolustusta hyökätessäsi.
*   **Erikoistu:** Hyödyntäkää roolienne erikoiskykyjä.
*   **Ennakoi:** Seuraa vastustajien toimia ja varaudu yllätyksiin.
`
};

export const SECTIONS: Section[] = [
  YHTEENVETO,
  PELIN_KONSEPTI,
  PELAAJIEN_ROOLIT,
  OTTELUN_KULKU,
  JOUKKUEENMUODOSTUS,
  PELIN_MEKANIIKAT,
  MINIPELIT_JA_KYSYMYKSET,
  PVP_INTERAKTIOT,
  PISTEYTYS_JA_TASAPAINO,
  OPETTAJAN_TYOKALUT,
  RAPORTOINTI_JA_PURKU,
  OTTELUN_ESIMERKKIKULKU,
  SAAVUTETTAVUUS_JA_TURVALLISUUS,
  LOKALISAATIO,
  PIKAOHJE
];
