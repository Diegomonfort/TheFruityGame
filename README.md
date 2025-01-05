# The Fruity Game  
### by Diego Monfort  

---

## Backend Installation

Follow these steps to install and set up the backend. **Note:** It is highly recommended to use a virtual environment to avoid dependency conflicts. (Version i used is python 3.11.9)

## 1. Install Python  
If Python is not installed on your system, download and install it from [python.org](https://www.python.org/).

## 2. Verify the Installation  
Open a terminal or command prompt and run the following commands to ensure Python and pip are correctly installed:  
```bash
py --version
py -m pip --version
```
## 3. Create Virtual Enviorment
```bash
py -m venv env
```
To activate on windows use 
```bash
.\env\Scripts\activate
```

## 4. Install dependencies
After activating Virtual Enviorment, install the requiered libraries.

```bash
pip install -r requirements.txt
```

## 5. Start server

```bash
py app.py 
```



## Frontend Installation

Follow these steps to install and set up the frontend.

## 1. Install Node.js and npm
Make sure that **Node.js** and **npm** are installed. If they are not, you can download and install them from [nodejs.org](https://nodejs.org/).

To verify installation, run the following commands:
```bash
node --version
npm --version
```

## 2. Navigate to the Frontend Directory
```bash
cd frontend/the-fruity-game
```

## 3. Install Dependencies
```bash
npm install
```

## 4. Run the Frontend
To start the development server, run:
```bash
npm run dev
```


