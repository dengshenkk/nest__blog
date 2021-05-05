import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { InterceptorResponse } from '@/common/interseptor/response';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';
import { ValidateModule } from '@/common/validate/validate.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new InterceptorResponse());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('NEST Blog API')
    .addBearerAuth()
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  Logger.debug(`
  
          _____                            _____                            _____                        _____          
         /\\    \\                          /\\    \\                          /\\    \\                      /\\    \\         
        /::\\____\\                        /::\\    \\                        /::\\    \\                    /::\\    \\        
       /::::|   |                       /::::\\    \\                      /::::\\    \\                   \\:::\\    \\       
      /:::::|   |                      /::::::\\    \\                    /::::::\\    \\                   \\:::\\    \\      
     /::::::|   |                     /:::/\\:::\\    \\                  /:::/\\:::\\    \\                   \\:::\\    \\     
    /:::/|::|   |                    /:::/__\\:::\\    \\                /:::/__\\:::\\    \\                   \\:::\\    \\    
   /:::/ |::|   |                   /::::\\   \\:::\\    \\               \\:::\\   \\:::\\    \\                  /::::\\    \\   
  /:::/  |::|   | _____            /::::::\\   \\:::\\    \\            ___\\:::\\   \\:::\\    \\                /::::::\\    \\  
 /:::/   |::|   |/\\    \\          /:::/\\:::\\   \\:::\\    \\          /\\   \\:::\\   \\:::\\    \\              /:::/\\:::\\    \\ 
/:: /    |::|   /::\\____\\        /:::/__\\:::\\   \\:::\\____\\        /::\\   \\:::\\   \\:::\\____\\            /:::/  \\:::\\____\\
\\::/    /|::|  /:::/    /        \\:::\\   \\:::\\   \\::/    /        \\:::\\   \\:::\\   \\::/    /           /:::/    \\::/    /
 \\/____/ |::| /:::/    /          \\:::\\   \\:::\\   \\/____/          \\:::\\   \\:::\\   \\/____/           /:::/    / \\/____/ 
         |::|/:::/    /            \\:::\\   \\:::\\    \\               \\:::\\   \\:::\\    \\              /:::/    /          
         |::::::/    /              \\:::\\   \\:::\\____\\               \\:::\\   \\:::\\____\\            /:::/    /           
         |:::::/    /                \\:::\\   \\::/    /                \\:::\\  /:::/    /            \\::/    /            
         |::::/    /                  \\:::\\   \\/____/                  \\:::\\/:::/    /              \\/____/             
         /:::/    /                    \\:::\\    \\                       \\::::::/    /                                   
        /:::/    /                      \\:::\\____\\                       \\::::/    /                                    
        \\::/    /                        \\::/    /                        \\::/    /                                     
         \\/____/                          \\/____/                          \\/____/                                      
                                                                                                                        
  
  `);
}

bootstrap();
