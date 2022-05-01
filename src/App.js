import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from "./components/dashboard.jsx";

const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand',
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                </header>
                <Dashboard></Dashboard>
            </div>
        </ThemeProvider>
    );
}

export default App;
