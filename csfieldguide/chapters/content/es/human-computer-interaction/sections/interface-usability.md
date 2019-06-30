# Usabilidad de la interfaz

{panel type="teacher-note"}

# Algunos de los objetivos de aprendizaje clave de este capítulo

Las ideas clave que los alumnos deberían aprender incluyen:

- El "sistema" que debe funcionar bien es el del ordenador y la persona *juntos*.
- Mucha gente se frustra con los dispositivos digitales. A veces lo aguantan porque es la única opción, pero en otros casos, los dispositivos y el software con buenas interfaces venden mucho más o a precios más altos porque ayudan al usuario a desempeñar su trabajo y cumplir sus objetivos.
- La peor persona para evaluar una interfaz es la persona que la diseñó. Saben exactamente cómo debería funcionar; pero si la prueba otra persona verás lo que le parece a un usuario típico (por este motivo los proyectos aquí no tratan de que un alumno escriba su propio programa y evalué su interfaz, ¡eso demostraría que no entienden la evaluación de la IPO!)
- La interfaz se utiliza para llevar a cabo una tarea, por lo que lo más lógico es identificar las tareas para las que sirve una interfaz en concreto y luego valorar la dificultad de esas tareas con ayuda de esa interfaz. El error más común consiste en centrarse en las características de una interfaz, pero en el mundo real la pregunta es si esas características se pueden usar para llevar a cabo una tarea de principio a fin.

{panel end}

