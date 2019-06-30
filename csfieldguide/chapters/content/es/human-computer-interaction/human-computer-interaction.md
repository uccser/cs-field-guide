# Interacción persona ordenador

{panel type="teacher-note"}

# El ámbito de las interfaces de usuario

El material en este capítulo se refiere a "dispositivos digitales". Mientras que indudablemente se aplica a los ordenadores convencionales, también se aplica a todo tipo de aparatos, como despertadores, unidades de aire acondicionado, microondas, cronómetros, instrumentos electrónicos, unidades de puntos de venta, parquímetros y alarmas antirrobo. De hecho, la mayoría de los ejercicios de los alumnos resultan más sencillos si se realizan con dispositivos con pocas funciones, porque esto permite tener en cuenta todas las posibles tareas y secuencias. La evaluación de cosas como "Microsoft Windows" o "iPads" abarca un ámbito demasiado amplio, ya que hay muchos subsistemas, cada uno de los cuales por separado sería un buen proyecto (cómo funcionan los menús, cómo encontrar archivos, cómo abrir un programa, ¡tal vez incluso cómo encenderlo!)

{panel end}

La gente se frustra a menudo con los ordenadores y otros dispositivos digitales. Al usar estos dispositivos, es probable que en algún momento acabemos enfadados porque el sistema hizo algo que no queríamos que hiciera o no somos capaces de averiguar cómo conseguir que el ordenador haga lo que queremos, pero ¿por qué pasa esto? Las personas crearon los ordenadores, entonces ¿por qué nos frustramos tanto al usarlos?

Cada década, los ordenadores se vuelven cientos de veces más potentes, sin embargo, hay un componente importante de los sistemas informáticos cuyo rendimiento no ha cambiado de manera significativa desde que se desarrollaron los primeros ordenadores en la década de 1940: el componente humano. Para que un sistema informático funcione realmente bien, lo tiene que diseñar gente que entienda bien la parte humana del sistema.

En este capítulo analizaremos los aspectos que normalmente hacen que una interfaz sea buena o mala. Se trata de hacerte susceptible a los problemas principales para que puedas criticar interfaces existentes y empieces a pensar en cómo podrías diseñar buenas interfaces.

A menudo, los desarrolladores de software crean un programa o un sistema informático para un dispositivo que requiere que el usuario dedique un tiempo a aprender a usarlo. Puede que la interfaz sea fácil de usar para el desarrollador, ya que este conoce muy bien el sistema, pero un usuario solo quiere realizar sus tareas sin pasar demasiado tiempo aprendiendo el programa (y puede que se pasen a otro programa si este les resulta demasiado difícil). Puede que un desarrollador piense en el programa y en el usuario por separado, pero el usuario forma parte del sistema y el desarrollador tiene que crear el programa con el usuario en mente, para así diseñar un programa que le resulte fácil de usar e intuitivo.

La interacción persona ordenador (IPO) intenta que los programas sean útiles, utilizables y accesibles para las personas. Va más allá de elegir los diseños, los colores y las fuentes para una interfaz. Se trata de un campo fuertemente influenciado por la psicología de la interacción de las personas con los dispositivos digitales, lo que supone comprender muchos problemas relacionados con el comportamiento de las personas, con cómo perciben y entienden las cosas para que sientan que un sistema trabaja para ayudarlos y no para perjudicarlos. Si entienden la IPO, es más probable que los desarrolladores creen programas eficaces y populares. Si preguntas a diferentes usuarios si alguna vez se han sentido frustrados al usar un sistema informático, verás bastante claro que la IPO no siempre se usa bien.

Prueba la siguiente tarea interactiva y pide a algún amigo que la pruebe también:

{interactive slug="deceiver" type="in-page"}

¿Alguien ha contestado mal a la pregunta a pesar de que creía haber acertado? Puede que te hayas dado cuenta de que los botones "Par" e "Impar" a veces intercambian sus lugares. La inconsistencia casi siempre es algo malo en las interfaces, ya que puede engañar al usuario fácilmente y hacer que cometa un error.

La única situación en la que podría ser conveniente es si está hecho a propósito para hacer un juego de ordenador más interesante (el material interactivo anterior podría serlo). Pero imagina que tienes un formulario web en el que los botones "reiniciar" y "enviar" a menudo intercambian sus lugares. Con frecuencia los usuarios borrarían el formulario cuando lo que querían era enviarlo o enviarían el formulario cuando querían borrarlo.

{panel type="teacher-note"}

# Precisión frente a velocidad en el material interactivo anterior

Puede que la actividad interactiva que cambia los botones par/impar no engañe a todos los alumnos, pero para algunos resultará muy frustrante. Si deciden realizar la actividad despacio y con cuidado, es probable que acierten con las opciones par/impar, pero tendrán puntuaciones más bajas (tendrían una productividad más baja si se tratara de una interfaz real).

{panel end}

