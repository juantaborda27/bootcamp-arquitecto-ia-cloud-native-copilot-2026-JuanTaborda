import SwiftUI

struct UsersView: View {
    @StateObject private var viewModel = UsersViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading { ProgressView() }
                else if let error = viewModel.errorMessage { Text("Error: \(error)") }
                else {
                    List(viewModel.users) { user in
                        NavigationLink(destination: UserDetailView(user: user)) {
                            VStack(alignment: .leading) {
                                Text(user.name).font(.headline)
                                Text(user.email).font(.subheadline)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Usuarios")
            .task { await viewModel.loadUsers() }
        }
    }
}

struct UserDetailView: View {
    let user: User

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(user.name).font(.title)
            Text(user.email)
            Text(user.isActive ? "ACTIVE" : "INACTIVE")
        }
        .padding()
        .navigationTitle("Detalle")
    }
}
