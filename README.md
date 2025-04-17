# ⚙️ Configuración del entorno

1. Clona el repositorio o haz un fork
2. Escribe por terminal el comando `make`. Este comando instalará todo lo necesario para arrancar la aplicación.
3. La api está disponible en la url http://localhost:3000
4. Si quieres parar la aplicación, puedes usar el comando `make stop`.
5. Si quieres arrancar la aplicación, puedes usar el comando `make start`.
6. Para ejecutar los tests unitarios `make test`.
7. Este comando ejecutará los tests e2e `make test-e2e`.
8. Para ejecutar toda la suite de tets, puedes usar el comando `make test-all`.
9. Para cualquier duda consulta la ayuda de `make` con el comando `make help`.

# 📧 API
Dentro de la raiz del proyecto hay un archivo **Nests.postman_collection.json**. Este archivo contiene la colección de postman para probar la API.

# 🌳 Estructura

## src

Aquí está contenido todo el código de la aplicación. La estructura es la siguiente:

```
.
├── Shared
│   ├── Domain
│   │   ├── Buses
│   │   │   ├── EventBus.ts
│   │   │   └── EventHandler.ts
│   │   ├── Emails
│   │   │   └── EmailSender.ts
│   │   ├── Entities
│   │   │   └── BaseEntity.ts
│   │   ├── Events
│   │   │   └── DomainEvent.ts
│   │   ├── Providers
│   │   ├── Utils
│   │   └── ValueObjects
│   │       ├── Email.ts
│   │       └── Uuid.ts
│   └── Infrastructure
│       ├── Buses
│       │   └── InMemoryEventBus.ts
│       ├── Email
│       │   └── ConsoleEmailSender.ts
│       ├── Framework
│       │   ├── Config
│       │   │   ├── Emails
│       │   │   │   └── EmailSenderModule.ts
│       │   │   └── Events
│       │   │       └── EventHandlersModule.ts
│       │   └── Controllers
│       │       ├── Config
│       │       │   └── app.module.ts
│       │       ├── app.controller.ts
│       │       └── app.service.ts
│       └── Persistence
│           └── Repositories
├── Users
│   ├── Application
│   │   ├── Commands
│   │   │   └── CreateUser
│   │   │       ├── CreateUserCommand.ts
│   │   │       └── CreateUserHandler.ts
│   │   ├── Events
│   │   │   └── UserCreated
│   │   │       └── SendMailUserCreatedWelcomeHandler.ts
│   │   └── Queries
│   ├── Domain
│   │   ├── DataSources
│   │   ├── Entities
│   │   │   └── User.ts
│   │   ├── Events
│   │   │   └── UserCreated.ts
│   │   ├── Exceptions
│   │   │   └── UserEmailAlreadyExistsException.ts
│   │   ├── Repositories
│   │   │   └── UserRepository.ts
│   │   └── ValueObjects
│   │       ├── UserId.ts
│   │       └── UserName.ts
│   └── Infrastructure
│       ├── DataSources
│       ├── Framework
│       │   └── Controllers
│       │       └── Api
│       │           ├── CreateUser
│       │           │   ├── CreateUserController.ts
│       │           │   └── CreateUserDto.ts
│       │           └── UsersModule.ts
│       └── Persistence
│           └── Repositories
│               ├── InMemoryUserRepository.ts
│               └── PostgresUserRepository.ts
└── main.ts

```

### Shared 

Todo el código que es compartido entre los BC y/o módulos de la aplicación. 
Aquí se encuentran las interfaces y clases base que son utilizadas por los módulos de la aplicación.

* **Domain**: Aquí se encuentran las interfaces y clases base que van a ser compartidas por el resto de BC a nivel de dominio. Como peculiaridad, he creado en la carpeta de **Buses** dos interfaces solamente para enviar eventos. Uno de ellos es el bus de eventos y el otro es el handler de eventos o también llamado subscriptor.
  * Buses 
    * **EventBus**: Interfaz para el bus de eventos con solamente el método ``publish``
    * **EventHandler**: Interfaz para los handler de eventos.
  * Emails
    * **EmailSender**: Interfaz para el envío de emails.
  * Entities
    * **BaseEntity**: Clase base para las entidades. Dentro de está hay dos métodos. Uno para ``record`` para registrar los eventos y el otro ``pullDomainEvents`` para recogerlos.
  * Events
    * **DomainEvent**: Clase base para los eventos de dominio. Sinceramente me basado un poco (aplicando ligeros cambios), en el diseño que hace CodelyTV en su curso de DDD, porque me parece muy bueno y porque siendo honesto, no tengo tiempo para pensar en un diseño mejor dado mi poco nivel con Typescript.
* **Infrastructure**: Aquí se encuentran las implementaciones de las interfaces y clases base que van a ser compartidas por el resto de BC a nivel de infraestructura. He creado en la carpeta de **Buses** la implementación del bus de eventos en memoria. No he querido instalar ningún rabbitmq o broker, por falta de tiempo.

