# 🛒 Ecommerce System — Full-Stack Web Application

A full-stack **E-Commerce Web Application** built with a responsive **HTML5/CSS3/JavaScript** frontend and a **Spring Boot** REST backend. It features customer authentication, product catalog browsing, cart management, checkout, and an admin management dashboard — containerized with **Docker** and deployed on an **Azure VM** via an automated **GitHub Actions CI/CD pipeline** with **Clever Cloud MySQL**.

🌐 **Live Application:** [http://20.222.122.53:8081/](http://20.222.122.53:8081/)

---

## 🌟 Key Features

### 🛍️ Customer Storefront & Shopping Experience
- **Product Catalog (`index.html`):** Browse all available products dynamically fetched from the API.
- **User Authentication (`customer.html`, `register.html`):** Secure customer registration and login.
- **Cart Management (`cart.html`):** Add items, update quantities, remove items, or clear cart.
- **Checkout & Orders (`checkout.html`):** Place orders with customer details and view delivery confirmation.
- **User Profile (`profile.html`):** View customer details and past orders/deliveries.

### 🛡️ Admin Dashboard (`admin.html`)
- **Product Management:** Add new products, edit pricing/details, view catalog, and delete products.
- **Delivery & Order Tracking:** Monitor all customer orders and shipment/delivery statuses.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (Custom responsive styling), JavaScript (ES6+ Fetch API) |
| **Backend** | Java 17, Spring Boot 4.0.5 (Spring Web, Spring Data JPA) |
| **Database** | MySQL (Hosted on [Clever Cloud](https://www.clever-cloud.com/)) |
| **Build Tool** | Maven (with Maven Wrapper) |
| **Containerization** | Docker (Multi-stage build) |
| **CI/CD** | GitHub Actions |
| **Hosting** | Azure Virtual Machine (Ubuntu Linux) |
| **Container Registry** | GitHub Container Registry (GHCR) |

---

## 📦 Project Structure

```
ecommerce-system/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── src/
│   └── main/
│       ├── java/com/hamza/ecommerce/
│       │   ├── controller/     # REST Controllers (Admin, Customer, Cart, Order, Health)
│       │   ├── entity/         # JPA Entities (Product, Customer, Cart, Order, Delivery)
│       │   ├── repository/     # Spring Data JPA Repositories
│       │   ├── services/       # Business Logic Services
│       │   ├── DTO/            # Data Transfer Objects (BuyRequest, etc.)
│       │   └── EcommerceSystemApplication.java
│       └── resources/
│           ├── application.properties
│           └── static/         # Frontend Web Application
│               ├── index.html      # Storefront / Catalog
│               ├── customer.html   # Customer Login
│               ├── register.html   # Customer Registration
│               ├── cart.html       # Shopping Cart
│               ├── checkout.html   # Order Checkout
│               ├── profile.html    # Customer Profile & Orders
│               ├── admin.html      # Admin Management Portal
│               ├── css/            # UI Stylesheets (style.css)
│               └── js/             # Client-side API integration scripts
├── Dockerfile                  # Multi-stage container build
├── pom.xml
└── README.md
```

---

## 🖥️ Web Pages & UI Routes

The frontend is served directly by Spring Boot from the static web context:

| Page | Path | Description |
|---|---|---|
| **Home / Store** | `/` or `/index.html` | Product catalog with "Add to Cart" functionality |
| **Login** | `/customer.html` | Customer authentication |
| **Register** | `/register.html` | New account registration |
| **Cart** | `/cart.html` | Review cart items and proceed to checkout |
| **Checkout** | `/checkout.html` | Order placement and payment/delivery details |
| **Profile** | `/profile.html` | View user profile and order history |
| **Admin Portal** | `/admin.html` | Manage products catalog and view deliveries |

---

## 🔌 REST API Reference

The frontend interacts with the following backend REST endpoints:

### 👤 Customer Endpoints — `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register new customer account |
| `POST` | `/login` | Authenticate customer credentials |
| `GET` | `/{id}` | Get customer profile by ID |

### 🛒 Cart Endpoints — `/api/cart`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/add/{customerId}/{productId}` | Add product to cart |
| `GET` | `/{customerId}` | Fetch all cart items for customer |
| `DELETE` | `/remove/{cartId}` | Remove specific cart item |
| `DELETE` | `/clear/{customerId}` | Empty the customer's cart |

### 🧾 Order Endpoints — `/api/order`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/buy` | Process checkout and create order/delivery |

### 📦 Admin Endpoints — `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/products/add` | Create new product |
| `GET` | `/products` | List all products |
| `GET` | `/products/{id}` | Get product details by ID |
| `PUT` | `/products/{id}` | Update existing product |
| `DELETE` | `/products/{id}` | Delete product by ID |
| `GET` | `/deliveries` | List all deliveries/orders |
| `GET` | `/deliveries/{id}` | Get delivery by ID |
| `GET` | `/deliveries/customer/{customerId}` | List deliveries for a customer |

### ❤️ Health Check — `/api/health`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Application health status |

---

## 🗄️ Database

The application connects to a cloud-hosted **MySQL** database on [Clever Cloud](https://www.clever-cloud.com/).

Database credentials and environment variables are injected at runtime via `.env`:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://<host>:<port>/<db>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
```

---

## 🐳 Docker Architecture

The project uses a **multi-stage build** Dockerfile:

```dockerfile
# Stage 1: Build JAR using Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 10000
CMD ["java", "-jar", "app.jar"]
```

- Spring Boot listens on internal port **10000**.
- The Docker container is published on host port **8081** (`-p 8081:10000`).

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

Every push to the `master` branch triggers the automated pipeline configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

```
git push origin master
         │
         ▼
 1. Checkout repository
         │
         ▼
 2. Setup JDK 17 (Eclipse Temurin)
         │
         ▼
 3. Build with Maven (./mvnw clean package -DskipTests)
         │
         ▼
 4. Login to GitHub Container Registry (ghcr.io)
         │
         ▼
 5. Build & push Docker image (ghcr.io/<repo>:latest)
         │
         ▼
 6. SSH Deploy to Azure VM
    ├── docker pull ghcr.io/<repo>:latest
    ├── docker rm -f bechakena || true
    ├── docker run -d --restart unless-stopped --env-file ~/bechakena/.env -p 8081:10000
    └── docker image prune -f
```

### GitHub Secrets Required

| Secret | Description |
|---|---|
| `VM_HOST` | Public IP address of the Azure Virtual Machine |
| `VM_USER` | SSH user (e.g. `azureuser`) |
| `VM_SSH_KEY` | Private SSH key for Azure VM authentication |

---

## 🏃 Running Locally

### Prerequisites
- **Java 17+**
- **Maven 3.9+** (or use bundled `./mvnw`)
- **MySQL** instance (local or Clever Cloud)
- **Docker** (optional)

### 1. Clone & Setup
```bash
git clone https://github.com/hamza-vuiyan/springboot-ecommerce.git
cd ecommerce-system
```

### 2. Configure Database
Set your database credentials in `src/main/resources/application.properties` or create a `.env` file:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Run with Maven Wrapper
```bash
./mvnw spring-boot:run
```

Access the UI at: **`http://localhost:10000/`** (or configured port)

### 4. Run with Docker
```bash
docker build -t ecommerce-system .
docker run -d --name ecommerce-system --env-file .env -p 8081:10000 ecommerce-system
```

Access the UI at: **`http://localhost:8081/`**

---

## 🌐 Live Deployment Details

- **Live URL:** [http://20.222.122.53:8081/](http://20.222.122.53:8081/)
- **Infrastructure:** Microsoft Azure Virtual Machine (Ubuntu Linux)
- **Container Policy:** `--restart unless-stopped` (auto-restarts on VM reboot)
- **Database:** Clever Cloud MySQL (Managed Cloud Database)

---

## 👨‍💻 Author

**Hamza**  
GitHub: [@hamza-vuiyan](https://github.com/hamza-vuiyan)
