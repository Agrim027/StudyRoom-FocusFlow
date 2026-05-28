FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy full backend project
COPY . .

# Build the jar inside container
RUN ./mvnw clean package -DskipTests

# Run the jar
ENTRYPOINT ["sh", "-c", "java -jar target/*.jar"]