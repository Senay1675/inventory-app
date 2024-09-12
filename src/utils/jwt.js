//  signJWT skapar och signerar ett JWT-token med en payload (t.ex. användaruppgifter),
// en skyddad header som använder algoritmen HS256, och sätter en utgångstid på 7 dagar.

//  verifyJWT verifierar JWT-token genom att kontrollera dess signatur och utgångstid
// med samma hemliga nyckel som användes vid signering.

// Du kan använda dessa funktioner för att hantera autentisering i din applikation, där en klient får ett JWT-token när de loggar in,
//  och sedan kan detta token verifieras vid framtida förfrågningar för att säkerställa att användaren är autentiserad.


import * as jose from "jose";

export async function signJWT(payload, secret, options = {}) {
    secret = secret || process.env.JWT_SECRET;
    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(new TextEncoder().encode(secret));
    
    return token;
}

export async function verifyJWT(token, secret) {
    secret = secret || process.env.JWT_SECRET;
    const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(secret),
    )
    return payload;
}