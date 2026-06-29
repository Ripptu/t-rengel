export interface CitySEOData {
  name: string;
  slug: string;
  districts: string[];
  landmarks: string[];
  seoText: string;
  highways: string[];
  zipCodes: string;
}

export const CITY_SEO_MAP: Record<string, CitySEOData> = {
  "essen": {
    name: "Essen",
    slug: "essen",
    districts: ["Altenessen", "Rüttenscheid", "Borbeck", "Bredeney", "Frohnhausen", "Holsterhausen", "Steele", "Werden", "Kettwig", "Katernberg", "Stoppenberg", "Heisingen", "Kray", "Kupferdreh", "Bochold", "Altendorf", "Südviertel"],
    landmarks: ["Zeche Zollverein", "Baldeneysee", "Grugapark", "Limbecker Platz"],
    highways: ["A40", "A42", "A52", "B224"],
    zipCodes: "45127 - 45359",
    seoText: "Als Ihr lokaler Schlüsseldienst in Essen sind wir rund um die Uhr auf den Straßen von Altenessen bis Rüttenscheid für Sie aktiv. Unsere Zentrale an der Bocholder Straße ermöglicht extrem kurze Anfahrtszeiten über die A40, A42 und B224. Ob eine zerstörungsfreie Türöffnung im Südviertel, ein schneller Schlosswechsel in Borbeck oder moderner Einbruchschutz in Bredeney – unsere qualifizierten Monteure garantieren Ihnen faire Festpreise ohne versteckte Kosten."
  },
  "gelsenkirchen": {
    name: "Gelsenkirchen",
    slug: "gelsenkirchen",
    districts: ["Buer", "Schalke", "Horst", "Ückendorf", "Rotthausen", "Erle", "Feldmark", "Hassel", "Resse", "Heßler", "Bulmke-Hüllen"],
    landmarks: ["Veltins-Arena", "Nordsternpark", "Zoom Erlebniswelt", "Schloss Berge"],
    highways: ["A2", "A42", "B227"],
    zipCodes: "45879 - 45899",
    seoText: "In der traditionsreichen Stadt Gelsenkirchen ist unser Schlüsselnotdienst im gesamten Stadtgebiet von Gelsenkirchen-Buer bis Ückendorf blitzschnell zur Stelle. Wenn Sie sich vor der Veltins-Arena ausgesperrt haben oder ein neues Schloss in Schalke benötigen, erreichen unsere mobilen Einsatzfahrzeuge Sie in meist nur 15 bis 25 Minuten über die A2 oder A42. Transparent, zuverlässig und rund um die Uhr erreichbar."
  },
  "bottrop": {
    name: "Bottrop",
    slug: "bottrop",
    districts: ["Eigen", "Fuhlenbrock", "Grafenwald", "Boy", "Kirchhellen", "Batenbrock", "Vonderort", "Welheim"],
    landmarks: ["Tetraeder", "Movie Park Germany", "Alpincenter Bottrop", "Schloss Beck"],
    highways: ["A2", "A31", "B224"],
    zipCodes: "46236 - 46244",
    seoText: "Ob im Schatten des Tetraeders in Bottrop-Eigen, in Fuhlenbrock oder im nördlichen Kirchhellen – unser lokaler Aufsperrdienst in Bottrop hilft Ihnen sofort bei zugefallenen Wohnungstüren und defekten Schlössern. Durch unsere direkte Nähe zur Stadtgrenze Essen nutzen wir die B224 und die A2 optimal, um Ihnen Anfahrtszeiten von unter 20 Minuten zu garantieren. 100% zerstörungsfreie Türöffnung ab 69 €."
  },
  "duisburg": {
    name: "Duisburg",
    slug: "duisburg",
    districts: ["Meiderich", "Hamborn", "Walsum", "Rheinhausen", "Huckingen", "Wanheimerort", "Marxloh", "Ruhrort", "Neudorf", "Wedau"],
    landmarks: ["Landschaftspark Duisburg-Nord", "Duisburger Innenhafen", "Schwanentor", "MSV-Arena"],
    highways: ["A40", "A59", "A3", "A52"],
    zipCodes: "47051 - 47279",
    seoText: "In der Metropole Duisburg am Rhein und der Ruhr sichert unser Schlüsseldienst alle Stadtteile von Meiderich über den Innenhafen bis hin nach Rheinhausen ab. Über die A40, A59 und das dichte Autobahnkreuz Kaiserberg sind unsere Techniker schnell an jedem Einsatzort im Duisburger Raum, um zugefallene Türen schadensfrei zu öffnen, Zylinder zu wechseln oder Einbruchschutz-Systeme zu installieren."
  },
  "mulheim-an-der-ruhr": {
    name: "Mülheim an der Ruhr",
    slug: "mulheim-an-der-ruhr",
    districts: ["Speldorf", "Broich", "Heißen", "Saarn", "Styrum", "Dümpten", "Menden-Holthausen", "Altstadt"],
    landmarks: ["Schloss Broich", "Wasserbahnhof Mülheim", "MüGa-Park", "Camera Obscura"],
    highways: ["A40", "A52", "B1"],
    zipCodes: "45468 - 45481",
    seoText: "In der charmanten Stadt am Fluss, Mülheim an der Ruhr, stehen wir Ihnen von Speldorf über Saarn bis Heißen rund um die Uhr zur Seite. Dank der direkten Nachbarschaft zu Essen sind unsere mobilen Schlüssel-Spezialisten über die Ruhrschnellweg-A40 und die Bundesstraße B1 in Rekordzeit bei Ihnen vor Ort, um Ihnen eine schnelle und kostengünstige Türöffnung zum Festpreis zu garantieren."
  },
  "oberhausen": {
    name: "Oberhausen",
    slug: "oberhausen",
    districts: ["Sterkrade", "Osterfeld", "Alstaden", "Buschhausen", "Lirich", "Tackenberg", "Holten", "Königshardt", "Schmachtendorf"],
    landmarks: ["Gasometer Oberhausen", "Centro Oberhausen", "Schloss Oberhausen", "Kaisergarten"],
    highways: ["A3", "A42", "A516"],
    zipCodes: "46045 - 46149",
    seoText: "Ob beim beliebten Centro, im geschäftigen Sterkrade oder im grünen Königshardt – unser professioneller Schlüsseldienst in Oberhausen öffnet verschlossene Türen, Briefkästen und Fahrzeuge im Handumdrehen. Über die A3, A42 und A516 koordinieren wir unsere mobilen Einheiten so, dass Sie nie lange im Kalten warten müssen. Seriös, geprüft und mit Festpreisgarantie."
  },
  "bochum": {
    name: "Bochum",
    slug: "bochum",
    districts: ["Wattenscheid", "Querenburg", "Langendreer", "Wiemelhausen", "Riemke", "Weitmar", "Altenbochum", "Grumme", "Dahlhausen", "Gerthe"],
    landmarks: ["Deutsches Bergbau-Museum", "Planetarium Bochum", "Ruhr-Universität", "Jahrhunderthalle"],
    highways: ["A40", "A43", "A448"],
    zipCodes: "44787 - 44894",
    seoText: "Mitten im Herzen des Reviers, in Bochum, ist unser 24h-Schlüsselnotdienst für Sie im Dauereinsatz. Von Riemke bis Querenburg und im gesamten Bereich Wattenscheid stehen wir Ihnen bei verschlossenen Haus- oder Autotüren kompetent zur Seite. Unsere erfahrenen Techniker nutzen die A40 und die A43, um Ihnen eine Anfahrt innerhalb von 20 Minuten zum Festpreis zu gewährleisten."
  },
  "moers": {
    name: "Moers",
    slug: "moers",
    districts: ["Kapellen", "Rheinkamp", "Asberg", "Utfort", "Scherpenberg", "Meerbeck", "Repelen", "Schwafheim"],
    landmarks: ["Moerser Schloss", "Schlosspark Moers", "Das Geleucht", "Kulturzentrum Bollwerk"],
    highways: ["A40", "A42", "A57"],
    zipCodes: "47441 - 47447",
    seoText: "Auf der linken Rheinseite in Moers ist unser Schlüsseldienst Ihr vertrauenswürdiger Partner für beschädigungsfreie Türöffnungen. Ob in Kapellen, Repelen oder Asberg – über die A40, A42 und A57 sind unsere Techniker schnell an Ihrer Adresse im Kreis Wesel. Wir sichern Ihnen eine transparente Abwicklung und faire, günstige Ortspreise ab 69 € zu."
  },
  "marl": {
    name: "Marl",
    slug: "marl",
    districts: ["Brassert", "Hüls", "Drewer", "Hamm", "Sinsen", "Polsum", "Frentrop"],
    landmarks: ["Marler Stern", "Chemiepark Marl", "Skulpturenmuseum Glaskasten", "Guido-Heiland-Bad"],
    highways: ["A52", "A43"],
    zipCodes: "45768 - 45772",
    seoText: "Im Norden des Ruhrgebiets, in Marl, ist unser Schlüsselnotdienst schnell zur Stelle, wenn der Schlüssel von innen steckt oder verloren ging. Ob in Sinsen-Lenkerbeck, Hüls oder Drewer – wir befahren die A52 und die A43 täglich, um Ihnen eine zügige Hilfe innerhalb von 15 bis 30 Minuten zu garantieren. Zerstörungsfrei, fair und rund um die Uhr besetzt."
  },
  "gladbeck": {
    name: "Gladbeck",
    slug: "gladbeck",
    districts: ["Mitte", "Zweckel", "Rentfort", "Ellinghorst", "Brauck", "Butendorf", "Schultendorf"],
    landmarks: ["Wasserschloss Wittringen", "Rathaus Gladbeck", "Maschinenhalle Zweckel"],
    highways: ["B224", "A2", "A52"],
    zipCodes: "45964 - 45968",
    seoText: "Als unmittelbarer Nachbar von Essen und Bottrop gehört Gladbeck zu unserem Kerngebiet. In Rentfort, Brauck oder Zweckel stehen wir Ihnen jederzeit mit unserem Aufsperrdienst zur Seite. Über die B224 und die A2 erreichen wir jeden Einsatzort in Gladbeck in nur 15 bis 20 Minuten. Verlassen Sie sich auf zertifizierte Qualität vom Fachmann."
  },
  "kamp-lintfort": {
    name: "Kamp-Lintfort",
    slug: "kamp-lintfort",
    districts: ["Hoerstgen", "Kamperbruch", "Niersenhorst", "Gestfeld", "Geisbruch", "Kamp", "Saalhoff"],
    landmarks: ["Kloster Kamp", "Landesgartenschau-Gelände", "Förderturm Schacht 1/2"],
    highways: ["A42", "A57"],
    zipCodes: "47475",
    seoText: "Nahe dem historischen Kloster Kamp bietet unser mobiler Schlüsseldienst in Kamp-Lintfort schnelle und zerstörungsfreie Türöffnungen. Über die A42 und A57 sind unsere Notdienst-Techniker zügig bei Ihnen vor Ort in Gestfeld, Geisbruch oder Kamp, um Schlösser fachgerecht auszutauschen, verschlossene Türen zu öffnen oder Einbruchschäden abzusichern."
  },
  "witten": {
    name: "Witten",
    slug: "witten",
    districts: ["Herbede", "Annen", "Rüdinghausen", "Stockum", "Heven", "Bommern", "Mitte"],
    landmarks: ["Zeche Nachtigall", "Berger-Denkmal", "Ruhrviadukt Witten", "Helenenturm"],
    highways: ["A43", "A448", "A44"],
    zipCodes: "58452 - 58456",
    seoText: "In Witten an der Ruhr sind unsere freundlichen Schlüsseldienst-Techniker 24/7 für Sie da. Ob in Herbede, Annen oder Bommern – wir helfen Ihnen unkompliziert und zum garantierten Festpreis bei zugefallenen Türen. Über die A43 und A448 erreichen wir Sie schnell an jedem Ort im Ennepe-Ruhr-Kreis."
  },
  "herne": {
    name: "Herne",
    slug: "herne",
    districts: ["Wanne-Eickel", "Eickel", "Sodingen", "Baukau", "Holsterhausen", "Crange", "Mitte"],
    landmarks: ["Schloss Strünkede", "Cranger Kirmesplatz", "Akademie Mont-Cenis"],
    highways: ["A42", "A43"],
    zipCodes: "44623 - 44653",
    seoText: "Bekannt für Wanne-Eickel und die Cranger Kirmes, bietet unser Schlüsseldienst in Herne verlässliche Soforthilfe. Über die A42 und die A43 sind wir in der gesamten Stadt von Baukau bis Sodingen in nur 15 bis 25 Minuten vor Ort, um Türen schadensfrei zu öffnen, Zylinder auszutauschen oder Schließanlagen zu installieren."
  },
  "herten": {
    name: "Herten",
    slug: "herten",
    districts: ["Westerholt", "Scherlebeck", "Disteln", "Langenbochum", "Bertlich", "Süd", "Scherlebeck"],
    landmarks: ["Schloss Herten", "Zeche Ewald", "Glashaus Herten"],
    highways: ["A2", "A43"],
    zipCodes: "45699",
    seoText: "Im Kreis Recklinghausen, in Herten, steht Ihnen unser mobiler 24-Stunden-Schlüsselnotdienst jederzeit zur Verfügung. Ob in der historischen Freiheit Westerholt, in Disteln oder Langenbochum – wir sind schnell vor Ort über die Autobahn A2, um Ihnen eine materialschonende Türöffnung zum fairen Ortstarif anzubieten."
  },
  "dorsten": {
    name: "Dorsten",
    slug: "dorsten",
    districts: ["Wulfen", "Hervest", "Holsterhausen", "Feldmark", "Rhade", "Lembeck", "Altendorf-Ulfkotte", "Hardt"],
    landmarks: ["Schloss Lembeck", "CreativQuartier Fürst Leopold", "Altstadt Dorsten"],
    highways: ["A31", "B224"],
    zipCodes: "46282 - 46286",
    seoText: "An der Lippe, in Dorsten, sichert unser Aufsperrdienst alle Bezirke von Lembeck über Hervest bis Wulfen ab. Über die A31 und die Bundesstraße B224 sind unsere Notdienst-Techniker schnell und zuverlässig bei Ihnen, um Autotüren oder Wohnungstüren zerstörungsfrei zu öffnen. Keine versteckten Kosten, direkt vom Fachbetrieb."
  },
  "dortmund": {
    name: "Dortmund",
    slug: "dortmund",
    districts: ["Hörde", "Aplerbeck", "Mengede", "Brackel", "Hombruch", "Eving", "Innenstadt", "Lütgendortmund", "Dorstfeld", "Scharnhorst"],
    landmarks: ["Florianturm", "Dortmunder U", "Signal Iduna Park", "Phoenix-See"],
    highways: ["A2", "A40", "A45", "B1"],
    zipCodes: "44135 - 44388",
    seoText: "In der größten Stadt des Ruhrgebiets, Dortmund, bieten wir Ihnen einen schnellen und preisgünstigen Schlüsseldienst-Service. Ob am Phoenix-See, in Hörde oder Mengede – über die A2, A40 und B1 sind unsere mobilen Monteure rasch an Ort und Stelle, um jede Türöffnung hochprofessionell und zu fairen Festpreisen auszuführen."
  },
  "datteln": {
    name: "Datteln",
    slug: "datteln",
    districts: ["Ahsen", "Horneburg", "Meckinghoven", "Hagem", "Beisenkamp", "Mitte"],
    landmarks: ["Dattelner Kanalkreuz", "Hermann-Grochtmann-Museum", "Schleuse Datteln"],
    highways: ["A2", "B235"],
    zipCodes: "45711",
    seoText: "Am größten Kanalkreuz der Welt, in Datteln, ist unser zuverlässiger Schlüsseldienst für Sie im Einsatz. Ob in Horneburg, Ahsen oder Hagem – wir stehen für schnelle Hilfe bei Schlüsselverlust, Schlossdefekt oder Einbruchschaden. Wir garantieren Ihnen kurze Warzeiten und faire Ortstarife ab 69 €."
  },
  "hagen": {
    name: "Hagen",
    slug: "hagen",
    districts: ["Haspe", "Hohenlimburg", "Dahl", "Eilpe", "Boele", "Altenhagen", "Mitte"],
    landmarks: ["LWL-Freilichtmuseum Hagen", "Schloss Hohenlimburg", "Osthaus Museum"],
    highways: ["A1", "A45", "A46"],
    zipCodes: "58089 - 58135",
    seoText: "Als Tor zum Sauerland bietet unser Schlüsseldienst in Hagen schnelle Türöffnungen im gesamten Stadtgebiet. Von Haspe über Boele bis Hohenlimburg sind unsere Techniker über die Autobahnen A1 und A45 rasch zur Stelle, um Ihnen bei einer zugefallenen oder verschlossenen Tür kompetente Hilfe ohne überteuerte Preise zu leisten."
  },
  "dinslaken": {
    name: "Dinslaken",
    slug: "dinslaken",
    districts: ["Hiesfeld", "Lohberg", "Eppinghoven", "Averbruch", "Grafschaft", "Mitte"],
    landmarks: ["Burgtheater Dinslaken", "Trabrennbahn Dinslaken", "Rathaus Dinslaken"],
    highways: ["A3", "A59"],
    zipCodes: "46535 - 46539",
    seoText: "Am Übergang zum Niederrhein, in Dinslaken, ist unser Schlüsseldienst Ihr Ansprechpartner für Schließtechnik und zerstörungsfreie Türöffnung. In Hiesfeld, Lohberg oder Eppinghoven sind wir meist in unter 25 Minuten vor Ort. Wir überzeugen durch ehrliche Festpreise und fachmännische Handwerksarbeit."
  },
  "recklinghausen": {
    name: "Recklinghausen",
    slug: "recklinghausen",
    districts: ["Suderwich", "Hochlar", "Hillerheide", "Grullbad", "König-Ludwig", "Mitte", "Scherlebeck"],
    landmarks: ["Ruhrfestspielhaus", "Ikonen-Museum", "Rathaus Recklinghausen"],
    highways: ["A2", "A43"],
    zipCodes: "45657 - 45665",
    seoText: "In der Festspielstadt Recklinghausen helfen wir Ihnen rund um die Uhr aus der Klemme. Ob in Suderwich, Hochlar oder auf der Hillerheide – unsere mobilen Techniker sind über die A2 und A43 in Kürze bei Ihnen, um Wohnungstüren und PKWs schadensfrei aufzusperren. Günstig, transparent und zertifiziert."
  },
  "ratingen": {
    name: "Ratingen",
    slug: "ratingen",
    districts: ["Lintorf", "Hösel", "Eggerscheidt", "Homberg", "Ost", "West", "Tiefenbroich", "Mitte"],
    landmarks: ["Wasserburg Haus Zum Haus", "LVR-Industriemuseum Cromford", "Marktplatz Ratingen"],
    highways: ["A3", "A44", "A52"],
    zipCodes: "40878 - 40885",
    seoText: "Nördlich von Düsseldorf gelegen, ist unser Schlüsseldienst in Ratingen in Stadtteilen wie Lintorf, Hösel oder Tiefenbroich zügig vor Ort. Über die Autobahnen A3, A52 und A44 erreichen unsere Monteure Sie im Handumdrehen, um Ihnen eine schnelle, materialschonende Notöffnung zum fairen Festpreis anzubieten."
  },
  "krefeld": {
    name: "Krefeld",
    slug: "krefeld",
    districts: ["Uerdingen", "Fischeln", "Bockum", "Oppum", "Hüls", "Traar", "Inrath", "Mitte"],
    landmarks: ["Burg Linn", "Krefelder Zoo", "Stadtwald Krefeld", "Rheinhafen Uerdingen"],
    highways: ["A40", "A44", "A57"],
    zipCodes: "47798 - 47809",
    seoText: "In der Samt- und Seidenstadt Krefeld öffnet unser Schlüsseldienst verschlossene Türen in Uerdingen, Bockum oder Fischeln. Über die A40, A44 und die Rheinbrücke sind unsere Techniker schnell einsatzbereit für zerstörungsfreie Tür- und Autoöffnungen zum fairen Tarif ohne Abzocke."
  },
  "kempen": {
    name: "Kempen",
    slug: "kempen",
    districts: ["St. Hubert", "Tönisberg", "Schmalbroich", "Mitte"],
    landmarks: ["Kurkölnische Burg", "Kuhtor", "Historische Altstadt Kempen"],
    highways: ["A40", "A57"],
    zipCodes: "47906",
    seoText: "In der historischen Thomasstadt Kempen am Niederrhein ist unser Schlüsselnotdienst schnell vor Ort, um Ihnen Einlass in Ihr Zuhause zu gewähren. In St. Hubert, Tönisberg oder Schmalbroich garantieren wir Ihnen kompetente Beratung, präzisen Schlossaustausch und zerstörungsfreie Öffnungstechniken."
  },
  "dusseldorf": {
    name: "Düsseldorf",
    slug: "dusseldorf",
    districts: ["Flingern", "Bilk", "Oberkassel", "Gerresheim", "Derendorf", "Pempelfort", "Unterrath", "Eller", "Benrath", "Stadtmitte", "Hafen"],
    landmarks: ["Rheinturm", "Königsallee (Kö)", "Düsseldorfer Altstadt", "Schloss Benrath"],
    highways: ["A44", "A46", "A52", "A57"],
    zipCodes: "40210 - 40629",
    seoText: "In der Landeshauptstadt Düsseldorf ist unser Schlüsseldienst im gesamten Stadtgebiet von Kaiserswerth bis Benrath für Sie da. Wenn Sie sich in Oberkassel ausgesperrt haben oder ein Schloss in Bilk wechseln müssen, sind wir über die A52, A44 und A46 in Rekordzeit bei Ihnen. Absolut seriös und ohne dubiose Zuschläge."
  },
  "neuss": {
    name: "Neuss",
    slug: "neuss",
    districts: ["Grimlinghausen", "Uedesheim", "Norf", "Reuschenberg", "Erfttal", "Mitte", "Gnadental"],
    landmarks: ["Quirinus-Münster", "Neusser Hafen", "Obertor Neuss"],
    highways: ["A57", "A46", "A52"],
    zipCodes: "41460 - 41472",
    seoText: "Als eine der ältesten Städte Deutschlands bietet unser Schlüsseldienst in Neuss professionelle Notöffnungen und Einbruchschutz-Beratungen. Ob in Norf, Uedesheim oder Grimlinghausen – wir sind rasch bei Ihnen, um Türen schadensfrei zu öffnen. Wir garantieren Ihnen Festpreise ohne versteckte Kosten."
  },
  "erkrath": {
    name: "Erkrath",
    slug: "erkrath",
    districts: ["Hochdahl", "Unterfeldhaus", "Alt-Erkrath"],
    landmarks: ["Neandertal-Museum", "Lokschuppen Hochdahl", "Stellwerk Erkrath"],
    highways: ["A3", "A46"],
    zipCodes: "40699",
    seoText: "Am Rande des Neandertals, in Erkrath, hilft Ihnen unser Schlüsseldienst schnell und zuverlässig. In Hochdahl, Unterfeldhaus oder Alt-Erkrath öffnen wir zugefallene Türen zu 99% zerstörungsfrei. Über die A3 und A46 sind unsere Techniker blitzschnell an Ihrer Adresse für erstklassige Schlosswechsel-Services."
  },
  "wuppertal": {
    name: "Wuppertal",
    slug: "wuppertal",
    districts: ["Elberfeld", "Barmen", "Vohwinkel", "Cronenberg", "Ronsdorf", "Langerfeld", "Uellendahl"],
    landmarks: ["Wuppertaler Schwebebahn", "Zoo Wuppertal", "Historische Stadthalle"],
    highways: ["A46", "A1", "A535"],
    zipCodes: "42103 - 42399",
    seoText: "In der Stadt der Schwebebahn, Wuppertal, bietet unser erfahrener Schlüsseldienst schnelle Türöffnungen von Elberfeld bis Barmen. Über die A46 sind wir rasch vor Ort, um zugefallene oder abgeschlossene Haus- und Wohnungstüren materialschonend und kostengünstig für Sie zu öffnen."
  },
  "heiligenhaus": {
    name: "Heiligenhaus",
    slug: "heiligenhaus",
    districts: ["Mitte", "Isenbügel", "Hetterscheidt", "Abtsküche", "Heidkant"],
    landmarks: ["Abtskücher Teiche", "Museum Abtsküche", "Waggonbrücke Heiligenhaus"],
    highways: ["A44"],
    zipCodes: "42579",
    seoText: "Im Kreis Mettmann, in Heiligenhaus, steht Ihnen unser Schlüsseldienst bei allen Schloss- und Schlüsselproblemen zur Seite. Ob in Isenbügel, Hetterscheidt oder der Stadtmitte – wir sind in meist nur 15 bis 25 Minuten bei Ihnen, um Türen schadensfrei zu öffnen oder Schlösser zu erneuern."
  },
  "unna": {
    name: "Unna",
    slug: "unna",
    districts: ["Massen", "Königsborn", "Hemmerde", "Lünern", "Afferde", "Mitte"],
    landmarks: ["Zentrum für Internationale Lichtkunst", "Burg Unna", "Kurpark Königsborn"],
    highways: ["A1", "A2", "B1"],
    zipCodes: "59423 - 59427",
    seoText: "Am östlichen Rand des Ruhrgebiets, in Unna, steht unser Schlüsseldienst für verlässlichen Einbruchschutz und schnelle Aufsperrhilfe. In Königsborn, Massen oder Hemmerde garantieren wir kurze Wartezeiten über die A1, A2 und B1 sowie transparente Festpreise ab 69 €."
  },
  "bergkamen": {
    name: "Bergkamen",
    slug: "bergkamen",
    districts: ["Weddinghofen", "Rünthe", "Oberaden", "Overberge", "Heil", "Mitte"],
    landmarks: ["Marina Rünthe", "Römerlager Oberaden", "Halde Großes Holz"],
    highways: ["A1", "A2"],
    zipCodes: "59192",
    seoText: "In Bergkamen und der bekannten Marina Rünthe ist unser Schlüsselnotdienst rund um die Uhr für Sie einsatzbereit. Ob in Weddinghofen, Oberaden oder Rünthe – wir sind schnell vor Ort, um Türen schadensfrei zu öffnen, Zylinder auszutauschen oder Schließanlagen zu montieren."
  },
  "oer-erkenschwick": {
    name: "Oer-Erkenschwick",
    slug: "oer-erkenschwick",
    districts: ["Oer", "Rapen", "Erkenschwick", "Honermannsiedlung"],
    landmarks: ["Stimbergpark", "Zeche Ewald Fortsetzung", "Rathaus Oer-Erkenschwick"],
    highways: ["A2", "A43"],
    zipCodes: "45739",
    seoText: "Am Rande der Haard, in Oer-Erkenschwick, bietet unser Schlüsseldienst schnelle Notöffnungen für Haus-, Wohnungs- und Autotüren. In Oer, Rapen oder Erkenschwick sind unsere Techniker schnell vor Ort, um Ihnen fachgerecht, fair und materialschonend Einlass zu gewähren."
  },
  "haltern-am-see": {
    name: "Haltern am See",
    slug: "haltern-am-see",
    districts: ["Sythen", "Lippramsdorf", "Hullern", "Flaesheim", "Hamm-Bossendorf", "Mitte"],
    landmarks: ["Halterner Stausee", "LWL-Römermuseum", "Schloss Sythen"],
    highways: ["A43", "B58"],
    zipCodes: "45721",
    seoText: "In der beliebten Erholungsstadt Haltern am See sind wir Ihr zuverlässiger Schlüsseldienst bei Schlüsselverlust oder Schlossdefekt. In Sythen, Flaesheim oder Hullern sind unsere Techniker schnell über die A43 vor Ort, um zerstörungsfreie Türöffnungen zum garantierten Festpreis durchzuführen."
  },
  "wetter-ruhr": {
    name: "Wetter Ruhr",
    slug: "wetter-ruhr",
    districts: ["Alt-Wetter", "Wengern", "Volmarstein", "Esborn"],
    landmarks: ["Burgruine Volmarstein", "Harkortsee", "Harkortturm"],
    highways: ["A1", "A43"],
    zipCodes: "58300",
    seoText: "In Wetter an der Ruhr bietet unser Schlüsseldienst schnelle Hilfe bei ausgesperrten Personen. Ob in Volmarstein, Wengern oder Alt-Wetter – wir öffnen Türen zu 99% beschädigungsfrei und stehen Ihnen für Schloss- und Zylinderwechsel fachgerecht zur Verfügung."
  },
  "sprockhoevel": {
    name: "Sprockhövel",
    slug: "sprockhoevel",
    districts: ["Haßlinghausen", "Niedersprockhövel", "Obersprockhövel", "Gennebreck"],
    landmarks: ["Bergbauwanderweg Sprockhövel", "Zwiebelturmkirche", "Trasse Sprockhövel"],
    highways: ["A43", "A46"],
    zipCodes: "45549",
    seoText: "Als Wiege des Ruhrbergbaus bietet Sprockhövel schnellen Service durch unseren Schlüsseldienst. In Haßlinghausen oder Niedersprockhövel sind wir über die A43 und A46 zügig bei Ihnen, um Schlösser auszutauschen, Einbruchschutz zu verbessern oder Wohnungstüren zerstörungsfrei zu öffnen."
  },
  "gevelsberg": {
    name: "Gevelsberg",
    slug: "gevelsberg",
    districts: ["Asbeck", "Berge", "Silschede", "Mitte"],
    landmarks: ["Ennepe-Strand Gevelsberg", "Dorfkirche Silschede", "Stadtgarten Gevelsberg"],
    highways: ["A1", "A43"],
    zipCodes: "58285",
    seoText: "Im Ennepe-Ruhr-Kreis, in Gevelsberg, ist unser Schlüsselnotdienst 24 Stunden am Tag für Sie besetzt. Ob in Silschede, Berge oder Mitte – wir sind schnell vor Ort, um Sie kompetent, freundlich und zu fairen Festpreisen aus jeder misslichen Lage zu befreien."
  },
  "ennepetal": {
    name: "Ennepetal",
    slug: "ennepetal",
    districts: ["Voerde", "Milspe", "Rüggeberg", "Altenvoerde"],
    landmarks: ["Kluterthöhle", "Heilenbecke-Talsperre", "Industriemuseum Ennepetal"],
    highways: ["A1", "A43"],
    zipCodes: "58256",
    seoText: "Nahe der berühmten Kluterthöhle in Ennepetal bietet unser Schlüsseldienst professionelle Aufsperrhilfe und Schlosswechsel-Dienste. In Milspe, Voerde oder Rüggeberg sind wir schnell vor Ort, um verschlossene Haus- oder Autotüren schadensfrei und preisgünstig zu öffnen."
  },
  "wuelfrath": {
    name: "Wülfrath",
    slug: "wuelfrath",
    districts: ["Düssel", "Flandersbach", "Rohdenhaus", "Mitte"],
    landmarks: ["Zeittunnel Wülfrath", "Historischer Kirchplatz Düssel", "Kalksteinbrüche Wülfrath"],
    highways: ["A33", "A535"],
    zipCodes: "42489",
    seoText: "In der idyllischen Kalkstadt Wülfrath sind wir Ihr kompetenter Schlüsseldienst für Türöffnungen und Schließtechnik. Ob im historischen Düssel, Flandersbach oder der Stadtmitte – wir sind in 15 bis 25 Minuten vor Ort, um Ihnen schadensfreie Türöffnungen zum Festpreis zu garantieren."
  },
  "rheinberg": {
    name: "Rheinberg",
    slug: "rheinberg",
    districts: ["Orsoy", "Budberg", "Borth", "Eversael", "Mitte"],
    landmarks: ["Historisches Rathaus Rheinberg", "Underberg-Palais", "Zollstadt Orsoy"],
    highways: ["A42", "A57"],
    zipCodes: "47495",
    seoText: "Am schönen Niederrhein, in Rheinberg, steht Ihnen unser Schlüsseldienst jederzeit zur Verfügung. Ob in der historischen Zollstadt Orsoy, in Budberg oder Borth – wir sind schnell vor Ort über die Autobahn A57, um verschlossene oder zugefallene Türen zerstörungsfrei zum Festpreis zu öffnen."
  },
  "velbert": {
    name: "Velbert",
    slug: "velbert",
    districts: ["Mitte", "Langenberg", "Neviges"],
    landmarks: ["Deutsches Schloss- und Beschlägemuseum", "Mariendom Neviges", "Historischer Stadtkern Langenberg"],
    highways: ["A44", "A535"],
    zipCodes: "42549 - 42555",
    seoText: "Als Schlüsselstadt Deutschlands mit dem bekannten Schloss- und Beschlägemuseum ist Velbert ein absolutes Kerngebiet unseres Schlüsseldienstes. In Velbert-Mitte, Langenberg oder Neviges sind wir in Rekordzeit über die A535 vor Ort. Wir stehen für absolute Fachkompetenz und faire Preise."
  },
  "castrop-rauxel": {
    name: "Castrop-Rauxel",
    slug: "castrop-rauxel",
    districts: ["Henrichenburg", "Ickern", "Habinghorst", "Schwerin", "Merklinde", "Frohlinde", "Mitte"],
    landmarks: ["Schiffshebewerk Henrichenburg", "Schloss Bladenhorst", "Westfälisches Landestheater"],
    highways: ["A2", "A42", "B235"],
    zipCodes: "44575 - 44581",
    seoText: "In der Europastadt Castrop-Rauxel öffnet unser Schlüsseldienst jede verschlossene Tür schnell und zuverlässig. Ob in Henrichenburg, Ickern oder Frohlinde – über die Autobahnen A2, A42 und die Bundesstraße B235 sind unsere mobilen Techniker in 15 bis 30 Minuten vor Ort. Keine Abzocke, 100% transparent."
  }
};

export function getSlugForCity(cityName: string): string {
  const norm = cityName.toLowerCase()
    .trim()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  if (CITY_SEO_MAP[norm]) {
    return norm;
  }
  
  // Find closest match or default to essen
  const keys = Object.keys(CITY_SEO_MAP);
  const match = keys.find(k => k.includes(norm) || norm.includes(k));
  return match || "essen";
}
