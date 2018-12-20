# Gebrauchstauglichkeit (Usability) von Benutzerschnittstellen

{panel type="teacher-note"}

# Einige wichtige Lernziele dieses Kapitels

Schüler sollten u. a. folgende wichtige Erkenntnisse gewinnen:

- Das „System“, das gut funktionieren muss, sind der Computer und der Mensch *miteinander*.
- Viele Menschen machen frustrierende Erfahrungen mit digitalen Geräten. Bisweilen nehmen sie es hin, da sie keine andere Möglichkeit haben. Andererseits verkaufen sich Geräte und Software mit guten Benutzerschnittstellen besser oder es kann ein höherer Preis für sie angesetzt werden, wenn sie Benutzern helfen, ihre Aufgaben zu erledigen.
- Die am wenigsten zur Bewertung einer Schnittstelle geeigneten Personen sind diejenigen, die die Schnittstelle entworfen haben. Sie wissen zwar genau, wie die Schnittstelle funktionieren sollte, wenn sie jedoch von anderen Personen benutzt wird, stellt sich heraus, wie sie von einem typischen Benutzer wahrgenommen wird (daher geht es bei den Projekten hier auch nicht darum, dass Schüler ihr eigenes Programm schreiben und dann die Benutzerschnittstelle beurteilen – dies würde zeigen, dass ihnen das Verständnis für HCI-Evaluierung fehlt!).
- Schnittstellen werden dazu eingesetzt, um Aufgaben auszuführen. Es ist daher sinnvoll, zunächst die Aufgaben zu identifizieren, für die die Schnittstelle vorgesehen ist, und dann zu überlegen, wie schwierig es ist, diese Aufgaben mithilfe der betreffenden Schnittstelle zu erledigen. Häufig wird der Fehler gemacht, sich auf die Funktionen einer Schnittstelle zu konzentrieren. In der Praxis geht es jedoch darum, ob eine Aufgabe anhand dieser Funktionen auch von Anfang bis Ende ausgeführt werden kann.

{panel end}

