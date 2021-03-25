<p align="center">
  <h2 align="center">Design & Implementation of Web Systems</h2>
  <h3 align="center">Task List #3</h3>
  <p align="center">
    <a href="./README.md"><strong>README.md</strong></a>
    ·
    <a href="./Tasklist3.pdf">Tasklist3.pdf</a>
    ·
    <a href="https://luzkan.github.io/DesignAndImplementationOfWebSystems/Tasklist3/index.html">Website</a>
  </p>
</p>

<details open>
  <summary>Tasks & Summary</summary>
  <ol>
    <li>
      <a href="#task-1">Task #1</a>
      <i>(Create Reverse Proxy)</i>
      <ul>
        <li>Create in/out interfaces that take request and depending of the method of the request -> sends them further to one of three systems.</li>
        <li>Because the systems are inexistent - create mock answers.</li>
        <li>Make use of <i>application.properties</i> for configurations.</li>
      </ul>
    </li>
    <li>
      <a href="#task-2">Task #2</a>
      <i>(Automatic Tests)</i>
      <ul>
        <li>For each type of request create at least one automatic test.</li>
        <li>Additionally created tests for MockDataSource & Boot Test.</li>
      </ul>
    </li>
    <li>
      <a href="#task-3">Task #3</a>
      <i>(Exceptions Handling)</i>
      <ul>
        <li>Reverse Proxy does not interpret the exceptions that could happen when communicating with external systems. These errors should be passed further.</li>
        <li>Should make use of <i>ControllerAdvice</i>.</li>
      </ul>
    </li>
    <li>
    <a href="#task-4">Task #4</a>
      <i>(Integration Tests)</i>
      <ul>
        <li>For each request there should be at least two integrations tests (one <i>happy path</i> and one negative one).</li>
        <li>Should make use of <i>Postman</i>.</li>
      </ul>
    </li>
        <li>
    <a href="#task-5">Task #5</a>
      <i>(CircleCI)</i>
      <ul>
        <li>Integrate Repository with CircleCI and make sure that the application is building and tests are passing.</li>
        <li>Repository status should be <i>Green</i>.</li>
      </ul>
    </li>
  </ol>
</details>

---

## Task #1
<details>
  <summary>Create Reverse Proxy.</summary>

---

### Initializing new project with Spring Initializer
##### Checking Maven & Spring Web Dependency (with Kotlin Language). Java 11 which will be also used later in Task #5 in CircleCI.
<img src="./img/task1_spring_initializer.png" alt="Task1 - Spring Initializer" width="625"/>

### Structuring the project
##### Obviously we need a `Controller` class for our Proxy. `Datasource` that could be expanded on further with split between mock and network/systems. So does `model` have it's own directory and service that handles requests and passes them further. Exception Handler has it's own directory as it was suggested in the task.
<img src="./img/task1_project_structure.png" alt="Task1 - Project Structure" width="625"/>

### ProxyController
##### Implements global `get` to retrieve everything, specific `get` to get item by id, `post` & `put`.
<img src="./img/task1_proxy_methods.png" alt="Task1 - ProxyController" width="625"/>

### Foo (Model)
##### The Model itself already uses `JsonProperties` for extendability and usage - it is the main and most used type of data transferred over HTTP Requests.
<img src="./img/task1_model_foo.png" alt="Task1 - Foo (Model)" width="625"/>

### Foo (DataSource & DTO)
##### The interface for Foo (`get` [all], `get` [one], `post` [one], `put` [one])
<img src="./img/task1_foo_datasource.png" alt="Task1 - Foo (Model)" width="625"/>

### SystemDataSource
##### Class which will create expected calls to given systems. It's a `TODO` work as they are not implemented. On the picture - some placeholder functions that need to be finished & values gathered from `application.properties`.
<img src="./img/task1_systems.png" alt="Task1 - Foo (Model)" width="625"/>

### MockFooDataSource
##### Class used to test the implementation of '_everything yet_'. A bit of mocked values for previously created random Foo object and implementation of mocked functionalities.
<img src="./img/task1_mocked.png" alt="Task1 - Foo (Model)" width="625"/>

