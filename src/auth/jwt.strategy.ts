import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const domain = configService.get('AUTH0_DOMAIN');
    const audience = configService.get('AUTH0_AUDIENCE');

    console.log('🔧 JWT Strategy Configuration:');
    console.log('  Domain:', domain);
    console.log('  Audience:', audience);
    console.log('  Issuer:', `https://${domain}/`);
    console.log('  JWKS URI:', `https://${domain}/.well-known/jwks.json`);

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: audience,
      issuer: `https://${domain}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    console.log('✅ JWT Token validated successfully!');
    console.log('  User ID (sub):', payload.sub);
    console.log('  Email:', payload.email);
    console.log('  Audience:', payload.aud);

    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  }
}
