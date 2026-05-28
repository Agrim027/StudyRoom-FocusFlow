FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Give permission to mvnw
RUN chmod +x mvnw

# Build jar
RUN ./mvnw clean package -DskipTests

# Run jar
ENTRYPOINT ["sh", "-c", "java -jar target/*.jar"]