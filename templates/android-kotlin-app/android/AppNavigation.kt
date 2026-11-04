package com.bootcamp.app.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.bootcamp.app.ui.users.UsersScreen
import com.bootcamp.app.ui.users.UsersViewModel

@Composable
fun AppNavigation(viewModel: UsersViewModel) {
    val navController = rememberNavController()
    NavHost(navController, startDestination = "users") {
        composable("users") {
            UsersScreen(viewModel = viewModel, onUserClick = { id -> navController.navigate("users/$id") })
        }
        composable("users/{id}") { backStack ->
            val id = backStack.arguments?.getString("id") ?: return@composable
            androidx.compose.material3.Text("Detalle usuario $id")
        }
    }
}
