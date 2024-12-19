# Task Manager

This is the frontend for the **Task Manager** application built using **Ember.js**. It works with a **Node.js** server to handle CRUD operations for tasks and users. Users can manage tasks, assign users to them, and view an audit trail of CRUD events. The interface is styled with a green and white theme.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment Instructions](#deployment-instructions)
- [Frontend Repository](#frontend-repository)
- [Server Repository](#server-repository)
- [Audit Logs](#audit-logs)
- [How to Contribute](#how-to-contribute)

---

## Introduction

This frontend application allows users to interact with tasks and users in a task management system. You can create, view, edit, and delete both tasks and users. The frontend communicates with the backend server to manage these entities and provides an audit log of CRUD operations.



---

## Features

- **Task Management**:
  - Create, view, edit, and delete tasks
  - Assign users to tasks
  - View task details including title, description, priority, status, creation date, and due date

- **User Management**:
  - Create, view, edit, and delete users
  - Users can be assigned to tasks

- **Audit Logs**:
  - View CRUD events related to tasks and users
  
---

## Technologies Used

- **Frontend**: Ember.js
- **Backend**: Node.js (CRUD operations are handled here)
- **Styling**: Custom styles with green (`rgb(131, 197, 132)`) and white theme
- **Version Control**: GitHub for code repository management

---

## Deployment Instructions

To deploy this project locally from GitHub, follow these steps:

1. **Clone the repository**:
   Open your terminal and clone this repository to your local machine:
   ```bash
   git clone https://github.com/Mr-Smyth/task-manager.git
   cd task-manager

2. Install Dependencies: Make sure you have Node.js and Ember CLI installed. If not, you can install Ember CLI globally:

    ```bash
    npm install -g ember-cli
    ```

3. Install project dependencies:

    ```bash
    npm install
    ```

3. Start the Development Server: After the dependencies are installed, run the Ember development server:

    ```bash
    ember serve
    ```
This will start the frontend at http://localhost:4200.

Connect with the Backend: Make sure the Node.js backend server is running as well. You can find the backend repo [here](https://github.com/Mr-Smyth/task-manager-server). Follow the instructions there to start the server.

---

## Frontend Repository
The frontend for this project is hosted at:
https://github.com/Mr-Smyth/task-manager

---

## Server Repository
The backend (Node.js) for this project is hosted at:
https://github.com/Mr-Smyth/task-manager-server


---


## Audit Logs
The audit log allows you to track CRUD events related to tasks and users. It provides details on when entities were created, updated, or deleted, giving you an insight into the application's changes over time.

- Event Types:
    ```
    Create (completed)
    Update (to be added)
    Delete (to be added)
    ```
- Entities:
    ```
    Task
    User
    ```

- Example:
    ```
    Event Type	Entity	Description	Timestamp
    Create	Task	Created Task (details included)	2024-12-10 12:00:00
    Create	User	Created Task (details included)	2024-12-10 12:00:00
    ```

---

## How to Contribute
I welcome contributions to the Task Manager project! If you want to contribute, follow these steps:

- Fork this repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes.
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Create a pull request.
- Please make sure to follow the existing coding style and write tests for any new features you add.



[Back](#top)