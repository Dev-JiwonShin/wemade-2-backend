
# 프로젝트 실행 방법

이 프로젝트는 프론트엔드와 백엔드 코드로 구성되어 있으며, 두 부분 모두 실행해야 합니다. 아래 지침은 백엔드 코드를 실행하는 방법에 대한 것입니다. 서버를 실행하면 자동으로 100명의 가상 사용자가 생성됩니다. 프론트엔드 코드는 이 사용자들에 대해 CRUD(생성, 읽기, 업데이트, 삭제) 작업을 진행하게 됩니다.

**중요**: 이 프로젝트를 실행하기 전에 Node.js가 시스템에 설치되어 있지 않다면, [Node.js 공식 웹사이트](https://nodejs.org/)에서 설치해야 합니다.


## 백엔드 실행하기

1. 프로젝트의 백엔드 디렉토리로 이동합니다.
2. 필요한 npm 패키지를 설치하기 위해 터미널에 다음 명령어를 입력합니다:

```npm install```

3. 패키지 설치가 완료되면, 서버를 시작하기 위해 다음 명령어를 실행합니다:

```node server.js```

이 명령어는 개발 모드에서 백엔드 서버를 시작합니다. 서버가 시작되면, 100명의 가상 사용자 데이터가 자동으로 생성되고, 프론트엔드에서 이 데이터에 접근하여 CRUD 작업을 할 수 있습니다.

## 프론트엔드 실행하기

프론트엔드 코드를 실행하는 방법에 대한 지침은 프론트엔드 코드의 README 파일을 참조하세요.


# How to Run the Project

This project consists of both frontend and backend code, and both parts need to be run. The following instructions are for running the backend code. When the server is started, 100 virtual users are automatically created. The frontend code will perform CRUD (Create, Read, Update, Delete) operations on these users.

## Running the Backend

1. Navigate to the backend directory of the project.
2. To install the necessary npm packages, enter the following command in the terminal:

```npm install```

3. Once the package installation is complete, run the following command to start the server:

```node server.js```

This command starts the backend server in development mode. Once the server is started, 100 virtual users' data is automatically created, and the frontend can access this data to perform CRUD operations.

## Running the Frontend

Refer to the README file in the frontend code for instructions on how to run the frontend code.

These README instructions provide a clear guide for setting up and starting both the backend and frontend parts of your project, ensuring that users understand how to get the entire application running.