**Nota**: En la parte de buses, podría haber creado los buses para los comandos y queries, pero no lo he hecho por falta de tiempo. En el caso de que se necesiten, se podrían crear sin problemas. Y en el caso del bus de commandos, añadir la lógica para soportar middlewares.

### Users

Aquí se encuentra el BC de usuarios. Aquí iria contenido toda la lógica de usuarios de la aplicación.

* **Application**: Aquí se encuentran los servicios de aplicación o casos de uso. 
  * **Commands**: Aquí se encuentran los comandos de la aplicación. En este caso, he creado un comando para crear usuarios.
  * **Events**: Aquí se encuentran los eventos de la aplicación. En este caso, he creado un evento para enviar el email de bienvenida al usuario.
  * **Queries**: Está vacio, pero lo he dejado para que se vea la estructura y para dejar constancia de que las operaciones de lectura irían en este lugar.
* **Domain** : Aquí se encuentra la lógica de dominio. En este caso, he creado la entidad de usuario, el repositorio de usuario y el evento de usuario creado. 
  * **DataSources**: Está vacio, pero aquí irían todas las interfaces, cuya fuente de datos sea externa. Es de un patrón de diseño que aprendí de Google. Lo usaban para diferenciarse del patrón repository cuya fuente de datos es interna.
  * **Entities**: Aquí se encuentran las entidades. He creado la entidad de **user**. Con id, name y email.
    * Aquí me gustaría explicar una cosa. Normalmente, cuando se crea instancia de una entidad de dominio, se le pasa ya sea por constructor o por un constructor semántico los ValueObjects por argumentos si los tuviera. Yo en mi caso prefiero esconder o encapsular esos ValueObject dentro de la entidad de dominio, haciendo el constructor privado. Es decir no quiero exponerlos. En mi experiencia, así luego es más fácil de mantener el código si hay cambios.
  * **Events**: Aquí se encuentran los eventos. En este caso, he creado el evento de usuario creado **UserCreated**.
  * **Exceptions**: Solo contiene la excepcion **UserEmailAlreadyExists**.
  * **Repositories**: Aquí se encuentran los repositorios. **UserRepository** es la única interfaz.
  * **ValueObjects**: He considerado que por lo menos el id y email, tienen la suficiente entidad como va a encapsular cierta lógica dentro de ellos, por lo que ambos tienen un ValueObject. Para el caso del name, también he creado uno, porque he considerado controlar el límite de cacteres y he preferido que esa lógica estuviera dentro de un ValueObject, en vez del servicio de aplicación, que en mi opinión deben de ser lo más anémicos posibles.
*  **Infrastructure**: Aquí se encuentra la configuración de framework y todo lo relacionado a nivel infraestructura con el BC. 
  * **DataSources**: Está vacio, pero aquí irían todas las implementaciones de las interfaces de la carpeta de **DataSources** con fuentes de datos externas.
  * **Framework**: Aquí se encuentra el framework de la aplicación. En nuestro caso la parte de controllers y un **UsersModule** para inyectar servicios.
  * **Persistence**: Aquí se encuentran las implementaciones de los repositorios. He creado dos, uno en memoria y otro para postgres.

**Nota:** En la parte de **UsersModule**, para ser honesto desconozco si lo que hice es lo mejor o la mejor forma de hacerlo. Es mi primera vez con Nestjs, y me ha costado entender como funcionaba el contenedor de inyección de dependencias.

# 🧪 Testing

He intentado estructurar la pruebas en tests EndToEnd y Unitarios. Dada mi nula experiencia con Nestjs y Typescript, he decidido no implementar pruebas de integración.
He creado varios ObjectsMother para crear los objetos de prueba de:
* **CreateUserCommand**
* **User**
* **UserCreated**

**Nota:** Como no sabía como mockear una interfaz en typescript, he decidido crear una implementación mock de la interfaz que no hace nada. En este caso, es el MockEventBus y el MockUserRepository. A nivel interno no tienen mucha chicha, pero me han servido para testear el caso de uso como yo quería.
## 🌴 Estructura
```├── Units
│   ├── Shared
│   │   ├── Domain
│   │   │   └── ValueObjects
│   │   │       └── Email.spec.ts
│   │   └── Infrastructure
│   │       └── Buses
│   │           └── MockEventBus.ts
│   └── Users
│       ├── Application
│       │   └── Commands
│       │       └── CreateUser
│       │           ├── CreateUserCommandMother.ts
│       │           └── CreateUserHandler.spec.ts
│       ├── Domain
│       │   ├── Entities
│       │   │   └── UserMother.ts
│       │   ├── Events
│       │   │   └── UserCreatedMother.ts
│       │   └── ValueObjects
│       │       └── UserName.spec.ts
│       └── Infrastructure
│           ├── Framework
│           │   └── Controllers
│           │       └── Api
│           │           └── CreateUser
│           │               └── CreateUserController.spec.ts
│           └── Persistence
│               └── Repositories
│                   └── MockUserRepository.ts
├── e2e
│   └── Users
│       └── Infrastructure
│           └── Framework
│               └── Controllers
│                   └── Api
│                       └── CreateUser
│                           └── CreateUserController.e2e-spec.ts
└── jest-e2e.json
```

