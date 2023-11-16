import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initDoc } from './docs'
import { VersioningType } from '@nestjs/common'
import { CommExceptionFilter } from './common/filter/exception.filter'
import { AssembleInterceptor } from './common/interceptor/assemble.interceptor'
import { AuthGuard } from './guard/auth'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableVersioning({ defaultVersion: process.env.API_VERSION, type: VersioningType.URI })
    app.setGlobalPrefix(process.env.API_PREFIX)
    initDoc(app)
    app.useGlobalFilters(new CommExceptionFilter())
    app.useGlobalInterceptors(new AssembleInterceptor())
    app.useGlobalGuards(new AuthGuard())
    await app.listen(3001)
}
bootstrap()