El estudio de la Interacción persona ordenador integra muchos elementos de la psicología (el comportamiento de las personas) ya que esto afecta a la forma en la que usarán un sistema. Un ejemplo sencillo, la memoria a corto plazo humana solo dura unos segundos (¡incluso en gente joven!) Si un dispositivo tarda en responder más de 10 segundos, el usuario debe realizar un esfuerzo consciente para recordar lo que estaba haciendo y eso supone trabajo adicional para el usuario (desde su punto de vista esto hace que el sistema resulte pesado de usar). Otro ejemplo, la gente se queda "atrapada" en secuencias: si vas en bici por una ruta que haces todos los días, pronto llegarás a tu destino sin haber pensado en los giros y desvíos del camino. Esto está genial a menos que tengas que parar en otro sitio de camino o si te has cambiado de casa o de trabajo hace poco. Ocurre un efecto similar con los diálogos de confirmación; puede que a menudo cierres accidentalmente archivos sin guardar y el sistema dice "¿Deseas guardarlo?", así que pulsas "Sí". Después de hacer esto unas cuantas veces, quedas atrapado en esa secuencia, por lo que en las contadas ocasiones en que no deseas sobrescribir tu archivo anterior, es probable que sin querer hagas clic en "Sí" igualmente.

{panel type="curiosity"}

# Errores de captura

El *error de captura* se da cuando nos acostumbramos a una ruta o un procedimiento habitual y como resultado nos olvidamos de otra cosa que teníamos que hacer ese día. Es fácil de recordar, porque tu secuencia habitual te "captura". La captura es algo bueno la mayor parte del tiempo, ya que así no tenemos que pensar mucho en las acciones cotidianas (lo que puede resultar más agotador), pero también nos puede confundir y provocar que hagamos algo que no queríamos hacer. Un buen diseñador de interfaces es consciente de esto y evita configurar la interfaz de forma que los usuarios se puedan ver capturados y hagan algo que no puedan deshacer.

{panel end}

Mucha gente se culpa a sí misma por estos errores, pero la psicología básica nos dice que se trata de un error natural y un buen sistema debería proteger a los usuarios de tales errores (por ejemplo, permitiendo que los deshagan).

{comment Se pueden analizar las funciones de un botón como ejemplo de precisión en los detalles (arrastrar mientras se presiona, etc.); se puede añadir una actividad interactiva con una casilla simple (normal) y un botón (y quizá un menú) aquí para que el lector pueda experimentar con lo que sucede (por ej. hacer clic pero deslizando antes de soltar)}

El diseño de buenas interfaces es *muy* difícil. Justo cuando crees que tienes una idea inteligente, descubres que hay un grupo de gente que no consigue averiguar cómo usarla o ves que falla en alguna situación. O lo que es peor, algunos desarrolladores piensan que sus usuarios son tontos y que todos los problemas con la interfaz son culpa del usuario y no del desarrollador. Pero el problema real es que el desarrollador conoce muy bien el sistema, mientras que el usuario solo quiere realizar sus tareas sin tener que pasar mucho tiempo aprendiendo a usar el programa. Si es muy difícil de usar y hay otras alternativas, el usuario buscará algo que le resulte más sencillo. ¡Las buenas interfaces valen mucho en el mercado!

Hay muchas formas de evaluar y ajustar las interfaces y en este capítulo veremos algunas de ellas. Un principio importante es que una de las peores personas para evaluar una interfaz es la persona que la diseñó y la programó. Conoce todos los detalles sobre su funcionamiento, probablemente lleve semanas pensando en ella, sabe qué cosas no hay que tocar y qué opciones no se deben seleccionar y, obviamente, le interesa más identificar lo *bueno* de la interfaz que lo *malo*. También es importante que la interfaz la evalúe alguien con las mismas características que el usuario medio; si pones a un niño de 12 años a evaluar un sistema de planes de jubilación, es probable que no sepa lo que le interesa al usuario; y si pides a un profesor que pruebe un sistema destinado a los alumnos, es probable que sepa las respuestas y cuál es el proceso correcto.

A menudo, para evaluar una interfaz se pide a un grupo de usuarios medios que la prueben, anotando minuciosamente cualquier problema que surja. Hay empresas que se dedican exclusivamente a realizar este tipo de pruebas de usuario, les entregan el prototipo de un producto y ellos pagan a grupos de personas para que lo prueben. Después, se genera un informe sobre el producto y se entrega a la gente que está trabajando en él. Se trata de un proceso costoso, pero hace que el producto sea mucho mejor y puede darle una gran ventaja sobre sus competidores. Al encargar la evaluación de la interfaz a una empresa independiente, evitamos cualquier influencia de los empleados de nuestra propia empresa que desean demostrar (incluso de forma inconsciente) que han hecho un buen trabajo al diseñarla, en vez de identificar los problemas persistentes que tanto molestarán a los usuarios.

Antes de ver diferentes maneras de evaluar interfaces, tenemos que examinar lo que ocurre con una interfaz.
