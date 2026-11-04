import Foundation

class ApiService {
    private let baseURL = "http://localhost:5000"

    func getUsers() async throws -> [User] {
        let url = URL(string: "\(baseURL)/api/users")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([User].self, from: data)
    }

    func getUserById(_ id: Int) async throws -> User {
        let url = URL(string: "\(baseURL)/api/users/\(id)")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode(User.self, from: data)
    }
}