</details>

## Task #2
<details>
  <summary>Automatic Tests.</summary>

---

### Test Proxy Class
##### Using [MockMVC](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/web/servlet/MockMvc.html). By the way - base url is `/api/v1` as that's the convention for any REST api's (we can simply flip version number in case of updates, so we can still easily support older versions).
<img src="./img/task2_test_proxy.png" alt="Task2 - ProxyTest Class" width="625"/>

##### Testing `GET` [all]
<img src="./img/task2_get_global.png" alt="Task2 - GET [All]" width="625"/>

##### Testing `GET` [one]
<img src="./img/task2_get_one.png" alt="Task2 - GET [One]" width="625"/>

##### Testing `POST` [one]
<img src="./img/task2_post_one.png" alt="Task2 - GET [One]" width="625"/>

##### Testing `PUT` [one]
<img src="./img/task2_put_one.png" alt="Task2 - PUT [One]" width="625"/>

### Tests Results
<img src="./img/task2_tests_ran.png" alt="Task2 - ProxyController Tests Results" width="625"/>

### Additional Tests for the Mocked DataSource
<img src="./img/task2_mock_tests.png" alt="Task2 - MockedDataSource Tests & Results" width="625"/>

### Boot Test
<img src="./img/task2_boot_test.png" alt="Task2 - Boot Test & Results" width="625"/>

</details>


## Task #3
<details>
  <summary>Exceptions Handling.</summary>

---

### Exceptions Handling
##### ExceptionHandler class & ControllerAdvice w/ some few custom messages. Could use `e.message` as well for the body.
<img src="./img/task3_controlleradvice.png" alt="Task3 - Controller Advice (Exception Handler)" width="625"/>

</details>

## Task #4
<details>
  <summary>Integration Tests.</summary>

---

### Trying out Postman for the first time.
##### Executing the `GET` [All] on `/api/v1`
<img src="./img/task4_postman_get_test.png" alt="Task4 - Executed GET Request on /api/v1" width="625"/>

### Testing `GET`
##### Proper `GET` [One] Request
<img src="./img/task4_postman_get_test_good.png" alt="Task4 - Executed Proper GET One Request" width="625"/>

##### Failing `GET` [One] Request - Getting inexistent element
<img src="./img/task4_postman_get_test_bad.png" alt="Task4 - Executed Failing GET One Request" width="625"/>

### Testing `POST`
##### Proper `POST` Request
<img src="./img/task4_postman_post_test_good.png" alt="Task4 - Executed Proper POST Request" width="625"/>

##### Failing `POST` Request - Wrong key names *(could implement handler for that JSONParseException)*.
<img src="./img/task4_postman_post_test_bad.png" alt="Task4 - Executed Failing POST Request" width="625"/>

### Testing `PUT`
##### Proper `PUT` Request
<img src="./img/task4_postman_put_test_good.png" alt="Task4 - Executed Proper PUT Request" width="625"/>

##### Failing `PUT` Request - Path & ID mismatch.
<img src="./img/task4_postman_put_test_bad.png" alt="Task4 - Executed Failing PUT Request" width="625"/>


</details>

## Task #5
<details>
  <summary>CircleCI.</summary>

---

### Initializing Pipeline in CircleCI
##### Using Version `2.1` which allows for usage of orbs. Using maven orb `maven@1.1.1` and running `maven/test`.
<img src="./img/task5_initializing_pipeline.png" alt="Task5 - Initializing Pipeline" width="625"/>

##### All checks passed.
<img src="./img/task5_checks_passed.png" alt="Task5 - Checks passed." width="625"/>

##### Tests were detected and ran properly.
<img src="./img/task5_tests_ran.png" alt="Task5 - Tests ran." width="625"/>

##### Merging in CircleCI config to master branch.
<img src="./img/task5_circle_ci_merged.png" alt="Task5 - CircleCI Merged" width="625"/>

##### CircleCI is working properly.
<img src="./img/task5_all_pipelines.png" alt="Task5 - CircleCI Pipelines" width="625"/>

</details>