A menudo, los dispositivos se venden usando expresiones pegadizas como "fácil de usar" e "intuitivo", pero se trata de términos ambiguos difíciles de definir. En esta sección utilizaremos el término más técnico, [usabilidad](https://en.wikipedia.org/wiki/Usability), bien entendido por los expertos de la IPO y que nos brinda algunas formas de evaluar la idoneidad de una interfaz para una tarea concreta. La usabilidad no se encarga solo de que una interfaz sea agradable al uso: una usabilidad pobre puede generar problema graves y ha sido la causa de grandes desastres, como accidentes de avión, desastres financieros y contratiempos médicos. También es importante porque una interfaz que requiere mucha destreza, reacciones rápidas o buena memoria hace que sea menos accesible para gran parte de la población y la accesibilidad puede ser una expectativa moral y legal.

{panel type="curiosity"}

# Cuando el diseño de interfaces tiene consecuencias catastróficas

- 87 personas murieron cuando el [vuelo Air Inter Flight 148 se estrelló](https://en.wikipedia.org/wiki/Air_Inter_Flight_148) debido a que los pilotos introdujeron "33" para obtener un ángulo de descenso de 3,3, pero se usó la misma interfaz para introducir la velocidad de descenso, que el piloto automático interpretó como 3300 pies por minuto. Este problema de interfaz se conoce como "error de modo" (descrito más adelante). Hay más información [aquí](http://blog.martindoms.com/2011/01/24/poor-ui-design-can-kill/).
- 13 personas murieron y muchas más resultaron heridas cuando los pilotos del vuelo [Varig Flight 254](https://en.wikipedia.org/wiki/Varig_Flight_254) introdujeron un rumbo incorrecto. El plan de vuelo especificaba un rumbo de 0270, que el capitán interpretó e introdujo en el ordenador de vuelo como 270 grados. Lo que significaba en realidad era 027,0 grados. Esta confusión se produjo debido a que el formato de los rumbos y la posición del punto decimal en los planes de vuelo había cambiado y él no lo sabía. Lamentablemente, el copiloto copió el rumbo del capitán sin pensar, en vez de leerlo desde el plan de vuelo como se suponía que debía hacerlo. Luego el avión voló en piloto automático durante unas horas. Por desgracia, el [sesgo de confirmación](https://en.wikipedia.org/wiki/Confirmation_bias) pudo con los pilotos, que creían que se encontraban cerca de su destino, cuando en realidad estaban a cientos de kilómetros de distancia. El avión se quedó sin combustible y realizó un aterrizaje forzoso en la selva del Amazonas. El diseño de sistemas de aeronaves que funcionen para los humanos supone un gran reto y forma parte de un área más amplia de investigación de factores humanos.
- Un empleado de un banco [concedió accidentalmente a un cliente un préstamo de 10 millones de dólares en vez de 100.000$](http://edition.cnn.com/2012/08/24/world/asia/new-zealand-accidental-millionaire-sentenced/). El cliente retiró la mayor parte del dinero y huyó a Asia, el banco perdió millones de dólares en el proceso y el empleado en cuestión vivió una experiencia traumática, todo por un error de escritura. El error se debió a que el empleado introdujo dos ceros adicionales, al parecer porque algunas interfaces colocan automáticamente el separador decimal (puedes escribir 524 para introducir 5,24$) y otras no. Este error se puede explicar como una falta de coherencia en la interfaz, lo que provoca un error de modo.
- Una mujer de 43 años sufrió un paro respiratorio después de que una enfermera introdujera por accidente 5 en lugar de 0,5 para una tasa de dosis de morfina. La interfaz debería haber hecho que fuera difícil cometer un error por un factor de 10. Existe un [escrito sobre ello](http://www.ncbi.nlm.nih.gov/pubmed/16738293)y un [artículo acerca del problema de la interfaz](http://hrcak.srce.hr/file/95851). Pueden ocurrir problemas similares en cualquier sistema de control en el que el operador tenga que introducir un valor; una buena interfaz obligaría al operador a presionar un botón de "arriba" y "abajo" para que los cambios grandes requieran mucho trabajo (se trata de un ejemplo del "error por un paso", en el que falta o se añade un dígito adicional y que está relacionado también con el principio del esfuerzo acorde).

En todos estos casos podemos echarle la culpa al usuario (los pilotos, el empleado del banco y la enfermera) por cometer un error, pero sería mucho mejor contar con una interfaz bien diseñada que no presente consecuencias graves derivadas de errores que los humanos pueden cometer fácilmente.

{panel end}

En la usabilidad se pueden tener en cuenta muchos elementos y mencionaremos algunos que seguro encontrarás al evaluar interfaces comunes. Ten en cuenta que las interfaces no son solo ordenadores, cualquier dispositivo digital, como un reloj despertador, el mando a distancia del aire acondicionado, el microondas, las alarmas antirrobo, todos ellos pueden sufrir problemas de usabilidad.

## Consistencia

Una de las "reglas de oro" de la usabilidad es la *consistencia*. Si un sistema no hace nada más que cambiar, resultará frustrante usarlo. Antes vimos el ejemplo de una pareja de botones "Par"/"Impar" que intercambiaban lugares en algunas ocasiones. Un ejemplo positivo es el uso consistente de "Ctrl+c" y "Ctrl+v" en diferentes programas para copiar y pegar texto o imágenes. Esto también ayuda en términos de la *capacidad de aprendizaje*: una vez que aprendes a copiar y pegar en un programa, sabes cómo usarlo en muchos otros. ¡Imagina si todos los programas usaran diferentes comandos y atajos para ello!

Un problema relacionado es el [*error de modo*](https://en.wikipedia.org/wiki/Mode_error#Mode_errors), en el que el comportamiento de una acción depende del modo en el que se encuentre el usuario. Un ejemplo sencillo es tener la tecla de bloqueo de mayúsculas presionada (sobre todo al introducir una contraseña, ya que no podemos ver el efecto del modo). Un ejemplo clásico son las hojas de cálculo de Excel, donde el efecto de hacer clic en una celda depende del modo: unas veces selecciona la celda y otras pone el nombre de la celda en la que se ha hecho clic en otra celda. Los modos se consideran una mala práctica en el diseño de interfaces, ya que pueden llevar fácilmente a que el usuario realice la acción incorrecta, y deben evitarse siempre que sea posible.

## Tiempo de respuesta

La velocidad a la que responde una interfaz (su *tiempo de reacción*) tiene un efecto significativo en la usabilidad. La forma en la que los humanos perciben el tiempo no es siempre proporcional al tiempo empleado. Si algo sucede lo suficientemente rápido, lo percibiremos como instantáneo. Si tenemos que esperar y no podemos hacer nada mientras esperamos, ¡parecerá que el tiempo pasa más despacio!

Con el siguiente material interactivo descubrirás cómo de rápido es "instantáneo" para ti. Al hacer clic en las celdas, a veces habrá un retardo aleatorio antes de que aparezca; otras celdas no tendrán retardo. Haz clic en cada celda, y si parece que responde instantáneamente, déjala como está. Sin embargo, si percibes un pequeño retardo antes de que aparezca la imagen, vuelve a hacer clic en ella (hará que la celda se ponga verde). Toma una decisión rápida e instintiva la primera vez que hagas clic en cada celda, no lo pienses demasiado. El retardo puede ser muy breve, pero solo debes poner las celdas en verde si estás bastante seguro de que has notado un retardo.

{interactive slug="delay-analyser" type="whole-page" text="Recurso interactivo Analizador de retardo"}

Una vez que hayas hecho clic en todas las celdas, haz clic en "Ver estadísticas" para descubrir cuánto duraron los retardos en comparación con tu percepción. 100 ms (100 milisegundos) es una décima de segundo; la mayor parte de la gente empieza a percibir un retardo a partir de ese momento; cualquier retardo más corto (sobre todo en torno a 50 ms) es difícil de detectar. Los retardos más largos (por ejemplo, 350 ms, más de un tercio de segundo) se perciben con mucha facilidad.

Lo que se pretende demostrar con esto es que cualquier elemento de una interfaz (como un botón o una casilla) que tarde más de 100 ms en responder será percibido por el usuario como inoperativo y es probable que el usuario vuelva a hacer clic en él. En el caso de una casilla, esto puede hacer que se quede sin marcar (por los dos clics) y el usuario pensará que no está funcionando. Prueba a hacer clic en la siguiente casilla las suficientes veces como para que aparezca seleccionada.

{interactive slug="delayed-checkbox" type="in-page"}

Al evaluar interfaces, ten en cuenta que incluso los retardos más breves pueden hacer que un sistema sea difícil de usar.

El siguiente vídeo muestra un experimento realizado con gafas de realidad virtual para simular los retardos de Internet en situaciones de la vida real. Tiene subtítulos en inglés, pero la parte más interesante es lo que sucede en la acción.

{video url="https://www.youtube.com/watch?v=_fNp37zFn9Q"}

## Memoria a corto plazo humana

Otro intervalo de tiempo importante que hay que tener en cuenta es la duración de nuestra *memoria a corto plazo*, que generalmente es cuestión de segundos. Para recordar algo durante más tiempo, el usuario necesita ensayarlo (repetirlo una y otra vez) o tomar nota de la información, escribiéndola, por ejemplo. Si un sistema tarda en responder (por ejemplo, 10 segundos) es probable que el usuario haya olvidado algún detalle de lo que iba a hacer con el sistema. Por ejemplo, si tienes que escribir un número de teléfono que te acaban de decir y hay que esperar 12 segundos antes de poder escribirlo, puede que olvides el número, mientras que si puedes acceder a la interfaz en un par de segundos, es probable que introduzcas el número sin problema. Por este motivo, cualquier parte de un sistema que tarde más de 10 segundos en responder, obliga al usuario a repetir o escribir la información importante, lo que resulta más pesado.

Puedes encontrar más información sobre los "tiempos límite" para interfaces en [este artículo de Jakob Nielsen](http://www.nngroup.com/articles/response-times-3-important-limits/).

## Memoria espacial humana

Otra consideración importante en usabilidad es la *memoria espacial* – nuestra capacidad para recordar dónde se encuentran las cosas (un botón o un icono, por ejemplo). La memoria espacial humana tiene una gran capacidad (probablemente seas capaz de recordar la ubicación de muchos lugares y objetos), es duradera (la gente que visita la ciudad en la que crecieron a menudo recuerda su disposición) y podemos recordar las cosas con gran rapidez. Un aspecto muy simple de la usabilidad que deriva de esto es que el diseño de una interfaz no debería cambiar constantemente. La actividad interactiva al principio de este capítulo se diseñó para resultar frustrante a propósito, intercambiando la colocación de los dos botones de vez en cuando; la razón por la que la gente a menudo comete errores en esa situación es porque su memoria espacial toma el mando, por lo que la ubicación del botón es más importante que lo que haya escrito en él. Los sistemas que no son constantes en su colocación espacial de los botones "OK" y "Cancelar" pueden hacer que los usuarios presionen el botón equivocado fácilmente.

Otra ocasión en la que el diseño de una interfaz cambia rápidamente es cuando se gira una tablet o un smartphone. Algunos dispositivos reorganizan los iconos para adaptarlos a la nueva orientación, por lo que se pierde la distribución espacial, mientras que otros mantienen la misma (pero puede que no se vean bien en la nueva rotación). Prueba unos cuantos dispositivos diferentes y mira a ver cuáles cambian el diseño al girarlos.

{panel type="curiosity"}

# Situaciones comunes en las que los diseños cambian de forma inesperada

Hay una serie de distintas situaciones en las que el diseño puede cambiar de forma repentina para el usuario, creando confusión. Estos son algunos ejemplos:

- El diseño puede cambiar si se conecta un proyector de datos y cambia la resolución de la pantalla (particularmente frustrante si el usuario está a punto de realizar una presentación delante de un público y no consigue encontrar un icono, con la incomodidad añadida de que hay un montón de gente esperando).
- Si te pasas a un dispositivo de tamaño diferente (un monitor más grande o un smartphone distinto) es posible que tengas que volver a aprender dónde está todo.
- Los diseños a menudo cambian con las nuevas versiones de los programas (una razón por la que puede que no sea la mejor idea actualizar cada vez que sale una versión nueva).
- El mismo programa en un sistema operativo diferente puede tener un diseño ligeramente distinto (por ejemplo, si alguien que usa el navegador Chrome todo el tiempo en Windows empieza a usar Chrome en MacOS). Esto puede resultar especialmente frustrante, ya que la ubicación de los controles más comunes (cerrar/maximizar ventana e incluso la tecla Ctrl en el teclado) es diferente, algo frustrante para la memoria espacial del usuario.
- Cuando salió, la "cinta" de Microsoft Word causó mucha frustración entre los usuarios por varias de las razones ya mencionadas, la posición de los elementos era bastante diferente a la de las versiones anteriores.
- Las interfaces adaptativas también pueden suponer un problema; puede parecer buena idea cambiar de forma gradual el menú de un programa de forma que los elementos usados con mayor frecuencia estén cerca de la parte superior o para que los elementos que no se usen estén ocultos, pero esto puede llevar al usuario a una búsqueda del tesoro frustrante ya que no puede depender de su memoria espacial para encontrar las cosas.

{panel end}

Asociada con la memoria espacial está nuestra *memoria muscular*, que nos ayuda a localizar elementos sin tener que mirar atentamente. Con algo de práctica, es probable que puedas seleccionar un botón común con el ratón simplemente moviendo la mano la misma distancia de siempre, en vez de tener que mirar atentamente. Trabajar con un teclado nuevo puede suponer tener que volver a aprender la memoria muscular ya desarrollada y, por ello, puede que vayamos más despacio o que apretemos las teclas equivocadas.

## Falta el botón

Un error humano común que las interfaces deben tener en cuenta es el *error por un paso*, en el que el usuario accidentalmente escribe o hace clic en un elemento que se encuentra junto al elemento con el que deseaba interactuar. Por ejemplo, si el elemento de menú "guardar" se encuentra junto al elemento de menú "eliminar" es peligroso, ya que un pequeño descuido podría hacer que el usuario borrara un archivo en vez de guardarlo. Ocurre un problema similar con los teclados; por ejemplo, Ctrl+W cierra solo una ventana en el navegador web y Ctrl+Q cierra el navegador entero, por lo que elegir estas dos teclas adyacentes supone un problema. Aunque esto se puede arreglar comprobando si el usuario sale o guardando todas las ventanas para que el usuario solo tenga que volver a abrir el navegador para recuperar su trabajo. Esto también puede ocurrir en los formularios web, en los que hay un botón de reinicio junto al botón de envío y el error por un paso hace que el usuario pierda toda la información que acaba de introducir.

{interactive slug="off-by-one" type="in-page"}

## Creación deliberada de tareas más desafiantes

Otra idea empleada por los diseñadores de IPO es el *principio del esfuerzo acorde*, que dice que las tareas sencillas que se realizan frecuentemente deberían ser fáciles de llevar a cabo, pero no pasa nada por exigir un procedimiento complejo para una tarea compleja. Por ejemplo, en un procesador de textos, imprimir una página tal y como se muestra debería ser fácil, pero no pasa nada si se requiere un poco más de esfuerzo para imprimir a doble cara, dos páginas por hoja, con una grapa en la esquina superior izquierda. De hecho, en algunas ocasiones se debería de *requerir* más esfuerzo si el comando tiene una consecuencia grave, como al eliminar un archivo, formatear un dispositivo o cerrar una cuenta. En tales casos, se pueden añadir tareas artificiales, como preguntar "¿Estás seguro?" o para obtener un ajuste extremo en un dispositivo (como configurar el voltaje de una fuente de alimentación) se puede requerir que el usuario presione un botón "arriba" muchas veces, en vez de permitir que escriba un par de ceros adicionales.

{interactive slug="action-menu" type="in-page"}

## En resumen

Estas son solo algunas ideas extraídas de la IPO que te ayudarán a conocer los tipos de problemas que pueden presentar las interfaces. En el siguiente proyecto, puedes estudiar este tipo de problemas de primera mano observando a *otra persona* usar una interfaz, percatándote de cualquier problema que tengan. Es mucho más fácil observar a otra persona hacerlo que hacerlo uno mismo, en parte porque es difícil concentrarse en la interfaz y tomar notas al mismo tiempo y en parte porque es posible que ya conozcas la interfaz y hayas aprendido a superar algunas de sus funciones con menor usabilidad.

{panel type="project"}

# Protocolo de pensamiento en voz alta

En un protocolo de pensamiento en voz alta, se observa a otra persona mientras usa la interfaz que se desea evaluar y se le anima a explicar lo que está pensando en cada paso. Se toman notas de lo que dice, sobre las que se puede reflexionar posteriormente para evaluar la interfaz (si es posible, puede ser útil grabar la sesión).

Este protocolo proporciona información sobre lo que podría resultar confuso en una interfaz y por qué.

Por ejemplo, si alguien que está configurando un despertador dice "Estoy apretando el botón hacia arriba hasta llegar a las 7:00, ay, vaya, se ha parado en las 7:09, ahora tengo que volver a dar toda la vuelta", esto nos da una idea de cómo puede interferir la interfaz en el proceso, no permitiendo que el usuario complete la tarea de manera eficiente.

Este enfoque se centra en observar a un usuario mientras realiza una *tarea* concreta, para capturar lo que sucede en realidad cuando la gente usa una interfaz. Las *tareas* a menudo se confunden con las *funciones*; las funciones de un dispositivo se usan para realizar una tarea. Por ejemplo, una cámara puede tener una función para hacer varias fotos rápidamente, pero es más probable que una tarea relevante sea "haz una foto de un evento de acción, elige la mejor foto y compártela". Esto podría suponer la realización de una serie de acciones por parte del usuario: acceder al modo multifoto, configurar la cámara para las condiciones de iluminación, hacer las fotos, elegir la mejor, conectarse a un ordenador, transferir la foto a un sitio web y compartirla con amigos.

El proyecto será más interesante si tu ayudante no está completamente familiarizado con el sistema o si es un sistema que la gente a menudo encuentra confuso o frustrante. Tu documento podría usarse para tomar decisiones sobre la mejora del sistema en el futuro.

La tarea podría ser algo como poner un reloj en hora, buscar un número marcado recientemente en un teléfono desconocido o elegir un programa para grabar en la tele.

Para realizar la evaluación, debes entregarle el dispositivo a tu ayudante, explicarle la tarea y pedirle que te explique lo que está pensando en cada paso. Es posible que tu ayudante no esté acostumbrado a hacer eso, así que puedes incitarle a que responda preguntas sobre la marcha como:

- ¿Qué vas a hacer ahora? ¿Por qué?
- ¿Por qué has elegido ese botón?
- ¿Qué estás buscando?
- ¿Te está costando? ¿Qué ocurre?
- ¿Puedes ver qué ha salido mal?
- ¿Cómo te sientes al respecto?

Si ves que controla el proceso del "pensamiento en voz alta", quédate callado y anota lo que diga.

¡Es muy importante no criticar o intimidar al ayudante! Si comete un error, intenta averiguar de qué forma la interfaz lo llevó a equivocarse, en vez de echarle la culpa. ¡Cualquier error que cometa será muy valioso para tu proyecto! Si lo hace todo bien, no será muy interesante.

Una vez que hayas anotado lo que ha sucedido, repásalo y busca explicaciones para los puntos en los que el usuario tuvo dificultades. Los ejemplos que hemos visto anteriormente en el capítulo te ayudarán a entender mejor la frustración que las interfaces pueden causar en el usuario y te ayudarán también a encontrar formas de mejorarlas.

Hay algo [más de información sobre los protocolos de pensamiento en voz alta en Wikipedia](https://en.wikipedia.org/wiki/Think_aloud_protocol), en el [sitio web de Nielsen](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/)y en [unos apuntes elaborados por alumnos de IPO](http://www.psy.gla.ac.uk/~steve/HCI/cscln/trail1/Lecture5.html).

{panel end}

{panel type="project"}

# Recorrido cognitivo

Otra forma de evaluar una interfaz es el "recorrido cognitivo". Esto normalmente se lleva a cabo sin involucrar a otra persona, aunque aquí la descripción se ha adaptado para involucrar a otro usuario y que así resulte más sencillo si no se tiene experiencia en evaluación de IPO. El *recorrido cognitivo* es una técnica usada por los expertos en IPO para realizar una evaluación rápida de una interfaz. Es especialmente útil para evaluar interfaces con pocos pasos, que están siendo usadas por usuarios nuevos u ocasionales (como alguien que usa la máquina del parking en un aeropuerto, o que configura el despertador en una habitación de hotel o alguien que usa una pantalla informativa en un museo).

El primer paso es elegir una tarea típica que alguien pueda realizar con la interfaz que está siendo evaluada (como sacar un ticket para 2 horas, poner la alarma para las 05:20 o averiguar dónde se encuentra una exposición concreta en un museo).

El objetivo del recorrido cognitivo es identificar si el usuario puede ver lo que tiene que hacer en cada paso y sobre todo notar si hay algo que sea confuso o ambiguo (como qué botón presionar a continuación) y averiguar si están seguros de que ha pasado lo que tenía que pasar.

Un evaluador de IPO experimentado haría esto por su cuenta, imaginando lo que el usuario haría a cada paso, pero puede que a ti te resulte más sencillo hacerlo mientras otra persona usa la interfaz, ya que eso te permite ver la interfaz a través de los ojos de otro usuario. Así que te recomendamos que le pidas a un amigo que realice una tarea para ti.

No es necesario que la tarea tenga más de 3 o 4 pasos (por ejemplo, presionar un botón), ya que harás tres preguntas en cada paso y tomarás nota de las respuestas, así que puede llevar un tiempo. Tú deberías saber cómo realizar la tarea por ti mismo, ya que nos centraremos en los pocos pasos necesarios para llevar a cabo la tarea; si el usuario se despista, puedes volver a marcarle el rumbo en vez de observar cómo intenta recuperarse de un problema de IPO que no debería haber ocurrido en primer lugar. La tarea puede ser algo como grabar un vídeo de 10 segundos en un teléfono móvil, borrar un mensaje de texto o programar un microondas para recalentar comida durante 45 segundos.

Presenta la interfaz a tu ayudante sin darle instrucciones sobre su uso y dile cuál es el objetivo de la tarea. Antes de que realice ninguna acción, pregunta: "*¿Sabes lo que tienes que hacer en este paso?*" Luego, pídele que mire la interfaz y pregunta: "*¿Puedes ver cómo hacerlo?*" Después, pídele que realice la acción que sugirió y pregunta: "*¿Eres capaz de decir si hiciste lo que tenías que hacer?*"

Si sus decisiones se desvían del rumbo, puedes reiniciar la interfaz y empezar de cero, explicando lo que hay que hacer en el paso en el que se desvió si fuera necesario (pero anotando que esto no era obvio para el ayudante, ya que es algo a tener en cuenta a la hora de mejorar la interfaz).

Una vez que se haya completado la primera acción, repite esto mismo con la siguiente acción necesaria (puede ser presionar un botón o ajustar un control). Una vez más, haz las tres preguntas que hemos visto anteriormente en el proceso.

En la práctica, la segunda pregunta (¿Puedes ver cómo hacerlo?) normalmente se divide en dos: ¿han visto el control? y si lo han visto, ¿se han dado cuenta de que es el que hay que usar? Para este ejercicio lo simplificaremos a una sola pregunta.

[Puedes encontrar más información sobre cómo realizar un recorrido cognitivo en el sitio web cs4fn](http://www.cs4fn.org/usability/cogwalkthrough.php).

También hay más información en la [entrada de Wikipedia para Recorrido cognitivo](https://en.wikipedia.org/wiki/Cognitive_walkthrough).

{panel end}