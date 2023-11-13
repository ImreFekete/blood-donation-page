FROM maven:3.9.3-eclipse-temurin-17 AS java-build
WORKDIR /maven_build
COPY ./backend/pom.xml /maven_build
RUN mvn dependency:resolve
COPY ./backend/src /maven_build/src
COPY --from=react-build /react_build/build ./src/main/resources/public
RUN mvn -f pom.xml clean package
