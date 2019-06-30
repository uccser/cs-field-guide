# Principios heurísticos de la usabilidad

{panel type="teacher-note"}

# ¡Carteles de IPO para el aula!

Jennifer Gottschalk ha publicado un conjunto de carteles que complementan esta sección. [Están disponibles en formato PDF aquí]().

{button-link link="files/HCI-posters.pdf" file="yes" text="Descargar carteles de IPO"}

{panel end}

La mejor manera de evaluar una interfaz es obtener retroalimentación, haciendo que la prueben muchos usuarios potenciales. Sin embargo, esto puede llevar mucho tiempo y resultar caro, por lo que los expertos en IPO han desarrollado algunas reglas generales que nos ayudan a detectar problemas obvios rápidamente. La palabra formal para una regla general es una *heurística* y en esta sección veremos algunas heurísticas comunes que se pueden usar para criticar una interfaz.

Se han propuesto diferentes conjuntos de heurísticas para evaluar interfaces, pero un investigador danés llamado Jakob Nielsen ideó un conjunto de 10 heurísticas ampliamente utilizadas, que describiremos en esta sección. Si encuentras un problema de usabilidad en una interfaz, seguramente está rompiendo una de estas heurísticas y posiblemente varias de ellas. No es fácil diseñar un sistema que no rompa ninguna de las heurísticas y en ocasiones no se desea seguirlas estrictamente, por eso se llaman heurísticas y no reglas.

{interactive slug="confusing-error" type="in-page"}

A menudo, una función confusa en el diseño de una interfaz romperá varias heurísticas. Por ejemplo, el siguiente mensaje de error (es real) no ayuda a los usuarios a recuperarse de los errores (el error real es un ajuste de red, ¡pero la explicación dice que causa el parpadeo de una luz!) y los botones "Omitir", "Cancelar" e "Ignorar" no hablan el idioma del usuario (concordancia entre el sistema y el mundo real).

## Visibilidad del estado del sistema

*El sistema debe mantener siempre informados a los usuarios sobre lo que está sucediendo, a través de una retroalimentación adecuada dentro de un tiempo razonable.*

Esta heurística indica que un usuario debería poder ver lo que está haciendo el dispositivo (el estado del sistema) en todo momento. Esto va desde que el usuario pueda ver si el dispositivo está encendido o apagado a un conjunto de acciones diferentes. Un ejemplo clásico es el de la tecla de "bloqueo mayúsculas", que no muestra claramente si está activada y al escribir una contraseña puede que el usuario no sepa por qué está fallando; un ejemplo positivo de esto son los cuadros de entrada de contraseñas que te avisan cuando la tecla "bloqueo mayúsculas" está activada.

Uno de los estados más simples de un dispositivo es apagado o encendido, que normalmente se indica con una luz de color en el exterior del ordenador. Sin embargo, algunos dispositivos tardan un rato en mostrar el estado (por ejemplo, algunos reproductores de DVD tardan un poco en responder al encenderse) y puede que el usuario vuelva a presionar el botón de encendido o que tenga confusión acerca del estado.

Hay muchas tareas que los usuarios mandan hacer a los ordenadores que requieren algo de tiempo, como copiar documentos, descargar archivos y cargar videojuegos. En esta situación, una de las formas más comunes de mantener informado al usuario acerca de la tarea es la barra de progreso.

{image file-path="img/chapters/windows-busy-cursor-animation.gif" alt="Un cursor de ocupado en Windows" alignment="right"}

{image file-path="img/chapters/apple-busy-cursor-animation.gif" alt="Un cursor de ocupado en Apple" alignment="right"}

Sin embargo, los indicadores de progreso no siempre son útiles; las ruedas giratorias de arriba no indican si vas a tener que esperar unos segundos o unos minutos (o incluso horas) hasta que se complete la tarea, lo que puede resultar frustrante.

