import Foundation

@MainActor
class UsersViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    private let service = ApiService()

    func loadUsers() async {
        isLoading = true
        do {
            users = try await service.getUsers()
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }
}
