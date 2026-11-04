package com.bootcamp.app.ui.users

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.bootcamp.app.data.model.User

@Composable
fun UsersScreen(viewModel: UsersViewModel, onUserClick: (Int) -> Unit) {
    val state by viewModel.state.collectAsState()
    when (val current = state) {
        is UsersViewModel.UiState.Loading ->
            CircularProgressIndicator(modifier = Modifier.fillMaxSize().wrapContentSize())
        is UsersViewModel.UiState.Error -> Text("Error: ${current.message}")
        is UsersViewModel.UiState.Success -> LazyColumn {
            items(current.users) { user ->
                UserCard(user = user, onClick = { onUserClick(user.id) })
            }
        }
    }
}

@Composable
fun UserCard(user: User, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().padding(8.dp).clickable(onClick = onClick)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(user.name, style = MaterialTheme.typography.titleMedium)
            Text(user.email, style = MaterialTheme.typography.bodyMedium)
        }
    }
}