Ofrecer retroalimentación en un "tiempo razonable" es muy importante y el "tiempo razonable" a menudo es menos de lo que pensamos. En la sección anterior se realizó un experimento para averiguar en qué punto la gente percibe una reacción retardada; probablemente descubriste que era en torno a una décima de segundo. Si un ordenador tarda más que eso en responder, su uso puede resultar confuso. Hay más información sobre este tema en la sección anterior.

{image file-path="img/chapters/xkcd-estimation.png" hover-text="Podrían decir 'es probable que se haya perdido la conexión', pero es más divertido calcular una media de tiempo ingenua para que tengas la esperanza de que si esperas unas 1163 horas, por fin terminará." alt="El creador del diálogo de copia de archivos de Windows visita a unos amigos y le cuesta decidir a qué hora llegará." source="https://xkcd.com/612/"}

En la evaluación de interfaces hay otros periodos de retardo importantes: un retardo de aproximadamente 1 segundo es cuando los diálogos naturales empiezan a volverse incómodos y de en torno a 10 segundos pone mucha carga sobre el usuario para recordar lo que estaba haciendo. Nielsen tiene un [artículo sobre la importancia de estos periodos de tiempo](http://www.nngroup.com/articles/response-times-3-important-limits/). Si deseas probar estas ideas, intenta mantener una conversación con alguien en la que tienes que esperar 3 segundos antes de cada respuesta; o introduce retardos aleatorios de 10 segundos cuando estés realizando una tarea.

Y si todavía no lo has hecho, prueba la siguiente actividad interactiva.

{interactive slug="delay-analyser" type="whole-page" text="Recurso interactivo Analizador de retardo"}

Que los ordenadores respondan con rapidez a menudo depende de los algoritmos usados (tema tratado en el capítulo sobre algoritmos) y también puede depender del diseño de un programa (por ejemplo, si almacena datos en el disco o espera a una respuesta de la red antes de continuar). Esto es especialmente perceptible en dispositivos pequeños como los smartphones, que tienen una potencia de procesamiento limitada y pueden tardar un segundo o dos en abrir una aplicación o en responder a alguna entrada. No cuesta mucho encontrar este tipo de retardos en los sistemas mientras los estás evaluando.

## Concordancia entre el sistema y el mundo real

*El sistema debe hablar el idioma del usuario, con palabras, frases y conceptos familiares para el usuario, en lugar de términos orientados al sistema. Debe seguir las convenciones del mundo real, presentando la información en un orden natural y lógico.*

El lenguaje, los colores y la notación de una interfaz deben concordar con el mundo del usuario y, aunque parece obvio y razonable, es algo que a menudo se pasa por alto. Por ejemplo, fíjate en los dos botones siguientes, ¿ves lo que resulta confuso?

{interactive slug="confused-buttons" type="in-page"}

{panel type="teacher-note"}

# Respuesta al problema con los botones

Los botones tienen los colores cambiados, el color de cancelar es verde (normalmente usado para indicar "adelante") y el color de confirmar es rojo (normalmente usado para indicar "parar" o "advertencia").

{panel end}

La siguiente interfaz es de un sistema bancario usado para pagar a otra persona. Imagina que envías un correo electrónico pidiéndole a alguien que te pague $1699.50 por un coche usado; prueba a introducir "$1699.50" en el recuadro.

{interactive slug="payment-interface" type="in-page"}

La notación "$1699.50" es una forma común de expresar una cantidad en dólares, pero este sistema te obliga a seguir sus propias convenciones (probablemente facilita las cosas al programador que escribió el sistema).

Intenta encontrar otras cantidades que deberían ser válidas pero que este sistema parece rechazar. Lo ideal es que el sistema sea flexible con el texto de entrada para evitar errores.

{panel type="spoiler"}

# Respuestas a lo anterior, ¡inténtalo antes de leer esto!

El diálogo también rechaza las comas en las entradas, por ej. "1,000", aunque son una forma muy útil de leer cantidades en dólares, por ej. es difícil diferenciar entre 1000000 y 100000, ¡pero la diferencia entre usar uno u otro es enorme! Tampoco te permite poner un espacio antes o después del número, sin embargo, si el número se ha copiado y pegado desde un correo electrónico, puede tener un aspecto totalmente correcto. Un programador menos vago tendría en cuenta estas situaciones; es probable que la versión actual esté usando un sistema de conversión numérica simple que evita que haya que programar más...

{panel end}

## Control y libertad para el usuario

*Los usuarios a menudo eligen funciones del sistema por error y necesitan una "salida de emergencia" claramente señalizada para abandonar ese estado no deseado sin tener que pasar por un diálogo extendido. Funciones deshacer y rehacer.*

Resulta muy frustrante cometer un error y no poder salir de él. La situación es especialmente mala si una pequeña acción puede borrar una gran cantidad de trabajo que no se puede recuperar. El botón de reinicio de algunos formularios web es infame por esto, a menudo se encuentra junto al botón de envío y puedes borrar todos los datos con un error por un paso.

Una forma común de proporcionar libertad al usuario es incluyendo la función "deshacer", lo que significa que no solo se pueden corregir los errores fácilmente, sino que se anima al usuario a experimentar, a probar funciones de la interfaz con la total seguridad de que puede usar la función "deshacer" para volver a como estaban las cosas antes, en vez de preocuparse por terminar en un estado que no puede arreglar. Si también está disponible la función "rehacer", puede alternar entre uno y otro y decidir cuál es mejor. (De hecho, ¡con la función rehacer lo que se hace es deshacer la función deshacer!)

Aquí puedes ver un ejemplo de un botón que no proporciona control al usuario; si lo presionas, perderás esta página entera y tendrás que averiguar cómo volver (¡estás advertido!)

{interactive slug="close-window" type="in-page"}

{panel type="teacher-note"}

# Estabas advertido...

¡Presionar el botón "sí" de abajo puede resultar muy frustrante! La mayoría de los navegadores web modernos brindan cierto control y libertad al usuario en este caso, si tus alumnos están frustrados por haber presionado el botón, actualiza la página.

{panel end}

En ocasiones, la interfaz puede obligar al usuario a hacer algo que no quiere hacer. Por ejemplo, es bastante común que los sistemas operativos o los programas realicen actualizaciones automáticas que requieren un reinicio. A veces, la interfaz no ofrece la oportunidad de cancelarlo o retrasarlo y reinicia el ordenador a pesar de todo. Esto es malo si ocurre cuando el usuario está a punto de dar una presentación.

Otra forma común de este problema es no poder salir de un sistema. Un ejemplo positivo lo vemos con el botón de "inicio" de los smartphones, que casi siempre detiene la aplicación que esté en uso en ese momento.

## Consistencia y estándares

*Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Seguir las convenciones de la plataforma.*

La consistencia (algo que siempre es lo mismo) es extremadamente útil para las personas que usan interfaces y a veces se llama la "regla de oro de la IPO". Si una interfaz es consistente con otras interfaces, el aprendizaje realizado en una interfaz se transfiere directamente a la otra. Uno de los mayores ejemplos de consistencia en programas de ordenador es el copia y pega, que funciona de la misma manera en casi todos los programas, por lo que los usuarios solo tienen que aprender el concepto una vez. Los atajos de teclas para copiar y pegar también son bastante consistentes entre programas. Pero en algunos programas, la función copiar/pegar se comporta de forma diferente y esto puede ser confuso para los usuarios.

Un ejemplo de inconsistencia se encuentra generalmente en los programas de hojas de cálculo, en los que el resultado de presionar "Ctrl+A" (seleccionar todo) depende de si se está editando una celda o si solo se tiene la celda seleccionada (este problema concreto es un problema de "modo"). Aunque esto puede tener sentido para un usuario experto en hojas de cálculo, un usuario nuevo puede experimentar gran confusión al ver que la misma acción provoca una respuesta diferente.

{image file-path="img/chapters/xkcd-standards-cartoon.png" hover-text="Por suerte, el problema de los cargadores se ha resuelto ahora que lo hemos unificado con el mini-USB. ¿O es micro USB? Mierda." alt="Un cómic de xkcd sobre los estándares" source="https://xkcd.com/927/"}

La falta de consistencia es a menudo la razón por la que a la gente no le gustan los sistemas nuevos. Esto es especialmente evidente entre los usuarios de Mac y Windows; alguien que solo ha usado un sistema puede encontrar el uso del otro muy frustrante ya que muchas cosas son diferentes (por ejemplo, pensemos en los controles de las ventanas, que se encuentran en un lugar diferente y tienen iconos distintos). Un usuario experimentado de una interfaz pensará que es "obvio" y no podrá entender por qué le resulta frustrante a la otra persona, lo que puede llevar a intensas discusiones sobre qué interfaz es la mejor. Pueden ocurrir problemas similares cuando sale una versión radicalmente diferente de un sistema operativo (como Windows 8); debe deshacerse gran parte del aprendizaje realizado con el sistema anterior y la falta de consistencia (pérdida del aprendizaje anterior) es frustrante.

## Prevención de errores

*Algo todavía mejor que unos buenos mensajes de error es un diseño meticuloso que evite que los problemas ocurran en primer lugar. Elimina las condiciones propensas a errores o verifícalas y presenta a los usuarios con una opción de confirmación antes de realizar la acción.*

Un programa de ordenador no debería hacer que sea fácil cometer errores graves. Un ejemplo de prevención de errores que se encuentra en muchos programas es la atenuación en gris o desactivación de un elemento del menú en una barra de herramientas o en un menú desplegable. Impide que el usuario utilice una función que no debería usarse en esa situación, como intentar copiar cuando no hay nada seleccionado. Un buen programa también informaría al usuario del motivo por el que un elemento no está disponible (con una nota informativa, por ejemplo).

A continuación encontrarás un selector de fecha; ¿puedes ver los errores que se pueden producir con él?

{interactive slug="date-picker" type="in-page"}

{panel type="spoiler"}

# Algunos de los errores que puedes haber observado

El selector de fecha permite que el usuario elija fechas no válidas, como 30 de febrero o 31 de noviembre. Es difícil acertar con el selector de fecha de tres menús, ya que cada elemento del menú limita lo que puede haber en los otros, pero se puede cambiar cualquiera de ellos. Por ejemplo, puedes elegir el 29 de febrero de 2008 (una fecha válida), luego cambiar el año al 2009 (no válida) y luego otra vez al 2008. Cuando se eligió el 2009, el número del día tendría que cambiar a 28 para evitar errores, pero si ha sido solo un accidente y el usuario vuelve a cambiar al 2008, el número ya ha cambiado y puede que el usuario no se dé cuenta. Es preferible usar un selector de fecha más sofisticado que muestre un calendario, de modo que el usuario solo pueda hacer clic en fechas válidas (muchos sitios web lo ofrecen). ¡Los sistemas de selección de fechas a menudo son un rico ejemplo para explorar problemas de interfaz!

{panel end}

Un problema relacionado con las fechas se da cuando un usuario tiene que elegir una fecha de inicio y una de fin (por ejemplo, para reservar vuelos o una habitación de hotel); el sistema debería evitar que se elija una fecha anterior a la primera fecha para la segunda fecha.

Aquí puedes ver un sistema de menú que ofrece varias opciones:

{interactive slug="available-menu-items" type="in-page"}

Resulta frustrante que aparezca un cuadro de diálogo diciendo que no tienes permitido realizar una acción determinada, ya que quiere decir que el sistema no ha podido evitar un error. Evidentemente, esto puede resultar difícil porque el error puede depender de diferentes elecciones del usuario, pero lo ideal es que el sistema no ofrezca cosas que no puede hacer.

Otro ejemplo de prevención de errores lo vemos con un cajero automático que solo dispensa billetes de 20 $, por ejemplo. Si te permite introducir cualquier cantidad (como 53,92 $ o incluso 50 $), es muy probable que se produzca un error. ¿Qué técnicas has visto en los programas de los cajeros automáticos para evitar este tipo de errores?

{panel type="teacher-note"}

# Prevención de errores en los cajeros automáticos

Algunos cajeros automáticos hacen que sea imposible introducir una cantidad incorrecta permitiendo sacar solo cantidades fijas de dinero y/o poniendo botones como +20 $ y -20 $. Una búsqueda en la web de imágenes para "Cantidad cajeros automáticos" nos puede recordar las diferentes formas en las que las interfaces resuelven este problema (¡o lo causan!) Obviamente, la introducción de una cantidad para un *ingreso* es diferente, ya que puede ser cualquier cantidad, por lo que es probable que use una interfaz diferente, lo que ayuda a prevenir errores, ¡pero reduce la consistencia!

{panel end}

Y aquí hay otro ejemplo, esta vez con un enfoque informático: la siguiente calculadora cuenta con un modo binario, en el que realiza cálculos con números binarios. El problema es que en este modo se pueden seguir escribiendo dígitos decimales, lo que genera un error al realizar el cálculo. Un usuario podría no darse cuenta de que está en modo binario, ¡y el mensaje de error no ayuda especialmente!

{interactive slug="binary-mode-calculator" type="in-page"}

## Reconocimiento en lugar de recuerdo

*Minimiza la carga sobre la memoria del usuario haciendo que los objetos, acciones y opciones sean visibles. El usuario no debería tener que recordar información de una parte del diálogo a otra. Las instrucciones de uso del sistema deberían ser visibles o fácilmente recuperables siempre que sea pertinente.*

A las personas se les da muy bien reconocer elementos, pero a los ordenadores se les da bien recordarlos con exactitud. Un buen ejemplo de esto es el sistema de un menú; si haces clic en el menú "Editar" de un programa, te recordará todas las tareas de edición que hay disponibles y podrás elegir la más adecuada fácilmente. Si en lugar de eso hubiera que escribir un comando de memoria, la carga sobre el usuario aumentaría. En general, es bueno que el ordenador "recuerde" los detalles y que al usuario se le presenten las diferentes opciones y así no tenga que recordarlas. La excepción sería un sistema usado todo el tiempo por un usuario experto que conoce todas las opciones; en este caso, introducir los comandos directamente puede ser una opción más flexible y rápida que tener que seleccionarlos de una lista.

Por ejemplo, cuando escribes el nombre de un lugar en un mapa en línea, puede que el sistema empiece a sugerir nombres en base a lo que estás escribiendo y es probable que adapte las sugerencias para centrarse en tu ubicación o búsquedas anteriores. La siguiente imagen es de Google Maps, que sugiere el nombre del lugar que estás intentando escribir (en este caso, el usuario solo ha tenido que escribir 4 letras y el sistema evita que tenga que recordar la ortografía correcta de "Taumatawhakatangihangakoauauotamateapokaiwhenuakitanatahu" porque puede seleccionarlo). Una función similar en los navegadores web evita que los usuarios tengan que recordar los detalles exactos de una URL que usaron en el pasado; un sistema que te obligue a escribir los nombres exactos de lugares antes de poder buscarlos podría resultar bastante frustrante.

{image file-path="img/chapters/recognition-place-names.png" alt="Mapa prediciendo posibles nombres de lugares"}

## Flexibilidad y eficiencia de uso

*Los aceleradores, invisibles para el usuario novato, a menudo aceleran la interacción para el usuario experto, de modo que el sistema pueda atraer tanto a usuarios principiantes como experimentados. Permitir a los usuarios personalizar las acciones frecuentes.*

Si alguien usa un programa todos los días, pronto tendrá secuencias comunes de operaciones que realiza con frecuencia (como "Abrir el archivo, encontrar el siguiente espacio en blanco, escribir un registro de lo que acaba de suceder"). Está bien ofrecer formas de hacer esto rápidamente, como las "macros", que realizan una secuencia de acciones con solo pulsar una tecla.

Del mismo modo, está bien poder personalizar los programas mediante la asignación de pulsaciones de teclas a acciones frecuentes (como "archivar este correo electrónico en la carpeta 'pendientes'). Las tareas comunes, como copiar y pegar, normalmente tienen pulsaciones de teclas asociadas y estas permiten a los usuarios experimentados realizar la tarea sin tener que usar un ratón.

Un área importante de la investigación en IPO consiste en averiguar cómo hacer que los atajos sean fáciles de aprender. No queremos que supongan un obstáculo para los usuarios principiantes, pero tampoco queremos que los usuarios habituales no sepan que existen. Una forma sencilla de hacer esto es mostrar las pulsaciones de teclas equivalentes en un menú (un acelerador); el menú mostrado aquí indica que mayús-comando-O abrirá un proyecto nuevo, de forma que el usuario puede aprender esta secuencia si usa el comando con frecuencia.

{interactive slug="menu-keystrokes" type="in-page"}

Un sistema flexible permitiría al usuario añadir una pulsación de teclas equivalente para el comando "Cerrar panel", si resulta que se utiliza con frecuencia. Otros sistemas ofrecen sugerencias al usuario si notan que una acción se realiza con frecuencia. Un enfoque relacionado consiste en ofrecer selecciones recientes cerca de la parte superior de una lista de opciones.

## Estética y diseño minimalista

*Los diálogos no deben contener información irrelevante o raramente necesaria. Cada unidad adicional de información en un diálogo compite con las unidades relevantes de información y reduce su visibilidad relativa.*

Los programas pueden contener muchas funciones y que todas sean visibles al mismo tiempo (por ejemplo, en una barra de herramientas) puede resultar abrumador, sobre todo para usuarios nuevos.

Los mandos a distancia de las teles suelen ser un gran ejemplo de interfaces complicadas. Una de las razones por las que tienen tantos botones es porque así el dispositivo parece más impresionante en la tienda, pero una vez que lo llevamos a casa nos damos cuenta de que muchos de los botones son innecesarios o crean confusión.

{interactive slug="remote-complicated" type="in-page"}

El mando a distancia mostrado aquí tiene varios botones que, en principio, podrían hacer lo mismo: "Direct Navigator", "Guide", "Function Menu", "Status" y "Option", todos permiten acceder a diferentes funciones, pero es difícil predecir cuál es cuál. ¡Este mando tiene 55 botones en total!

{interactive slug="remote-simple" type="in-page"}

En cambio, el mando a distancia de Apple tiene muy pocos botones y es un buen ejemplo de una interfaz minimalista. Solo hay un "Menú" para elegir, por lo que está bastante claro lo que hay que hacer para seleccionar los controles necesarios. Obviamente, el mando a distancia simple depende de los menús mostrados en la pantalla y estos tienen el potencial de hacer las cosas más complicadas.

{interactive slug="remote-modified" type="in-page"}

El tercer mando a distancia muestra una solución para simplificarlo y evitar que el usuario tenga que leer un extenso manual informativo. Es un poco drástico, ¡pero puede evitar que el usuario acceda a modos de los que no puede salir! Algunas personas cuentan que han quitado teclas de teléfonos móviles o han pegado botones en su sitio para que el usuario no pueda poner el dispositivo en un estado en el que no debería. Algunos mandos intentan ofrecer lo mejor de ambos mundos y cuentan con una pequeña tapa que se puede abrir para mostrar más funciones.

{panel type="curiosity"}

# Interfaces aterradoras

El siguiente sitio identificó algunas de las interfaces más "aterradoras" que hay por ahí y algunas de ellas son excelentes ejemplos de interfaces que *no* tienen un diseño minimalista: [OK/Cancelar interfaz más aterradora](http://okcancel.com/archives/article/2005/11/the-scariest-interface-part-ii.html).

La dibujante [Roz Chast](http://rozchast.com/) ilustra lo aterrador que puede resultar un mando a distancia con su historieta ["How Grandma sees the remote (Así ve la abuela el mando a distancia)"](http://www.art.com/products/p15063313199-sa-i6845922/roz-chast-how-grandma-sees-the-remote-new-yorker-cartoon.htm).

{panel end}

## Ayudar a los usuarios a reconocer, diagnosticar y recuperarse de los errores

*Los mensajes de error deben expresarse en un lenguaje sencillo (sin códigos), indicando el problema de forma precisa y sugiriendo una solución de manera constructiva.*

¡No es difícil encontrar mensajes de error que no digan cuál es el problema en realidad! Los ejemplos más comunes son mensajes como "Error misc", "Error número -2431" o "Error en uno de los valores de entrada". Estos mensajes obligan al usuario a embarcarse en una misión de depuración para averiguar cuál es el problema, que podría ser desde un cable desconectado o un problema de compatibilidad irreparable hasta un número al que le falta un dígito.

Por ejemplo, un programa de resolución de problemas produjo el siguiente error "inesperado". El mensaje de error es especialmente poco útil porque se supone que el programa debería ayudar al usuario a encontrar problemas, ¡pero en vez de eso le ha dado un nuevo problema que resolver! Hay información adicional que no se muestra a continuación: "Ruta: Desconocida" y "Código de error: 0x80070002". La búsqueda del código de error puede llevar a soluciones recomendadas, pero también conduce a un programa fraudulento que afirma arreglar el problema. Al no proporcionar información útil para recuperarse del error, ¡el sistema ha dejado al usuario a merced de la ayuda disponible en línea!

{interactive slug="unexpected-error" type="in-page"}

Una variante de mensajes de error inútiles es el que ofrece dos alternativas, como: "Puede que el archivo no exista o ya esté en uso". Un mensaje mejor evita que el usuario tenga que averiguar cuál de ellas es el problema.

Se puede encontrar un ejemplo positivo en algunos despertadores como el siguiente, visto en un smartphone con Android. Por ejemplo, aquí la hora de la alarma aparece como las "9:00". En un país que use el formato horario de 12 horas, un usuario puede confundirlo con las 9 PM y la alarma sonaría a la hora incorrecta.

{image file-path="img/chapters/android-alarm-9am.png" alt="despertador de Android programado para las 9:00."}

Sin embargo, la interfaz brinda una oportunidad de darse cuenta, porque la pantalla indica cuánto tiempo queda hasta que suene la alarma, por lo que es más fácil reconocer el error si se selecciona la hora incorrecta (o el día).

{interactive slug="alarm-timer" type="in-page"}

## Ayuda y documentación

Aunque lo mejor es que el sistema se pueda usar sin documentación, puede que sea necesario proporcionar ayuda y documentación. Cualquier información de este tipo debe ser fácil de buscar, debe centrarse en la tarea del usuario, enumerar los pasos concretos a seguir y no debe ser demasiado extensa. ¡El siguiente material interactivo ilustra una situación en la que puede que te hayas encontrado con anterioridad!

{interactive slug="no-help" type="in-page"}

A menudo la ayuda es una idea en la que se piensa en el último momento y suele centrarse en las funciones (por ej. un catálogo de elementos de menú) más que en las tareas (series de acciones necesarias para completar tareas típicas, algo que es bastante más útil para el usuario). Cuando un usuario necesita ayuda, suele ser porque tiene que completar una tarea (como subir fotos desde una cámara) y una buena documentación debería explicar cómo realizar tareas comunes, en vez de explicar cada función (por ej. "Cómo poner la cámara en modo USB").

## Más información sobre las heurísticas

Puedes encontrar más información sobre las [heurísticas en línea en el sitio web de Jakob Nielsen](http://www.nngroup.com/articles/ten-usability-heuristics/).
