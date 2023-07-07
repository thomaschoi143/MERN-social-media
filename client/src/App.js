import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
	const mode = useSelector((state) => state.user.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const isAuth = Boolean(useSelector((state) => state.user.userInfo));

	return (
		<div className="App">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route
							path="/"
							element={isAuth ? <HomePage /> : <Navigate to="/login" />}
						/>
						<Route
							path="/login"
							element={isAuth ? <Navigate to="/" /> : <LoginPage />}
						/>

						<Route
							path="/profile/:userId"
							element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
						/>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
