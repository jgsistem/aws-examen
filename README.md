# Examen AWS
## Fuentes Backend y FrontEnd
1. Carpeta EncuestaSeguridad
Es el api desarrollado en spring boot para la seguridad y accesos del aplicativo.
2. Carpeta ApiEncuesta
Es el api desarrollado en spring boot para registrar, modificar, eliminar y listar una encuesta.
3. Carpeta encuestaWeb
Es el frontend se desarrollo en angular 8  bootstrap 4

## CloudFormation
La carpeta cloudformation se encuentran los archivos .yml que se utilizo para crear toda la red en aws
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/cloudFormation.png)

## Ruta del aplicativo con DNS
https://www.martincarrillo.site/

## COGNITO - Credenciales de Prueba
1. Rol Administrado:

Usuario: admin

Contraseña: 123456

2. Rol User:

Usuario: martin

Contraseña: 12345678

El usuario administrador se le habilitan 2 opciones en el aplicativo:
1. Encuesta Votar
2. Encuesta listar

El usuario normal se le habilitan 1 opcion en el aplicativo:
1. Encuesta Votar

Pantalla de configuracion de cognito:

En cognito se registraron los usuarios admin y martin
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/usuario-cognito.png)

roles de los usuarios
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/cognito-grupo.png)


## IAM- ROLES
roles que utilizan la ec2 y ecs 
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/iam.png)

## EC2 - INSTANCIA
se creó una instancia en ec2
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/EC2-instancia.png)

configuracion de la ec2
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/ec2-descripcion.png)

## ECS - CLUSTER
cluster
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/ecs-cluster.png)
services
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/ecs-services.png)
Task
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/ecs-task.png)
instancia
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/ecs-instancia.png)

Todo el detalle de la configuración del cluster ECS se encuentra el cloudformation de la carpeta cloud/Formation/8-cluster.yml

## S3 - APIGATEWAY - FRONTEND
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/s3bucket.png)

1. En el bucket apigateway-encuesta se encuentra el archivo encuesta-swagger.yml cargado desde la carpeta cloudFormation

2. En el bucket cloudfront-aate-encuestas3frontendangular-yh7sc4badu7s se encuentran los archivos frontend apuntado al stage prod del apigateway

## CLOUDFRONT
El archivo cloudformation se encuentra en cloudFormation/cloudfrom.yml
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/cloudfront.png)

## VPC
El archivo cloudformation se encuentra en cloudFormation/VPC.yml 
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/vpcaate.png)

El archivo cloudformation se encuentra en cloudFormation/FireWall.yml
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/firewal.png)

El archivo cloudformation se encuentra en cloudFormation/balanceador.yml
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/balancer.png)


## RDS
El archivo cloudformation se encuentra en cloudFormation/basedatos.yml 

Base de datos en postgres
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/database.png)
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/rds.png)

## APIGATEWAY
El archivo cloudformation se encuentra en cloudFormation/apiGateway.yml y el archivo
cloudFormation/encuesta-swagger.yml

![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/APIGTEWAY.png)

## CLOUDWATCH
Log de las apis
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/cloudwatch.png)
![](https://github.com/marvicgit/aws-examen/blob/master/pantallazos/logs.png)
















