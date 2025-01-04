# The Fruity Game  
### by Diego Monfort  

---

## Backend Installation

Follow these steps to install and set up the backend. **Note:** It is highly recommended to use a virtual environment to avoid dependency conflicts. (Version i used is python 3.11.9)

### 1. Install Python  
If Python is not installed on your system, download and install it from [python.org](https://www.python.org/).

### 2. Verify the Installation  
Open a terminal or command prompt and run the following commands to ensure Python and pip are correctly installed:  
```bash
py --version
py -m pip --version
```
### 3. Create Virtual Enviorment
```bash
py -m venv env
```
To activate on windows use 
```bash
.\env\Scripts\activate
```

### 4. Install dependencies
After activating Virtual Enviorment, install the requiered libraries.

## 1. Fast Api & Uvicorn
```bash
pip install fastapi uvicorn
```
## 2. Flask
```bash
pip install flask
```
## 3. PostgreSQL library
```bash
pip install psycopg2-binary
```
