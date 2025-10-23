import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Folder, FileCode, Info } from "lucide-react";
import Header from "./components/Header";

const SwiftUIArchitectureExplorer = () => {
  interface FileItem {
    name: string;
    type: 'file' | 'folder';
    path: string;
    children?: FileItem[];
  }

  type ExpandedFolders = {
    [key: string]: boolean;
  };

  type CodeFiles = {
    [key: string]: string;
  };

  // Xcode-style syntax highlighting function
  const highlightSwiftCode = (line: string): string => {
    let result = line;
    
    // Escape HTML
    result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Comments (green)
    result = result.replace(/(\/\/.*$)/g, '<span style="color: #6C8756">$1</span>');
    
    // Strings (red) - handle before keywords to avoid conflicts
    result = result.replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color: #D73A49">$1</span>');
    
    // Numbers (light blue)
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #9CDCFE">$1</span>');
    
    // Keywords (pink/magenta)
    const keywords = ['import', 'class', 'struct', 'enum', 'protocol', 'func', 'var', 'let', 
                     'if', 'else', 'guard', 'return', 'throws', 'throw', 'async', 'await', 
                     'init', 'private', 'public', 'static', 'final', 'case', 'switch', 
                     'for', 'while', 'do', 'try', 'catch', 'self', 'Self', 'nil', 'true', 
                     'false', 'in', 'as', 'is', 'extension', 'typealias', 'associatedtype',
                     '@MainActor', '@Published', '@StateObject', '@EnvironmentObject', 
                     '@ViewBuilder', '@escaping'];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      result = result.replace(regex, '<span style="color: #FF7AB2">$1</span>');
    });
    
    // Types and Classes (cyan/turquoise)
    const types = ['String', 'Int', 'Double', 'Bool', 'Void', 'URL', 'Data', 'Array', 
                   'Dictionary', 'Set', 'Optional', 'Result', 'Task', 'Error',
                   'Foundation', 'SwiftUI', 'Combine', 'URLSession', 'URLRequest',
                   'JSONEncoder', 'JSONDecoder', 'UserDefaults', 'HTTPURLResponse',
                   'Identifiable', 'Equatable', 'Codable', 'Decodable', 'Encodable',
                   'ObservableObject', 'View', 'NavigationStack', 'NavigationPath',
                   'VStack', 'HStack', 'List', 'Text', 'Button', 'Image', 'TextField',
                   'SecureField', 'ScrollView', 'AsyncImage', 'ProgressView', 'Divider',
                   'Spacer', 'Rectangle', 'Color', 'LinearGradient', 'WindowGroup',
                   'Scene'];
    
    types.forEach(type => {
      const regex = new RegExp(`\\b(${type})\\b`, 'g');
      result = result.replace(regex, '<span style="color: #67C5CE">$1</span>');
    });
    
    // Function calls (light yellow)
    result = result.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #DCDCAA">$1</span>(');
    
    // Properties and variables after dot notation (light blue)
    result = result.replace(/\.([a-zA-Z_][a-zA-Z0-9_]*)/g, '.<span style="color: #9CDCFE">$1</span>');
    
    // Default text color (light gray)
    if (!result.includes('<span')) {
      result = `<span style="color: #D4D4D4">${result}</span>`;
    }
    
    return result;
  };

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<ExpandedFolders>({
    'App': true,
    'Domain': true,
    'Domain/Entities': false,
    'Domain/UseCases': false,
    'Domain/RepositoryProtocols': false,
    'Data': false,
    'Data/DTOs': false,
    'Data/Repositories': false,
    'Data/DataSources': false,
    'Presentation': false,
    'Presentation/Features': false,
    'Core': false,
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const structure: FileItem[] = [
    {
      name: 'App',
      type: 'folder' as const,
      path: 'App',
      children: [
        { name: 'ProductCatalogApp.swift', type: 'file', path: 'App/ProductCatalogApp.swift' }
      ]
    },
    {
      name: 'Domain',
      type: 'folder',
      path: 'Domain',
      children: [
        {
          name: 'Entities',
          type: 'folder',
          path: 'Domain/Entities',
          children: [
            { name: 'Product.swift', type: 'file', path: 'Domain/Entities/Product.swift' },
            { name: 'User.swift', type: 'file', path: 'Domain/Entities/User.swift' }
          ]
        },
        {
          name: 'UseCases',
          type: 'folder',
          path: 'Domain/UseCases',
          children: [
            { name: 'FetchProductsUseCase.swift', type: 'file', path: 'Domain/UseCases/FetchProductsUseCase.swift' },
            { name: 'LoginUseCase.swift', type: 'file', path: 'Domain/UseCases/LoginUseCase.swift' }
          ]
        },
        {
          name: 'RepositoryProtocols',
          type: 'folder',
          path: 'Domain/RepositoryProtocols',
          children: [
            { name: 'ProductRepositoryProtocol.swift', type: 'file', path: 'Domain/RepositoryProtocols/ProductRepositoryProtocol.swift' },
            { name: 'UserRepositoryProtocol.swift', type: 'file', path: 'Domain/RepositoryProtocols/UserRepositoryProtocol.swift' }
          ]
        }
      ]
    },
    {
      name: 'Data',
      type: 'folder',
      path: 'Data',
      children: [
        {
          name: 'DTOs',
          type: 'folder',
          path: 'Data/DTOs',
          children: [
            { name: 'ProductDTO.swift', type: 'file', path: 'Data/DTOs/ProductDTO.swift' },
            { name: 'UserDTO.swift', type: 'file', path: 'Data/DTOs/UserDTO.swift' }
          ]
        },
        {
          name: 'Repositories',
          type: 'folder',
          path: 'Data/Repositories',
          children: [
            { name: 'ProductRepository.swift', type: 'file', path: 'Data/Repositories/ProductRepository.swift' },
            { name: 'UserRepository.swift', type: 'file', path: 'Data/Repositories/UserRepository.swift' }
          ]
        },
        {
          name: 'DataSources',
          type: 'folder',
          path: 'Data/DataSources',
          children: [
            { name: 'ProductRemoteDataSource.swift', type: 'file', path: 'Data/DataSources/ProductRemoteDataSource.swift' },
            { name: 'UserRemoteDataSource.swift', type: 'file', path: 'Data/DataSources/UserRemoteDataSource.swift' },
            { name: 'ProductLocalDataSource.swift', type: 'file', path: 'Data/DataSources/ProductLocalDataSource.swift' },
            { name: 'UserLocalDataSource.swift', type: 'file', path: 'Data/DataSources/UserLocalDataSource.swift' }
          ]
        }
      ]
    },
    {
      name: 'Core',
      type: 'folder',
      path: 'Core',
      children: [
        { name: 'APIClient.swift', type: 'file', path: 'Core/APIClient.swift' },
        { name: 'Endpoint.swift', type: 'file', path: 'Core/Endpoint.swift' },
        { name: 'AppError.swift', type: 'file', path: 'Core/AppError.swift' },
        { name: 'DIContainer.swift', type: 'file', path: 'Core/DIContainer.swift' }
      ]
    },
    {
      name: 'Presentation',
      type: 'folder',
      path: 'Presentation',
      children: [
        {
          name: 'Features',
          type: 'folder',
          path: 'Presentation/Features',
          children: [
            { name: 'LoginView.swift', type: 'file', path: 'Presentation/Features/LoginView.swift' },
            { name: 'LoginViewModel.swift', type: 'file', path: 'Presentation/Features/LoginViewModel.swift' },
            { name: 'ProductListView.swift', type: 'file', path: 'Presentation/Features/ProductListView.swift' },
            { name: 'ProductListViewModel.swift', type: 'file', path: 'Presentation/Features/ProductListViewModel.swift' },
            { name: 'ProductCard.swift', type: 'file', path: 'Presentation/Features/ProductCard.swift' },
            { name: 'ProductDetailView.swift', type: 'file', path: 'Presentation/Features/ProductDetailView.swift' },
            { name: 'ProductDetailViewModel.swift', type: 'file', path: 'Presentation/Features/ProductDetailViewModel.swift' }
          ]
        },
        { name: 'AppCoordinator.swift', type: 'file', path: 'Presentation/AppCoordinator.swift' },
        { name: 'Route.swift', type: 'file', path: 'Presentation/Route.swift' },
        { name: 'ErrorView.swift', type: 'file', path: 'Presentation/ErrorView.swift' }
      ]
    }
  ];
  const codeFiles = {
    'Domain/Entities/Product.swift': `// Domain/Entities/Product.swift
import Foundation

struct Product: Identifiable, Equatable, Codable {
    let id: String
    let name: String
    let description: String
    let price: Double
    let imageURL: String
    let category: String
    
    var formattedPrice: String {
        String(format: "$%.2f", price)
    }
}`,

    'Domain/Entities/User.swift': `// Domain/Entities/User.swift
import Foundation

struct User: Identifiable, Codable {
    let id: String
    let email: String
    let name: String
    let token: String
}`,

    'Domain/UseCases/FetchProductsUseCase.swift': `// Domain/UseCases/FetchProductsUseCase.swift
import Foundation

protocol FetchProductsUseCaseProtocol {
    func execute() async throws -> [Product]
}

class FetchProductsUseCase: FetchProductsUseCaseProtocol {
    private let repository: ProductRepositoryProtocol
    
    init(repository: ProductRepositoryProtocol) {
        self.repository = repository
    }
    
    func execute() async throws -> [Product] {
        return try await repository.fetchProducts()
    }
}`,

    'Domain/UseCases/LoginUseCase.swift': `// Domain/UseCases/LoginUseCase.swift
import Foundation

protocol LoginUseCaseProtocol {
    func execute(email: String, password: String) async throws -> User
}

class LoginUseCase: LoginUseCaseProtocol {
    private let repository: UserRepositoryProtocol
    
    init(repository: UserRepositoryProtocol) {
        self.repository = repository
    }
    
    func execute(email: String, password: String) async throws -> User {
        guard !email.isEmpty else {
            throw AppError.validationError("Email cannot be empty")
        }
        
        guard !password.isEmpty else {
            throw AppError.validationError("Password cannot be empty")
        }
        
        return try await repository.login(email: email, password: password)
    }
}`,

    'Domain/RepositoryProtocols/ProductRepositoryProtocol.swift': `// Domain/RepositoryProtocols/ProductRepositoryProtocol.swift
import Foundation

protocol ProductRepositoryProtocol {
    func fetchProducts() async throws -> [Product]
    func fetchProduct(id: String) async throws -> Product
    func searchProducts(query: String) async throws -> [Product]
}`,

    'Domain/RepositoryProtocols/UserRepositoryProtocol.swift': `// Domain/RepositoryProtocols/UserRepositoryProtocol.swift
import Foundation

protocol UserRepositoryProtocol {
    func login(email: String, password: String) async throws -> User
    func logout() async throws
    func getCurrentUser() -> User?
}`,

    'Data/DTOs/ProductDTO.swift': `// Data/DTOs/ProductDTO.swift
import Foundation

struct ProductDTO: Codable {
    let id: String
    let name: String
    let description: String
    let price: Double
    let imageURL: String
    let category: String
    
    enum CodingKeys: String, CodingKey {
        case id, name, description, price, category
        case imageURL = "image_url"
    }
    
    func toDomain() -> Product {
        Product(
            id: id,
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
            category: category
        )
    }
}`,

    'Data/DTOs/UserDTO.swift': `// Data/DTOs/UserDTO.swift
import Foundation

struct UserDTO: Codable {
    let id: String
    let email: String
    let name: String
    let token: String
    
    func toDomain() -> User {
        User(id: id, email: email, name: name, token: token)
    }
}

struct LoginRequestDTO: Codable {
    let email: String
    let password: String
}`,

    'Data/Repositories/ProductRepository.swift': `// Data/Repositories/ProductRepository.swift
import Foundation

class ProductRepository: ProductRepositoryProtocol {
    private let remoteDataSource: ProductRemoteDataSource
    private let localDataSource: ProductLocalDataSource
    
    init(remoteDataSource: ProductRemoteDataSource,
         localDataSource: ProductLocalDataSource) {
        self.remoteDataSource = remoteDataSource
        self.localDataSource = localDataSource
    }
    
    func fetchProducts() async throws -> [Product] {
        do {
            let dtos = try await remoteDataSource.fetchProducts()
            let products = dtos.map { $0.toDomain() }
            try await localDataSource.saveProducts(products)
            return products
        } catch {
            // Fallback to cache
            return try await localDataSource.fetchProducts()
        }
    }
    
    func fetchProduct(id: String) async throws -> Product {
        let dto = try await remoteDataSource.fetchProduct(id: id)
        return dto.toDomain()
    }
    
    func searchProducts(query: String) async throws -> [Product] {
        let dtos = try await remoteDataSource.searchProducts(query: query)
        return dtos.map { $0.toDomain() }
    }
}`,

    'Data/Repositories/UserRepository.swift': `// Data/Repositories/UserRepository.swift
import Foundation

class UserRepository: UserRepositoryProtocol {
    private let remoteDataSource: UserRemoteDataSource
    private let localDataSource: UserLocalDataSource
    
    init(remoteDataSource: UserRemoteDataSource,
         localDataSource: UserLocalDataSource) {
        self.remoteDataSource = remoteDataSource
        self.localDataSource = localDataSource
    }
    
    func login(email: String, password: String) async throws -> User {
        let dto = try await remoteDataSource.login(email: email, password: password)
        let user = dto.toDomain()
        try await localDataSource.saveUser(user)
        return user
    }
    
    func logout() async throws {
        try await localDataSource.clearUser()
    }
    
    func getCurrentUser() -> User? {
        return localDataSource.getCurrentUser()
    }
}`,

    'Data/DataSources/ProductRemoteDataSource.swift': `// Data/DataSources/ProductRemoteDataSource.swift
import Foundation

class ProductRemoteDataSource {
    private let apiClient: APIClient
    
    init(apiClient: APIClient = .shared) {
        self.apiClient = apiClient
    }
    
    func fetchProducts() async throws -> [ProductDTO] {
        try await apiClient.request(
            endpoint: .products,
            method: .get
        )
    }
    
    func fetchProduct(id: String) async throws -> ProductDTO {
        try await apiClient.request(
            endpoint: .product(id),
            method: .get
        )
    }
    
    func searchProducts(query: String) async throws -> [ProductDTO] {
        try await apiClient.request(
            endpoint: .searchProducts(query),
            method: .get
        )
    }
}`,

    'Data/DataSources/UserRemoteDataSource.swift': `// Data/DataSources/UserRemoteDataSource.swift
import Foundation

class UserRemoteDataSource {
    private let apiClient: APIClient
    
    init(apiClient: APIClient = .shared) {
        self.apiClient = apiClient
    }
    
    func login(email: String, password: String) async throws -> UserDTO {
        let request = LoginRequestDTO(email: email, password: password)
        return try await apiClient.request(
            endpoint: .login,
            method: .post,
            body: request
        )
    }
}`,

    'Data/DataSources/ProductLocalDataSource.swift': `// Data/DataSources/ProductLocalDataSource.swift
import Foundation

class ProductLocalDataSource {
    private let userDefaults = UserDefaults.standard
    private let productsKey = "cached_products"
    
    func saveProducts(_ products: [Product]) async throws {
        let encoder = JSONEncoder()
        let data = try encoder.encode(products)
        userDefaults.set(data, forKey: productsKey)
    }
    
    func fetchProducts() async throws -> [Product] {
        guard let data = userDefaults.data(forKey: productsKey) else {
            throw AppError.cacheError("No cached products")
        }
        
        let decoder = JSONDecoder()
        return try decoder.decode([Product].self, from: data)
    }
}`,

    'Data/DataSources/UserLocalDataSource.swift': `// Data/DataSources/UserLocalDataSource.swift
import Foundation

class UserLocalDataSource {
    private let userDefaults = UserDefaults.standard
    private let userKey = "current_user"
    
    func saveUser(_ user: User) async throws {
        let encoder = JSONEncoder()
        let data = try encoder.encode(user)
        userDefaults.set(data, forKey: userKey)
    }
    
    func getCurrentUser() -> User? {
        guard let data = userDefaults.data(forKey: userKey) else {
            return nil
        }
        return try? JSONDecoder().decode(User.self, from: data)
    }
    
    func clearUser() async throws {
        userDefaults.removeObject(forKey: userKey)
    }
}`,

    'Core/APIClient.swift': `// Core/APIClient.swift
import Foundation

class APIClient {
    static let shared = APIClient()
    private let baseURL = "https://api.example.com"
    private let session: URLSession
    
    init(session: URLSession = .shared) {
        self.session = session
    }
    
    func request<T: Decodable>(
        endpoint: Endpoint,
        method: HTTPMethod = .get,
        body: Encodable? = nil
    ) async throws -> T {
        let url = URL(string: baseURL + endpoint.path)!
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        if let body = body {
            request.httpBody = try JSONEncoder().encode(body)
        }
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw AppError.networkError("Request failed")
        }
        
        return try JSONDecoder().decode(T.self, from: data)
    }
}

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
}`,

    'Core/Endpoint.swift': `// Core/Endpoint.swift
import Foundation

enum Endpoint {
    case login
    case products
    case product(String)
    case searchProducts(String)
    
    var path: String {
        switch self {
        case .login:
            return "/auth/login"
        case .products:
            return "/products"
        case .product(let id):
            return "/products/\\(id)"
        case .searchProducts(let query):
            return "/products/search?q=\\(query)"
        }
    }
}`,

    'Core/AppError.swift': `// Core/AppError.swift
import Foundation

enum AppError: LocalizedError {
    case networkError(String)
    case validationError(String)
    case unauthorized
    case cacheError(String)
    case unknown
    
    var errorDescription: String? {
        switch self {
        case .networkError(let message):
            return "Network error: \\(message)"
        case .validationError(let message):
            return message
        case .unauthorized:
            return "Please log in to continue"
        case .cacheError(let message):
            return "Cache error: \\(message)"
        case .unknown:
            return "An unknown error occurred"
        }
    }
}`,

    'Core/DIContainer.swift': `// Core/DIContainer.swift
import Foundation

class DIContainer {
    static let shared = DIContainer()
    
    // Data Sources
    private lazy var productRemoteDS = ProductRemoteDataSource()
    private lazy var productLocalDS = ProductLocalDataSource()
    private lazy var userRemoteDS = UserRemoteDataSource()
    private lazy var userLocalDS = UserLocalDataSource()
    
    // Repositories
    lazy var productRepository: ProductRepositoryProtocol = {
        ProductRepository(
            remoteDataSource: productRemoteDS,
            localDataSource: productLocalDS
        )
    }()
    
    lazy var userRepository: UserRepositoryProtocol = {
        UserRepository(
            remoteDataSource: userRemoteDS,
            localDataSource: userLocalDS
        )
    }()
    
    // Use Cases
    lazy var fetchProductsUseCase: FetchProductsUseCaseProtocol = {
        FetchProductsUseCase(repository: productRepository)
    }()
    
    lazy var loginUseCase: LoginUseCaseProtocol = {
        LoginUseCase(repository: userRepository)
    }()
    
    // ViewModels
    @MainActor
    func makeLoginViewModel() -> LoginViewModel {
        LoginViewModel(loginUseCase: loginUseCase)
    }
    
    @MainActor
    func makeProductListViewModel() -> ProductListViewModel {
        ProductListViewModel(fetchProductsUseCase: fetchProductsUseCase)
    }
    
    @MainActor
    func makeProductDetailViewModel(product: Product) -> ProductDetailViewModel {
        ProductDetailViewModel(product: product)
    }
}`,

    'Presentation/Features/LoginViewModel.swift': `// Presentation/Features/LoginViewModel.swift
import Foundation
import Combine

@MainActor
class LoginViewModel: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var isAuthenticated = false
    
    private let loginUseCase: LoginUseCaseProtocol
    
    init(loginUseCase: LoginUseCaseProtocol) {
        self.loginUseCase = loginUseCase
    }
    
    func login() {
        isLoading = true
        errorMessage = nil
        
        Task {
            do {
                let user = try await loginUseCase.execute(
                    email: email,
                    password: password
                )
                isAuthenticated = true
                isLoading = false
            } catch {
                errorMessage = error.localizedDescription
                isLoading = false
            }
        }
    }
    
    var isFormValid: Bool {
        !email.isEmpty && !password.isEmpty && email.contains("@")
    }
}`,

    'Presentation/Features/LoginView.swift': `// Presentation/Features/LoginView.swift
import SwiftUI

struct LoginView: View {
    @StateObject private var viewModel: LoginViewModel
    @EnvironmentObject var coordinator: AppCoordinator
    
    init(viewModel: LoginViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }
    
    var body: some View {
        VStack(spacing: 24) {
            VStack(spacing: 8) {
                Image(systemName: "cart.fill")
                    .font(.system(size: 60))
                    .foregroundColor(.blue)
                
                Text("Product Catalog")
                    .font(.title)
                    .fontWeight(.bold)
            }
            .padding(.top, 60)
            
            Spacer()
            
            VStack(spacing: 16) {
                TextField("Email", text: $viewModel.email)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)
                
                SecureField("Password", text: $viewModel.password)
                    .textFieldStyle(.roundedBorder)
                
                if let error = viewModel.errorMessage {
                    Text(error)
                        .foregroundColor(.red)
                        .font(.caption)
                }
                
                Button(action: viewModel.login) {
                    if viewModel.isLoading {
                        ProgressView()
                    } else {
                        Text("Login")
                            .fontWeight(.semibold)
                    }
                }
                .frame(maxWidth: .infinity, minHeight: 50)
                .background(viewModel.isFormValid ? Color.blue : Color.gray)
                .foregroundColor(.white)
                .cornerRadius(10)
                .disabled(!viewModel.isFormValid || viewModel.isLoading)
            }
            .padding(.horizontal, 32)
            
            Spacer()
        }
        .onChange(of: viewModel.isAuthenticated) { _, isAuth in
            if isAuth {
                coordinator.push(.home)
            }
        }
    }
}`,

    'Presentation/Features/ProductListViewModel.swift': `// Presentation/Features/ProductListViewModel.swift
import Foundation
import Combine

@MainActor
class ProductListViewModel: ObservableObject {
    @Published var products: [Product] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var searchQuery = ""
    
    private let fetchProductsUseCase: FetchProductsUseCaseProtocol
    
    init(fetchProductsUseCase: FetchProductsUseCaseProtocol) {
        self.fetchProductsUseCase = fetchProductsUseCase
    }
    
    func loadProducts() {
        isLoading = true
        
        Task {
            do {
                products = try await fetchProductsUseCase.execute()
                isLoading = false
            } catch {
                errorMessage = error.localizedDescription
                isLoading = false
            }
        }
    }
    
    var filteredProducts: [Product] {
        if searchQuery.isEmpty {
            return products
        }
        return products.filter {
            $0.name.localizedCaseInsensitiveContains(searchQuery)
        }
    }
}`,

    'Presentation/Features/ProductListView.swift': `// Presentation/Features/ProductListView.swift
import SwiftUI

struct ProductListView: View {
    @StateObject private var viewModel: ProductListViewModel
    @EnvironmentObject var coordinator: AppCoordinator
    
    init(viewModel: ProductListViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }
    
    var body: some View {
        List {
            ForEach(viewModel.filteredProducts) { product in
                ProductCard(product: product)
                    .onTapGesture {
                        coordinator.push(.productDetail(product))
                    }
            }
        }
        .searchable(text: $viewModel.searchQuery)
        .navigationTitle("Products")
        .overlay {
            if viewModel.isLoading {
                ProgressView()
            }
        }
        .task {
            if viewModel.products.isEmpty {
                viewModel.loadProducts()
            }
        }
    }
}`,

    'Presentation/Features/ProductCard.swift': `// Presentation/Features/ProductCard.swift
import SwiftUI

struct ProductCard: View {
    let product: Product
    
    var body: some View {
        HStack(spacing: 16) {
            AsyncImage(url: URL(string: product.imageURL)) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle().fill(Color.gray.opacity(0.2))
            }
            .frame(width: 80, height: 80)
            .cornerRadius(8)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(product.name)
                    .font(.headline)
                
                Text(product.category)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Text(product.formattedPrice)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.blue)
            }
            Spacer()
        }
        .padding(.vertical, 8)
    }
}`,

    'Presentation/Features/ProductDetailViewModel.swift': `// Presentation/Features/ProductDetailViewModel.swift
import Foundation

@MainActor
class ProductDetailViewModel: ObservableObject {
    @Published var product: Product
    @Published var quantity: Int = 1
    
    init(product: Product) {
        self.product = product
    }
    
    var totalPrice: String {
        let total = product.price * Double(quantity)
        return String(format: "$%.2f", total)
    }
    
    func incrementQuantity() {
        quantity += 1
    }
    
    func decrementQuantity() {
        if quantity > 1 { quantity -= 1 }
    }
    
    func addToCart() {
        print("Added \\(quantity) x \\(product.name)")
    }
}`,

    'Presentation/Features/ProductDetailView.swift': `// Presentation/Features/ProductDetailView.swift
import SwiftUI

struct ProductDetailView: View {
    @StateObject private var viewModel: ProductDetailViewModel
    
    init(viewModel: ProductDetailViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                AsyncImage(url: URL(string: viewModel.product.imageURL)) { image in
                    image.resizable().aspectRatio(contentMode: .fit)
                } placeholder: {
                    ProgressView()
                }
                .cornerRadius(12)
                
                VStack(alignment: .leading, spacing: 16) {
                    Text(viewModel.product.name)
                        .font(.title).fontWeight(.bold)
                    
                    Text(viewModel.product.description)
                        .foregroundColor(.secondary)
                    
                    Divider()
                    
                    HStack {
                        Text(viewModel.product.formattedPrice)
                            .font(.title2).fontWeight(.bold)
                        
                        Spacer()
                        
                        HStack {
                            Button(action: viewModel.decrementQuantity) {
                                Image(systemName: "minus.circle.fill")
                            }
                            Text("\\(viewModel.quantity)")
                                .fontWeight(.semibold)
                            Button(action: viewModel.incrementQuantity) {
                                Image(systemName: "plus.circle.fill")
                            }
                        }
                        .font(.title2)
                    }
                    
                    Button(action: viewModel.addToCart) {
                        Text("Add to Cart - \\(viewModel.totalPrice)")
                            .frame(maxWidth: .infinity, minHeight: 50)
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
                }
                .padding()
            }
        }
        .navigationTitle("Details")
    }
}`,

    'Presentation/AppCoordinator.swift': `// Presentation/AppCoordinator.swift
import SwiftUI

@MainActor
class AppCoordinator: ObservableObject {
    @Published var path = NavigationPath()
    
    func push(_ route: Route) {
        path.append(route)
    }
    
    func pop() {
        path.removeLast()
    }
    
    func popToRoot() {
        path.removeLast(path.count)
    }
}`,

    'Presentation/Route.swift': `// Presentation/Route.swift
import Foundation

enum Route: Hashable {
    case login
    case home
    case productDetail(Product)
}`,

    'Presentation/ErrorView.swift': `// Presentation/ErrorView.swift
import SwiftUI

struct ErrorView: View {
    let message: String
    let retry: () -> Void
    
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle")
                .font(.system(size: 60))
                .foregroundColor(.orange)
            
            Text("Oops!")
                .font(.title)
                .fontWeight(.bold)
            
            Text(message)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            
            Button(action: retry) {
                Text("Try Again")
                    .frame(width: 200, height: 44)
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
    }
}`,

    'App/ProductCatalogApp.swift': `// App/ProductCatalogApp.swift
import SwiftUI

@main
struct ProductCatalogApp: App {
    @StateObject private var coordinator = AppCoordinator()
    
    var body: some Scene {
        WindowGroup {
            NavigationStack(path: $coordinator.path) {
                LoginView(
                    viewModel: DIContainer.shared.makeLoginViewModel()
                )
                .navigationDestination(for: Route.self) { route in
                    destination(for: route)
                }
            }
            .environmentObject(coordinator)
        }
    }
    
    @ViewBuilder
    private func destination(for route: Route) -> some View {
        switch route {
        case .login:
            LoginView(viewModel: DIContainer.shared.makeLoginViewModel())
        case .home:
            ProductListView(
                viewModel: DIContainer.shared.makeProductListViewModel()
            )
        case .productDetail(let product):
            ProductDetailView(
                viewModel: DIContainer.shared.makeProductDetailViewModel(
                    product: product
                )
            )
        }
    }
}`
  };

  const FileTree: React.FC<{ items: FileItem[], level?: number }> = ({ items, level = 0 }) => {
    return (
      <div>
        {items.map((item: FileItem, index: number) => (
          <div key={index}>
            {item.type === 'folder' ? (
              <div>
                <div
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                  style={{ paddingLeft: `${level * 16 + 8}px` }}
                  onClick={() => toggleFolder(item.path)}
                >
                  {expandedFolders[item.path] ? (
                    <ChevronDown size={16} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-600" />
                  )}
                  <Folder size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {expandedFolders[item.path] && item.children && (
                  <FileTree items={item.children} level={level + 1} />
                )}
              </div>
            ) : (
              <div
                className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded ${
                  selectedFile === item.path ? 'bg-blue-50' : ''
                }`}
                style={{ paddingLeft: `${level * 16 + 32}px` }}
                onClick={() => setSelectedFile(item.path)}
              >
                <FileCode size={16} className="text-gray-400" />
                <span className="text-sm">{item.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const architectureInfo = {
    title: "Clean Architecture + MVVM Pattern",
    layers: [
      {
        name: "Domain Layer",
        color: "bg-purple-100 border-purple-300",
        description: "Business logic - completely independent",
        components: ["Entities", "Use Cases", "Repository Protocols"]
      },
      {
        name: "Data Layer",
        color: "bg-green-100 border-green-300",
        description: "Data management and persistence",
        components: ["Repositories", "Data Sources (Remote/Local)", "DTOs"]
      },
      {
        name: "Presentation Layer",
        color: "bg-blue-100 border-blue-300",
        description: "UI and user interaction",
        components: ["Views (SwiftUI)", "ViewModels", "Coordinators"]
      },
      {
        name: "Core Layer",
        color: "bg-yellow-100 border-yellow-300",
        description: "Shared utilities and services",
        components: ["Network", "DI Container", "Extensions", "Errors"]
      }
    ]
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      <Header />
      {/* Section Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg mt-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">SwiftUI Clean Architecture Example</h1>
            <p className="text-blue-100 text-sm md:text-base">Complete Product Catalog App with MVVM + Clean Architecture</p>
          </div>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20"
            >
              {isSidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - File Tree */}
        <div className={`${
          isMobile 
            ? `absolute z-10 top-0 bottom-0 transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'relative'
        } w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto`}>
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <Folder size={18} className="text-blue-500" />
              Project Structure
            </h2>
          </div>
          <div className="p-2">
            <FileTree items={structure} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedFile ? (
            <>
              <div className="bg-gray-100 border-b border-gray-200 px-2 md:px-4 py-2 text-xs md:text-sm font-mono flex items-center justify-between">
                <span className="text-gray-700 truncate">{selectedFile}</span>
                <div className="flex items-center gap-2 ml-2">
                  <button 
                    className="p-1 hover:bg-gray-200 rounded transition-colors" 
                    title="Copy code"
                    onClick={() => {
                      if (selectedFile && codeFiles[selectedFile as keyof typeof codeFiles]) {
                        navigator.clipboard.writeText(codeFiles[selectedFile as keyof typeof codeFiles])
                          .then(() => {
                            const btn = document.activeElement as HTMLButtonElement;
                            const originalTitle = btn.title;
                            btn.title = "Copied!";
                            setTimeout(() => {
                              btn.title = originalTitle;
                            }, 2000);
                          });
                      }
                    }}
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto bg-white p-2 md:p-4">
                <pre className="text-xs md:text-sm font-mono leading-relaxed overflow-x-auto">
                  <code className="text-gray-800 whitespace-pre">
                    {selectedFile && codeFiles[selectedFile as keyof typeof codeFiles]
                      .split('\n')
                      .map((line: string, i: number) => {
                        const parts: JSX.Element[] = [];
                        let remaining = line;
                        let key = 0;

                        // Process comments first
                        const commentMatch = remaining.match(/^(.*?)?(\/\/.*)$/);
                        if (commentMatch) {
                          if (commentMatch[1]) {
                            remaining = commentMatch[1];
                          } else {
                            parts.push(<span key={key++} className="text-green-600">{commentMatch[2]}</span>);
                            remaining = '';
                          }
                        }

                        // Process the rest of the line
                        while (remaining) {
                          // Keywords
                          const keywordMatch = remaining.match(/^(.*?)?\b(class|struct|enum|protocol|func|var|let|if|else|guard|return|throws|async|await|init|private|public|static)\b(.*?)$/);
                          if (keywordMatch) {
                            if (keywordMatch[1]) parts.push(<span key={key++}>{keywordMatch[1]}</span>);
                            parts.push(<span key={key++} className="text-purple-700">{keywordMatch[2]}</span>);
                            remaining = keywordMatch[3] || '';
                            continue;
                          }

                          // Types
                          const typeMatch = remaining.match(/^(.*?)?\b(String|Int|Double|Bool|Void|Self|URL|Data)\b(.*?)$/);
                          if (typeMatch) {
                            if (typeMatch[1]) parts.push(<span key={key++}>{typeMatch[1]}</span>);
                            parts.push(<span key={key++} className="text-blue-600">{typeMatch[2]}</span>);
                            remaining = typeMatch[3] || '';
                            continue;
                          }

                          // Strings
                          const stringMatch = remaining.match(/^(.*?)(".*?")(.*?)$/);
                          if (stringMatch) {
                            if (stringMatch[1]) parts.push(<span key={key++}>{stringMatch[1]}</span>);
                            parts.push(<span key={key++} className="text-red-600">{stringMatch[2]}</span>);
                            remaining = stringMatch[3] || '';
                            continue;
                          }

                          // Any remaining text
                          parts.push(<span key={key++}>{remaining}</span>);
                          remaining = '';
                        }

                        return (
                          <div key={i} className="whitespace-pre">
                            <span className="inline-block w-12 text-gray-400 select-none">{i + 1}</span>
                            {parts}
                          </div>
                        );
                      })}
                  </code>
                </pre>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-6">
              {/* Architecture Overview */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Info className="text-blue-500 mt-1" size={24} />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {architectureInfo.title}
                      </h2>
                      <p className="text-gray-600">
                        A production-ready SwiftUI app demonstrating best practices for large-scale applications
                      </p>
                    </div>
                  </div>
                </div>

                {/* Architecture Layers */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {architectureInfo.layers.map((layer, index) => (
                    <div
                      key={index}
                      className={`${layer.color} border-2 rounded-lg p-4 md:p-5 transition-transform hover:scale-102`}
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {layer.name}
                      </h3>
                      <p className="text-gray-700 mb-3 text-sm">
                        {layer.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {layer.components.map((component, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm"
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "Dependency Injection", desc: "Centralized DI container for easy testing" },
                      { title: "Repository Pattern", desc: "Abstract data sources with fallback to cache" },
                      { title: "Coordinator Pattern", desc: "Type-safe navigation management" },
                      { title: "Use Cases", desc: "Encapsulated business logic" },
                      { title: "Error Handling", desc: "Comprehensive error management" },
                      { title: "Async/Await", desc: "Modern concurrency with Swift 5.5+" },
                      { title: "MVVM", desc: "Clear separation of concerns" },
                      { title: "Protocol-Oriented", desc: "Testable and flexible architecture" }
                    ].map((feature, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-800">{feature.title}</div>
                          <div className="text-sm text-gray-600">{feature.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Flow */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Data Flow Example</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                      <div className="flex-1 p-3 bg-blue-50 rounded">
                        <span className="font-semibold">View</span> - User taps "Login" button
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
                      <div className="flex-1 p-3 bg-blue-50 rounded">
                        <span className="font-semibold">ViewModel</span> - Calls LoginUseCase
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
                      <div className="flex-1 p-3 bg-purple-50 rounded">
                        <span className="font-semibold">Use Case</span> - Validates input, calls Repository
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">4</div>
                      <div className="flex-1 p-3 bg-green-50 rounded">
                        <span className="font-semibold">Repository</span> - Fetches from Remote/Local DataSource
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">5</div>
                      <div className="flex-1 p-3 bg-yellow-50 rounded">
                        <span className="font-semibold">DataSource</span> - Makes API call via APIClient
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">6</div>
                      <div className="flex-1 p-3 bg-green-50 rounded">
                        <span className="font-semibold">Repository</span> - Converts DTO to Domain model
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">7</div>
                      <div className="flex-1 p-3 bg-blue-50 rounded">
                        <span className="font-semibold">ViewModel</span> - Updates @Published properties
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">8</div>
                      <div className="flex-1 p-3 bg-blue-50 rounded">
                        <span className="font-semibold">View</span> - SwiftUI re-renders UI
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testing Benefits */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Testing Benefits</h3>
                  <p className="text-gray-700 mb-3">
                    Each layer can be tested independently with mock implementations:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span><strong>ViewModels:</strong> Test with mock use cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span><strong>Use Cases:</strong> Test with mock repositories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span><strong>Repositories:</strong> Test with mock data sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span><strong>Views:</strong> SwiftUI preview providers with mock data</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Tip:</strong> Click on any file in the left sidebar to view its complete implementation.
                    This example includes login, product listing, search, and detail views.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwiftUIArchitectureExplorer;