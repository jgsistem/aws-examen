FROM openjdk:8-jdk-alpine
LABEL maintainer="martincarrillodurand@gmail.com"
WORKDIR /workspace
ADD target/EncuestaSeguridad*.jar app.jar

#ENV userPoolId="us-east-1_3ywspb2fX"
#ENV clientId="2k1tvf4bro2vdn6m3dlhp1aadf"

ENTRYPOINT exec java -Djava.security.egd=file:/dev/./urandom -jar /workspace/app.jar
EXPOSE 8080