# Running the Containers

## Test Database

```bash
cd .docker/

docker compose -f docker-compose.test.yml up --build -d
```

## Dev Database

```bash
cd .docker/

docker compose up --build -d
```


# Stoping the Containers

```bash
cd .docker/

docker compose -f docker-compose.test.yml down
docker compose down
```
# Runnig the project

```bash
nvm install
nvm use
npm i
cp .env.example .env # and fill the variables
npm migration-dev:run # For production use `npm migration:run`
```


# Mapper

How to use the custom mapper

```ts
/**
 * domain/entities.ts
 */

class Name {
  firstname: string;
  lastname: string;

  constructor(attrs: { firstname: string; lastname: string }) {
    Object.assign(this, attrs);
  }
}

type AddressAttrs = { street: string; block: string; neighborhood: string };

class Address {
  street: string;
  block: string;
  neighborhood: string;

  constructor(attrs: AddressAttrs) {
    Object.assign(this, attrs);
  }
}

class Accounts {
  id: string;
  name: Name;
  address: Address;

  constructor(attrs: { id: string; name: Name; address: Address }) {
    Object.assign(this, attrs);
  }
}

/**
 * infra/mappers.ts
 */

type ModelAttrs = {
  id: string;
  firstname: string;
  lastname: string;
  street: string;
  block: string;
  neighborhood: string;
};


// This is a Typeorm entity
class AccountModel {
  id: string;
  firstname: string;
  lastname: string;
  street: string;
  block: string;
  neighborhood: string;

  constructor(attrs: ModelAttrs) {
    Object.assign(this, attrs);
  }
}

/**
 * domain/mappers.ts
 */

function Mapper<TIn, TOut>(
  inClazz: TIn,
  castFunction: (value: TIn) => TOut,
): TOut {
  return castFunction(inClazz);
}

const accountEntityToModel = (account: Accounts) =>
  Mapper(
    account,
    (accountEntity) =>
      new AccountModel({
        block: accountEntity.address.block,
        firstname: accountEntity.name.firstname,
        id: accountEntity.id,
        lastname: accountEntity.name.lastname,
        neighborhood: accountEntity.address.neighborhood,
        street: accountEntity.address.street,
      }),
  );

const accountModelToEntity = (model: AccountModel) =>
  Mapper(
    model,
    (model) =>
      new Accounts({
        id: model.id,
        address: new Address({
          block: model.block,
          neighborhood: model.neighborhood,
          street: model.street,
        }),
        name: new Name({
          firstname: model.firstname,
          lastname: model.lastname,
        }),
      }),
  );

/**
 * main.ts
 */
const account = new Accounts({
  id: '1',
  name: new Name({ firstname: 'Geovane', lastname: 'Otto' }),
  address: new Address({
    street: 'street',
    block: 'block',
    neighborhood: 'neighborhood',
  }),
});

const model = accountEntityToModel(account);

const entity = accountModelToEntity(model);

console.log(model);
console.log('\t\t-----\t\t');
console.log(entity);


```



# Improvements

Na classe AuthSignInService fazer com que o AccessToken e RefreshToken sejam IJwtService

Saindo disso:
```ts
  constructor(
    private readonly passwordHashService: IPasswordHashService,
    private readonly jwtService: IJwtService,
  ) {}
```

Para isso:
```ts
  constructor(
    private readonly passwordHashService: IPasswordHashService,
    private readonly accessTokenService: IJwtService,
    private readonly refreshTokenService: IJwtService,
  ) {}
```