Geräte werden oft mit Schlagworten wie „benutzerfreundlich“ oder „intuitiv“ angepriesen. Das sind jedoch recht vage Begriffe, die sich nicht genau definieren lassen. Wir werden in diesem Abschnitt den eher technischen Begriff [Usability](https://en.wikipedia.org/wiki/Usability) verwenden, der HCI-Experten wohlbekannt ist und anhand dessen bewertet werden kann, wie gut eine Schnittstelle für eine bestimmte Aufgabe geeignet ist. Bei Usability geht es nicht nur darum, dass eine Schnittstelle ansprechend in der Anwendung ist. Schlechte Usability kann zu schwerwiegenden Problemen führen und hat bereits große Katastrophen wie Flugzeugabstürze, Finanzdesaster und medizinische Pannen herbeigeführt. Gute Gebrauchstauglichkeit ist auch in anderen Bereichen wichtig, da Schnittstellen, die viel Geschicklichkeit, schnelle Reaktionen oder ein gutes Gedächtnis erfordern, vielen Menschen den Zugriff erschweren, wenn Barrierefreiheit sowohl aus moralischer als auch rechtlicher Sicht erwartet werden kann.

{panel type="curiosity"}

# Wenn Schnittstellendesign katastrophal fehlschlägt

- Beim [Absturz des Air-Inter-Flugs 148](https://en.wikipedia.org/wiki/Air_Inter_Flight_148) kamen 87 Menschen ums Leben. Die Piloten hatten die Zahl „33“ eingegeben, um einen Gleitwinkel von „3.3 Grad“ einzustellen. Dieselbe Schnittstelle wurde aber auch dazu verwendet, die Sinkgeschwindigkeit einzugeben, welche vom Computer als „3.300 Fuß pro Minute“ interpretiert wurde. Diese Schnittstellenproblematik wird „Modusfehler“ genannt (später näher erläutert). Weitere Informationen sind [hier](http://blog.martindoms.com/2011/01/24/poor-ui-design-can-kill/) zu finden.
- 13 Menschen wurden getötet und viele andere verletzt, nachdem die Piloten des [Varig-Flugs 254](https://en.wikipedia.org/wiki/Varig_Flight_254) einen falschen Kurs eingegeben hatten. Im Flugplan war der Kurs als 0270 angegeben, was vom Kapitän als 270 Grad ausgelegt und in den Bordcomputer eingegeben wurde. In Wirklichkeit bedeutete dies jedoch 027.0 Grad. Ursache der Verwirrung war die ihm nicht bekannte geänderte Darstellung von Kursangaben und des Dezimalpunkts in Flugplänen. Leider wurde der Kurs des Kapitäns vom Co-Piloten nur gedankenlos bestätigt, anstatt diesen ordungsgemäß vom Flugplan abzulesen. Das Flugzeug flog dann für ein paar Stunden mit Reisegeschwindigkeit auf Autopilot. Unglücklicherweise gewannen [Bestätigungsfehler](https://en.wikipedia.org/wiki/Confirmation_bias) die Oberhand über die Piloten, die davon überzeugt waren, sich in der Nähe ihres Zielflughafens zu befinden, während sie tatsächlich Hunderte von Meilen davon entfernt waren. Letztendlich ging der Treibstoff zu Ende und es kam im Dschungel des Amazonas zu einer Bruchlandung. Bordnetze zu konzipieren, die für die menschliche Nutzung geeignet sind, ist eine große Herausforderung und Teil des weitreichenderen Gebiets der Ergonomieforschung.
- Ein Bankmitarbeiter [gewährte einem Kunden versehentlich einen Kredit von 10 Mio. USD anstelle von 100,000.00 USD](http://edition.cnn.com/2012/08/24/world/asia/new-zealand-accidental-millionaire-sentenced/). Der Kunde hob einen Großteil des Geldes ab und setzte sich nach Asien ab, wodurch die Bank Verluste in Millionenhöhe erlitt und der betroffene Angestellte aufgrund eines Tippfehlers eine traumatische Zeit gehabt hätte. Der Fehler passierte, da der Mitarbeiter zwei zusätzliche Nullen eingetippt hatte, nachdem manche Schnittstellen offenbar das Dezimaltrennzeichen automatisch setzen (man kann 524 tippen, um 5,24 USD einzugeben), während dies bei anderen nicht der Fall ist. Dieser Irrtum beruhte auf uneinheitlicher Beschaffenheit der Schnittstelle, was zu einem Modusfehler führte.
- Eine 43-jährige Frau erlitt einen Atemstillstand, nachdem eine Krankenschwester für eine Dosis Morphium versehentlich 5 anstelle von 0,5 eingegeben hatte. Die Schnittstelle hätte es erschweren müssen, fälschlicherweise eine zehnfache Dosis eingeben zu können. Es gibt eine [wissenschaftliche Veröffentlichung dazu](http://www.ncbi.nlm.nih.gov/pubmed/16738293) und einen [Artikel zum Schnittstellenproblem](http://hrcak.srce.hr/file/95851). Ähnliche Problematiken können in allen Steuersystemen auftreten, bei denen Benutzer einen Wert eingeben. Eine bessere Schnittstelle würde Benutzer dazu zwingen, Werte über Tasten „Höher“ oder „Niedriger“ einzustellen, sodass bedeutende Änderungen einen hohen Aufwand erfordern (das Beispiel zeigt einen „Off-by-one-Error“ auf, bei dem eine ergänzende Zahl fehlt oder hinzugefügt wurde, und weist auch auf das Prinzip des angemessenen Aufwands hin).

In all diesen Fällen könnte dem jeweiligen Benutzer die Schuld für den Fehler zugeschrieben werden (den Piloten, dem Bankmitarbeiter oder der Krankenschwester), andererseits wäre eine gut gestaltete Benutzerschnittfläche, die zur Vermeidung schwerwiegender menschlicher Fehler beiträgt, um einiges besser.

{panel end}

Im Hinblick auf Usability gibt es zahlreiche Elemente, die berücksichtigt werden können. Wir werden davon ein paar ansprechen, die bei der Bewertung alltäglicher Schnittstellen häufig anzutreffen sind. Dabei sollte stets daran gedacht werden, dass es sich bei Schnittstellen nicht nur um Computer handeln kann – digitale Geräte aller Art, wie beispielsweise Wecker, Fernbedienungen, Mikrowellenherde oder Alarmsysteme, können unter Usability-Problemen leiden.

## Konsistenz

Eine der „goldenen Regeln“ für Usability ist *Konsistenz*. Fortwährende Änderungen in einem System führen zu frustrierenden Anwendererlebnissen. Wir hatten zu Anfang das Beispiel der „Gerade“/„Ungerade“ Schaltflächen, die gelegentlich die Position tauschten. Ein positives Beispiel ist die einheitliche Verwendung von „Strg+C“ und „Strg+V“ in vielen verschiedenen Programmen, um Texte oder Bilder zu kopieren und einzufügen. Dies hilft auch im Hinblick auf die *Erlernbarkeit*: Wenn wir in einem Programm gelernt haben, wie kopiert und eingefügt wird, wissen wir, wie dies in vielen anderen Programmen funktioniert. Stellen wir uns nur einmal vor, jedes Programm würde dafür unterschiedliche Menübefehle und Tastenkombinationen verwenden!

Eine weitere damit zusammenhängende Problematik ist der [*Modusfehler*](https://en.wikipedia.org/wiki/Mode_error#Mode_errors), bei dem das Verhalten einer Aktion davon abhängt, in welchem Modus sich der Benutzer befindet. Ein einfaches Beispiel dafür ist eine gedrückte Feststelltaste (insbesondere bei der Eingabe von Passwörtern, wenn der Effekt des Modus nicht sichtbar ist). Ein klassisches Beispiel sind Excel-Tabellen, wo der Effekt des Anklickens einer Zelle vom Modus abhängt: manchmal wird die Zelle ausgewählt, ein anderes Mal wird eventuell der Name der angeklickten Zelle in eine andere Zelle kopiert. Modi werden bei der Schnittstellengestaltung als schlechte Praktik angesehen, da sie leicht zu falschen Benutzeraktionen führen können, und sollten daher möglichst vermieden werden.

## Antwortzeit

Die Schnelligkeit, mit der eine Schnittstelle auf Eingaben anspricht (ihre *Reaktionszeit*), hat erhebliche Auswirkungen auf die Usability. Menschen nehmen Zeit nicht immer proportional zur tatsächlich benötigten Zeit wahr. Wenn etwas schnell genug passiert, empfinden wir es als augenblicklich. Wenn wir warten müssen und währenddessen nichts anderes tun können, kommt es uns vor, als ob die Zeit langsamer vergeht!

Anhand des folgenden interaktiven Moduls lässt sich herausfinden, wie schnell „augenblicklich“ für jeden einzelnen von uns ist. Beim Anklicken der einzelnen Zellen treten bei manchen Zellen zufällig generierte Verzögerungen auf, bevor der Inhalt angezeigt wird, wohingegen es bei anderen Zellen zu keiner Verzögerung kommt. Klicken Sie auf die einzelnen Zellen und belassen Sie es dabei, wenn die Reaktion augenblicklich zu sein scheint. Wenn Sie jedoch vor dem Anzeigen des Teilbilds eine kurze Verzögerung wahrnehmen, klicken Sie es erneut an (durch wird die Zelle grün eingefärbt). Treffen Sie einfach beim ersten Anklicken der einzelnen Zellen eine schnelle, gefühlsmäßige Entscheidung – denken Sie nicht zu viel darüber nach. Die Verzögerung kann sehr kurz sein, es sollten jedoch nur die Zellen grün eingefärbt werden, bei denen mit ziemlicher Sicherheit eine Verzögerung bemerkt wurde.

{interactive slug="delay-analyser" type="whole-page" text="Interaktiver Verzögerungsanalysator"}

Durch Anklicken von „Statistiken anzeigen“ kann nach Aufdecken aller Zellen herausgefunden werden, wie lange die Verzögerungen im Vergleich zur eigenen Wahrnehmung waren. 100 ms (100 Millisekunden) sind ein Zehntel einer Sekunde. Die meisten Menschen tendieren dazu, ab diesem Zeitpunkt eine Verzögerung wahrzunehmen. Kürzere Verzögerungen (insbesondere um die 50 ms) sind nur schwer zu erkennen. Längere Verzögerungen (beispielsweise 350 ms, also mehr als eine Drittelsekunde) werden sehr leicht wahrgenommen.

Der springende Punkt ist, dass alle Schnittstellenelemente (wie Schaltflächen oder Kontrollkästchen), deren Reaktionszeit länger als 100 ms in Anspruch nimmt, vom Benutzer als nicht funktionierend erachtet und unter Umständen erneut angeklickt werden. Im Fall eines Kontrollkästchens kann dies dazu führen, dass das Kästchen deaktiviert bleibt (durch das zweifache Anklicken) und der Benutzer annimmt, dass es nicht funktioniert. Versuchen Sie, das nachfolgende Kontrollkästen gerade häufig genug anzuklicken, sodass es als markiert angezeigt wird.

{interactive slug="delayed-checkbox" type="in-page"}

Bei der Evaluierung von Schnittstellen ist also stets auch daran zu denken, dass selbst kurze Verzögerungen ein System benutzerunfreundlich machen können.

Das folgende Video zeigt ein mit Virtual-Reality-Brillen durchgeführtes Experiment, um Internet-Lags in alltäglichen Lebenssituationen zu simulieren. Es hat englische Untertitel, der interessanteste Teil daran ist jedoch, was in der Handlung zu sehen ist.

{video url="https://www.youtube.com/watch?v=_fNp37zFn9Q"}

## Menschliches Kurzzeitgedächtnis

Ein weiterer wichtiger Zeitfaktor, den es zu berücksichtigen gilt, ist die Dauer unseres *Kurzzeitgedächtnisses*, die normalerweise eine Sache von Sekunden ist. Um uns etwas für einen längeren Zeitraum zu merken, müssen wir es einstudieren (öfters wiederholen) oder eine Notiz der Informationen anfertigen, sie also aufschreiben. Benötigt ein System länger, um zu reagieren (beispielsweise zehn Sekunden), haben Benutzer möglicherweise bis dahin teilweise vergessen, welche weiteren Aktionen sie ausführen wollten. Nehmen wir beispielsweise an, wir möchten eine Telefonnummer eingeben, die uns jemand gerade mitgeteilt hat, und es dauert 12 Sekunden, bis wir sie eintippen können. Unter Umständen haben wir dann die Nummer vergessen. Wenn die Schnittstelle jedoch innerhalb weniger Sekunden bereit ist, können wir die Nummer vermutlich ohne Weiteres eingeben. Aus diesem Grund führen Systemelemente mit einer Reaktionszeit von mehr als zehn Sekunden dazu, dass Benutzer gezwungenermaßen wichtige Informationen einstudieren oder aufschreiben müssen, was das Ganze beschwerlicher macht.

Dieser [Artikel von Jakob Nielsen](http://www.nngroup.com/articles/response-times-3-important-limits/) enthält weitere Informationen zum Thema „Zeitlimits“ für Schnittstellen.

## Menschliches Raumgedächtnis

Ein anderer wichtiger Gesichtspunkt, den es im Hinblick auf Usability zu berücksichtigen gilt, ist das *räumliche Gedächtnis*, d. h. die Fähigkeit, sich an räumliche Gegebenheiten zu erinnern (wie beispielsweise wo sich Schaltflächen oder Symbole befinden). Das menschliche Raumgedächtnis verfügt über eine hohe Kapazität (z. B. können wir uns an die örtliche Lage vieler Plätze und Dinge erinnern), ist lang andauernd (Menschen, die ihre Heimatstadt besuchen, können sich meist an die räumliche Anordnung erinnern) und wir können uns sehr schnell auf Dinge besinnen. Daraus folgt ein sehr einfacher Aspekt der Usability, nämlich dass sich die Gestaltung von Benutzerschnittstellen nicht immer wieder ändern sollte. Die interaktive Aufgabe zu Anfang dieses Kapitels war bewusst frustrierend angelegt, indem die beiden Schaltflächen gelegentlich ausgetauscht wurden. In einer solchen Situation machen Menschen häufig Fehler, da ihr räumliches Gedächtnis die Oberhand gewinnt und die Anordnung der Schaltflächen entscheidender ist, als der darauf befindliche Text. Systeme, bei denen die räumliche Anordnung der Schaltflächen „OK“ und „Abbrechen“ nicht konsequent einheitlich angelegt ist, führen oft dazu, dass die falsche Schaltfläche betätigt wird.

Auch beim Drehen eines Tablets oder Smartphones kann es zu einem geänderten Layout von Benutzerschnittstellen kommen. Auf manchen Geräten werden die Schaltflächen für die geänderte Ausrichtung neu arrangiert, wodurch die räumliche Anordnung verloren geht, während sie auf anderen Geräten gleich bleiben (abgesehen davon, dass sich in der geänderten Ausrichtung unter Umständen eine entstellte Optik ergibt). Probieren Sie dies mit verschiedenen Geräten aus, um zu sehen, auf welchen sich das Layout beim Drehen des Geräts ändert.

{panel type="curiosity"}

# Alltägliche Situationen mit unerwarteten Layout-Änderungen

Es gibt viele Situationen, in denen plötzliche Änderungen des Layouts der Benutzerschnittstellen auftreten und Verwirrung stiften können. Hier sind ein paar Beispiele:

- Layout-Änderungen können auftreten, wenn ein Datenprojektor angeschlossen wird und sich die Bildschirmauflösung ändert (was vor allem frustrierend ist, wenn der Benutzer beispielsweise im Begriff ist, eine Präsentation zu halten und ein bestimmtes Symbol nicht finden kann, wobei noch die Verlegenheit hinzukommt, dass eine Gruppe von Zuhörern wartet).
- Bei der Neuanschaffung eines Geräts in einer anderen Größe (wie beispielsweise ein größerer Bildschirm oder ein neueres Smartphone) müssen sich Benutzer unter Umständen erneut damit vertraut machen, wo alles zu finden ist.
- Auch neue Software-Versionen können ein geändertes Layout mit sich bringen (was einer der Gründe dafür ist, dass das Aktualisieren auf jede neu veröffentlichte Version nicht unbedingt empfehlenswert ist).
- Wird dieselbe Software auf einem anderen Betriebssystem verwendet, kann damit ein leicht unterschiedliches Layout verbunden sein (wenn beispielsweise jemand, der bisher den Chrome-Browser auf Windows verwendet hat, damit anfängt, diesen Browser nun auf Mac OS zu verwenden). Dies kann besonders frustrierend sein, da geläufige Bedienelemente (Fenster schließen/vergrößern und selbst die Steuerungstaste auf der Tastatur) an anderer Stelle zu finden sind, was das räumliche Gedächtnis des Benutzers zum Scheitern bringt.
- Das von Microsoft eingeführte Menüband „Ribbon“ war für Benutzer aus mehreren der bereits genannten Gründe äußerst frustrierend, da die Position der einzelnen Elemente stark von früheren Versionen abwich.
- Adaptive Benutzerschnittstellen können ebenfalls ein Problem darstellen. Es mag zunächst eine scheinbar gute Idee sein, das Menü eines Programms allmählich anzupassen, sodass häufig benutzte Elemente oben angezeigt und seltener benutzte Elemente ausgeblendet werden. Dies kann jedoch zu einer frustrierenden „Schatzsuche“ der Benutzer führen, da sie sich nicht auf ihr räumliches Gedächtnis verlassen können, um Dinge aufzufinden.

{panel end}

Mit dem räumlichen Gedächtnis steht auch unser *Muskelgedächtnis* bzw. das Bewegungslernen in Verbindung, das uns dabei hilft, die Position von etwas zu bestimmen, ohne genau hinzusehen. Mit etwas Übung sollte es uns für gewöhnlich möglich sein, eine häufig benutzte Schaltfläche auszuwählen, indem wir die Maus mit unserer Hand einfach die gleiche Distanz bewegen wie immer, anstatt aufmerksam hinsehen zu müssen. Mit einer neuen Tastatur zu arbeiten kann daher bedeuten, das bisher entwickelte Muskelgedächtnis erneut trainieren zu müssen, was uns verlangsamen oder dazu führen kann, dass wir die falschen Tasten drücken.

## Verfehlte Schaltflächen

Eines der häufigen menschlichen Fehlverhalten, die bei Benutzerschnittstellen zu berücksichtigen sind, ist der „*Off-by-one-Error*“, bei dem Benutzer versehentlich ein Element anklicken oder antippen, das sich neben dem Element befindet, welches sie anklicken oder antippen wollten. Beispielsweise ist es riskant, das Menüelement „Speichern“ neben dem Menüelement „Löschen“ zu positionieren, da bereits ein kleiner Flüchtigkeitsfehler des Benutzers dazu führen kann, dass eine Datei gelöscht wird, anstatt sie zu speichern. Ein ähnliches Problem ist auf Tastaturen anzufinden: Beispielsweise schließt die Tastenkombination Strg+W ein Fenster in einem Webbrowser, während Strg+Q den gesamten Webbrowser schließt. Die Auswahl dieser beiden nebeneinanderliegenden Tasten stellt also ein Problem dar. Dieses Problem könnte natürlich dadurch behoben werden, dass Benutzer zur Bestätigung der Aktion aufgefordert werden, oder dass alle Fenster gespeichert werden und Benutzer lediglich den Browser erneut öffnen müssten, um wieder auf die zuvor in Bearbeitung befindlichen Fenster zuzugreifen. Auch Webformulare können von diesem Problem betroffen sein, wenn sich beispielsweise direkt neben der Schaltfläche „Senden“ eine Schaltfläche zum „Zurücksetzen“ befindet und der „Off-by-one-Error“ dazu führt, dass Benutzern alle gerade eingegebenen Daten verlorengehen.

{interactive slug="off-by-one" type="in-page"}

## Arbeitsschritte bewusst schwieriger gestalten

Ein weiteres von HCI-Designern verwendete Konzept ist das *„Prinzip des angemessenen Aufwands“*, wonach häufig vorgenommene Aktionen leicht auszuführen sein sollten, es jedoch in Ordnung ist, für komplexere Aktionen eine komplexere Vorgehensweise erforderlich zu machen. Beispielsweise sollte in einem Textverarbeitungsprogramm das Ausdrucken einer Seite wie abgebildet ein einfacher Vorgang sein, es ist jedoch in Ordnung, wenn für doppelseitige, zwei auf einer Seite oder oben links geklammerte Dokumente etwas mehr Aufwand erforderlich ist. In der Tat sollte mehr Aufwand *vorgeschrieben* sein, wenn der Befehl ernsthafte Konsequenzen hat, wie beispielsweise das Löschen einer Datei, das vollständige Leeren eines Geräts oder das Auflösen eines Kontos. In solchen Fällen können künstliche Arbeitsschritte hinzufgefügt werden, wie beispielsweise die Frage „Sind Sie sicher?“, oder Benutzer gezwungen werden, die Schaltfläche „Höher“ mehrmals zu drücken, um einschneidende Einstellungen auf einem Gerät vorzunehmen (wie beispielsweise die Spannung für die Stromzufuhr einzustellen), anstatt nur ein paar weitere Nullen einzutippen.

{interactive slug="action-menu" type="in-page"}

## Zusammenfassende Anmerkungen

Dies sind nur ein paar Konzepte des Gebiets der Mensch-Computer-Interaktion (HCI), die dabei helfen, sich der Problematiken bewusst zu werden, die Benutzerschnittstellen innewohnen können. Im folgenden Projekt können wir derartige Problematiken selbst miterleben, indem wir *eine andere Person* bei der Handhabung einer Benutzerschnittstelle beobachten und alle auftretenden Probleme notieren. Es ist um einiges einfacher, eine andere Person zu beobachten, als dies selbst zu tun, da es zum einen schwierig ist, sich auf die Benutzerschnittstelle zu konzentrieren und gleichzeitig Notizen zu machen, und zum anderen, da wir die Benutzerschnittstelle unter Umständen bereits kennen und gelernt haben, mit einigen der weniger benutzerfreundlichen Funktionen umzugehen.

{panel type="project"}

# Think-Aloud-Protokoll

Die Think-Aloud-Methode beinhaltet, jemanden bei der Handhabung der zu bewertenden Benutzerschnittstelle zu beobachten und diese Person dazu anzuhalten, ihre Gedanken bei jedem einzelnen Schritt laut auszusprechen. Der Beobachter notiert die ausgesprochenen Gedanken und kann diese dann anschließend zu Überlegungen heranziehen, um die Benutzerschnittstelle zu bewerten (wenn möglich, sollte die Testdurchführung aufgezeichnet werden).

Diese Methode vermittelt Einblicke darüber, was an einer Benutzerschnittstelle eventuell verwirrend ist und warum.

Nehmen wir beispielsweise an, eine Testperson stellt einen Wecker und sagt: „Ich drücke die Nach-oben-Taste bis ich bei 7:00 Uhr angekommen bin – ach, Mist, es hat bei 7:09 Uhr aufgehört, jetzt muss ich das Ganze nochmal komplett durchgehen“. Dies gibt uns Einblicke darüber, wie die Schnittstelle Benutzern bei der effizienten Ausführung von Aufgaben im Weg stehen könnte.

Diese Vorgehensweise konzentriert sich darauf, einen Benutzer bei der Ausführung einer bestimmten *Aufgabe* zu beobachten, um festzuhalten, was passiert, wenn eine Benutzerschnittstelle in der Praxis verwendet wird. *Aufgaben* werden oft mit *Funktionen* verwechselt. Wir nutzen jedoch die Funktionen eines Geräts, um eine Aufgabe auszuführen. Nehmen wir das Beispiel einer Kamera, die über eine Funktion verfügt, auf schnelle Weise mehrere Fotos aufnehmen zu können, bei der maßgeblichen Aufgabe handelt es sich jedoch wahrscheinlich eher darum, „ein Foto einer Veranstaltung aufzunehmen, das beste Foto auszuwählen und mit anderen zu teilen“. Dies kann eine Reihe an Benutzeraktionen umfassen: den Mehrfachfoto-Modus einstellen, die Kamera für die gegebenen Lichtbedingungen konfigurieren, die Fotos aufnehmen, das beste davon auswählen, mit einem Computer verbinden, das Foto auf eine Website übermitteln und mit Freunden teilen.

Das Projekt wird noch interessanter, wenn die Testperson nicht vollständig mit dem System vertraut ist oder es sich um ein System handelt, das von vielen Benutzern als verwirrend oder frustrierend empfunden wird. Anhand des aus dem Versuch resultierenden Protokolls können dann Entscheidungen über zukünftige Verbesserungen des Systems getroffen werden.

Als Aufgabe bieten sich Dinge wie die Zeit auf einer Uhr einzustellen, eine kürzlich gewählte Nummer auf einem unbekannten Smartphone zu finden oder eine Fernsehsendung zur Aufnahme auszuwählen.

Um die Evaluierung durchzuführen, sollten Sie der Testperson das Gerät übergeben, die Aufgabe erläutern und sie darum bitten, ihre Gedanken bei den einzelnen Schritten laut auszusprechen. Wenn die Testperson mit der Methode nicht vertraut ist, können während des Ablaufs Fragen gestellt werden, wie beispielsweise:

- Was wirst du jetzt tun? Warum?
- Warum hast du diese Schaltfläche ausgewählt?
- Wonach suchst du?
- Hast du Schwierigkeiten? Was ist das Problem?
- Kannst du erkennen, was schiefgelaufen ist?
- Was hältst du davon?

Wenn die Testperson den Bogen des „laut denken“ heraus hat, machen Sie sich einfach stillschweigend Notizen davon, was gesagt wird.

Es ist äußert wichtig, die Testperson nicht zu kritisieren oder einzuschüchtern! Wenn die Testperson einen Fehler macht, versuchen Sie herauszufinden, wie die Benutzerschnittstelle zu einer falschen Aktion geführt hat, anstatt der Testperson die Schuld dafür zu geben. Alle von der Testperson gemachten Fehler bieten wertvolle Informationen für Ihr Projekt! Wenn alles fehlerlos verläuft, wird es nicht sonderlich aufschlussreich sein.

Gehen Sie anschließend Ihre Notizen durch und versuchen Sie, die Ereignisse nachzuvollziehen, die dem Benutzer Schwierigkeiten bereiteten. Die zuvor in diesem Kapitel aufgeführten Beispiele können Ihnen dabei helfen, benutzerunfreundliche Elemente der Schnittstelle zu verstehen und Möglichkeiten zu finden, diese zu verbessern.

Weitere Informationen zu Think-Aloud-Protokollen sind auf [Wikipedia](https://en.wikipedia.org/wiki/Think_aloud_protocol) und auf [Nielsens Website](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/) zu finden. Zudem sind [ein paar von HCI-Studenten angefertigte Notizen](http://www.psy.gla.ac.uk/~steve/HCI/cscln/trail1/Lecture5.html) verfügbar.

{panel end}

{panel type="project"}

# Cognitive Walkthrough

Eine weitere Methode der Evaluierung einer Benutzerschnittstelle ist ein kognitiver Durchgang, auch „Cognitive Walkthrough“ genannt. Dieser wird normalerweise ohne Mitwirkung anderer durchgeführt, wenn auch die Beschreibung mittlerweile angepasst wurde, um einen Benutzer zu beteiligen, und damit die Methode für diejenigen zu erleichtern, die keine Erfahrung mit HCI-Evaluierungen haben. Der *Cognitive Walkthrough* ist eine von HCI-Experten angewendete Technik, um eine Benutzerschnittstelle auf schnelle Weise zu analysieren. Diese Methode ist insbesondere für Schnittstellen nützlich, die nur wenige Schritte umfassen und von neuen oder gelegentlichen Benutzern in Anspruch genommen werden (wie beispielsweise Personen, die eine Parkscheinmaschine am Flughafen benutzen, einen Wecker in einem Hotelzimmer stellen oder eine Bildschirmanzeige in einem Museum bedienen).

Zunächst ist eine typische Aufgabenstellung auszuwählen, für die die zu bewertende Schnittstelle benutzt würde (beispielsweise Kauf eines 2-Stunden-Parkscheins, Stellen des Weckers auf 5:20 Uhr oder Herausfinden, wo sich ein bestimmtes Ausstellungsstück in einem Museum befindet).

Anhand eines Cognitive Walkthrough soll ermittelt werden, ob Benutzern die einzelnen Schritte klar sind, und vor allem festzustellen, ob es verwirrende oder mehrdeutige Elemente gibt (wie beispielsweise welche Schaltfläche als nächstes zu drücken ist), und herauszufinden, ob sich Benutzer sicher sind, dass alles richtig vonstatten ging.

Ein erfahrener HCI-Bewerter würde dies selbst durchführen und sich dabei überlegen, was ein Benutzer bei den einzelnen Schritten jeweils tun würde. Es mag jedoch einfacher sein, die Schnittstelle von einer anderen Person bedienen zu lassen, da die Schnittstelle so aus der Sicht eines Dritten betrachtet werden kann. Wir empfehlen Ihnen daher, einen Dritten zu bitten, eine Aufgabenstellung für Sie zu durchlaufen.

Die Aufgabe muss lediglich drei oder vier Schritten umfassen (z. B. Schaltflächen drücken), da Sie bei jedem Schritt drei Fragen stellen und die Antworten notieren werden, und dies eine Zeitlang dauern könnte. Sie selbst sollten wissen, wie die Aufgabe ausgeführt werden kann, da wir uns auf die paar Schritte konzentrieren werden, die zur erfolgreichen Durchführung der Aufgabe erforderlich sind. Falls der Benutzer das Ziel aus den Augen verliert, können Sie ihn zur Aufgabe zurückführen und müssen nicht zusehen, wie er versucht, sich von einem HCI-Problem zu erholen, das eigentlich gar nicht vorhanden sein sollte. Als Aufgabenstellung bietet sich beispielsweise an, ein 10-Sekunden-Video auf einem Mobiltelefon aufzuzeichnen, eine SMS zu löschen oder eine Mikrowelle einzustellen, um Essen für 45 Sekunden aufzuwärmen.

Präsentieren Sie Ihrer Testperson die Schnittstelle ohne Anweisungen zur Anwendung und geben Sie das Ziel der Aufgabe bekannt. Fragen Sie die Testperson noch bevor diese eine Aktion ausführt: "*Ist es klar, wie bei diesem Schritt vorzugehen ist?*" Lassen Sie die Testperson die Schnittstelle ansehen und fragen Sie: "*Ist es ersichtlich, wie dies erreicht wird?*" Lassen Sie die Testperson dann die von ihr vorgeschlagene Aktion ausführen und fragen Sie: "*Kann erkannt werden, ob alles richtig gemacht wurde?*"

Sofern die Testperson falsche Entscheidungen trifft, können Sie die Schnittstelle zurücksetzen und von vorne beginnen und dabei nötigenfalls erläutern, was die Testperson anstelle des falschen Schritts tun sollte (merken Sie jedoch an, dass es sich nicht um eine eindeutige Situation handelt, sondern um einen Aspekt, der zur Verbesserung der Schnittstelle berücksichtigt werden wird).

Sobald die erste Aktion abgeschlossen ist, wiederholen Sie das Ganze mit der nächsten erforderlichen Aktion (dabei kann es sich um das Drücken einer Taste oder das Anpassen eines Steuerungselements handeln). Stellen Sie auch hier während des Vorgangs die drei oben genannten Fragen.

In der Praxis wird die zweite Frage (Ist es ersichtlich, wie dies erreicht wird?) für gewöhnlich in zwei Fragen aufgeteilt: Nimmt die Testperson das Steuerelement überhaupt wahr und, falls ja, erkennt die Testperson, dass es das benötigte Element ist? Für diese Übung vereinfachen wir das Ganze jedoch auf eine Frage.

[Weitere Einzelheiten zur Durchführung eines Cognitive Walkthrough sind auf der Website CS4FN zu finden](http://www.cs4fn.org/usability/cogwalkthrough.php).

Auch der [Wikipedia-Artikel für Cognitive Walkthrough](https://en.wikipedia.org/wiki/Cognitive_walkthrough) bietet weitere Informationen.

{panel end}