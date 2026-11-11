# Atividades práticas: testes automatizados com Jest

## Atividade 1

### Passo 1: tipos de teste

| Item | Tipo | Por quê? |
|---|---|---|
| a | Unitário | Verifica o resultado de `calcularFrete()` isoladamente. |
| b | Integração | Confere a comunicação entre o serviço de pedidos e o banco de dados. |
| c | End-to-end | Percorre a compra completa como o usuário faria no site. |
| d | Integração | Confere a comunicação do sistema de compras com o serviço de e-mail por HTTP. |
| e | Unitário | Verifica o cálculo de `aplicarCupom()` isoladamente. |
| f | Integração | Testa a rota HTTP junto com o código que cria e devolve o pedido. |

### Passo 2: pirâmide de testes

| Nível | Tipo de teste | Quantidade relativa | Custo |
|---|---|---|---|
| Topo | End-to-end | Poucos | Alto |
| Meio | Integração | Quantidade intermediária | Médio |
| Base | Unitários | Muitos | Baixo |

A base é mais larga porque os testes unitários são rápidos e baratos. Eles permitem verificar muitos comportamentos com frequência. Os testes de ponta a ponta cobrem fluxos importantes, mas custam mais tempo e manutenção.

### Passo 3: respostas

1. Testes automatizados são verificações executadas por um programa, que compara resultados obtidos com resultados esperados. Em um teste manual, uma pessoa executa os passos e confere o resultado.
2. Uma regressão acontece quando uma mudança quebra algo que funcionava antes. Executar os testes após cada mudança ajuda a encontrar esse problema cedo.
3. Em uma orquestra, testar um músico tocando sozinho se parece com um teste unitário. Testar se dois ou mais músicos tocam juntos no tempo certo se parece com um teste de integração.
4. Dois benefícios são encontrar erros mais cedo e dar segurança para alterar o código.
5. A qualidade faz parte do processo porque o comportamento do sistema precisa ser verificado durante o desenvolvimento, a cada mudança, e não somente no fim.

### Passo 4: caso do cupom

- Um teste unitário de `aplicarCupom()` ou do cálculo do total com cupom teria encontrado primeiro a diferença no resultado esperado.
- Esse teste deveria rodar durante a alteração e novamente antes de integrar a mudança ao projeto.
- Além de corrigir o defeito, a equipe deve acrescentar um teste que reproduza o caso do cupom para evitar a mesma regressão.

## Atividade 2

Na atividade 2, os arquivos `sum.ts` e `sum.spec.ts` foram colocados juntos em `src` para facilitar encontrar o teste de cada função. Na continuação, o exercício 5 reorganizou todos os testes em `src/__tests__`. O projeto usa `testEnvironment: 'node'` em `jest.config.js`.

### Perguntas

1. `ts-jest` transforma o TypeScript dos testes e do código para que o Jest consiga executá-los.
2. `node` é o ambiente adequado porque estas funções não usam navegador ou DOM. `jsdom` simula recursos de navegador.
3. Em `__tests__`, os testes ficam agrupados em uma pasta. Com `.spec.ts` ao lado da função, o código e seu teste ficam próximos. O Jest reconhece as duas convenções.
4. Um arquivo chamado apenas `sum.ts` não é identificado automaticamente como teste pelo Jest. Se contiver código de teste, esse código não será executado como suíte.

### Saída do teste da soma

Comando da atividade original: `npm test -- src/sum.spec.ts --runInBand`. O teste está atualmente em `src/__tests__/sum.spec.ts`, conforme a reorganização do exercício 5.

![Resultado do teste da soma](image.png)

## Atividade 3

`subtract.ts` implementa a subtração com parâmetros e retorno tipados. Os cinco casos pedidos estão em `subtract.spec.ts`. Em cada teste, os dados são preparados, a função é executada e o resultado é verificado, seguindo Arrange, Act e Assert. As três etapas são separadas por linhas em branco.

`montarOperacao.ts` devolve um objeto com `operacao`, `valores` e `resultado`. Seus testes usam `toBe` para texto exato, `toEqual` para o objeto, `toContain` para um item do array e `toBeTruthy` para confirmar que o objeto existe. `toBeNull` não se aplica a esses resultados, pois nenhum campo tem valor nulo.

### Saída da suíte completa

Comando executado: `npm test`

![Resultado dos testes das atividades 2 e 3](image-1.png)

### Resultado das atividades 2 e 3

As atividades 2 e 3 resultaram em três suítes e dez testes aprovados no Jest.

## Exercício 4: testando erros

A função `divide` foi criada em `src/divide.ts`. Ela divide os dois números e lança `Error('divisão por zero')` quando o divisor é zero. Os seis cenários pedidos estão cobertos em `src/__tests__/divide.spec.ts`.

### Comparação das quatro variações

| Verificação | O que exige |
|---|---|
| `toThrow()` | Que algum erro seja lançado. |
| `toThrow('divisão por zero')` | Que a mensagem do erro contenha esse texto. |
| `toThrow(/zero/)` | Que a mensagem corresponda à expressão regular. |
| `toThrow(Error)` | Que o erro seja uma instância de `Error`. |

As quatro variações estão em testes separados. A verificação da mensagem é a que melhor identifica o motivo esperado neste exemplo. O teste com `Error` confirma o tipo, mas ainda aceita outros erros desse mesmo tipo.

### Respostas

1. O `expect` precisa receber uma função para o Jest controlar a chamada e capturar o erro. Se escrevermos `expect(divide(10, 0))`, a divisão será executada e lançará o erro antes de o `expect` recebê-la.
2. Se a função não lançar erro e o teste usar `toThrow`, o teste falha.
3. Verificar a mensagem ajuda a confirmar que o erro aconteceu pelo motivo esperado. Verificar apenas se houve erro poderia aceitar uma falha diferente.
4. Usaria `not.toThrow` para confirmar que uma entrada válida não provoca erro, como `divide(10, 5)`.

A execução apenas da divisão passou com nove testes: [saída do exercício 4](relatorios/testes-divide.txt).

## Exercício 5: estrutura de arquivos

Escolhi agrupar todos os testes em `src/__tests__`, mantendo a extensão `.spec.ts`. Agora o projeto tem mais funções, e uma pasta única facilita localizar suas suítes. O TypeScript e o `ts-jest` foram mantidos, como o enunciado permite.

```text
src/
  __tests__/
    api.spec.ts
    divide.spec.ts
    formatador.spec.ts
    montarOperacao.spec.ts
    subtract.spec.ts
    sum.spec.ts
    usuarioService.spec.ts
  app.ts
  divide.ts
  formatador.ts
  montarOperacao.ts
  server.ts
  subtract.ts
  sum.ts
  usuarioService.ts
```

Os imports dos testes usam `../` para alcançar o arquivo de produção. `formatarNome` retira os espaços das pontas, coloca as letras em minúsculas e transforma a primeira em maiúscula. Foram testadas as entradas `maria`, ` joão `, `ANA` e texto vazio.

O comando `npm test -- divide formatador --runInBand` aprovou as duas suítes deste exercício, com treze testes: [saída do exercício 5](relatorios/testes-estrutura.txt). Na conclusão dos exercícios 4 a 8, a suíte completa tinha sete arquivos de teste, incluindo as atividades anteriores, a API e o serviço de usuários.

### Comandos do dia a dia

| Comando | Uso |
|---|---|
| `npm test -- --runInBand` | Executa todos os testes uma vez. |
| `npx jest --watch --runInBand` | Acompanha alterações e reexecuta os testes relacionados. |
| `npx jest divide --runInBand` | Executa apenas a suíte de divisão. |
| `npx jest --verbose --runInBand` | Mostra o nome de cada teste. |

Os comandos registrados utilizam `--runInBand` para executar os testes sequencialmente no mesmo processo.

A execução com `--verbose` está registrada em [saída detalhada dos testes](relatorios/testes-verbose.txt).

## Exercício 6: integração com API REST

O arquivo `app.ts` configura o Express e a rota `GET /ping`, que devolve `{ status: 'ok' }`. O arquivo `server.ts` inicia o servidor na porta 3000. Os testes importam somente o app e usam o Supertest para gerenciar as requisições HTTP temporárias.

Os quatro cenários foram testados: resposta 200 e corpo correto, cabeçalho JSON, rota inexistente com 404 e `POST /ping` com 404. Em todos os casos são verificados o status e o conteúdo da resposta. Para os erros 404, foi mantida a resposta HTML padrão do Express e verificado seu texto.

### Respostas

1. É um teste de integração porque verifica a requisição HTTP passando pelo Express, pela rota e pela criação da resposta, com esses componentes funcionando juntos.
2. Se `app.listen` estivesse dentro de `app.ts`, importar o app já abriria a porta 3000. Isso poderia causar conflito de porta e deixar um servidor aberto ao terminar os testes.
3. Usamos `toEqual` porque queremos comparar os campos do objeto. `toBe` compararia a referência do objeto, e dois objetos com o mesmo conteúdo podem ter referências diferentes.

## Exercício 7: simulando banco de dados

`criarUsuarioService` recebe um repositório e devolve o método `buscarUsuario`. O serviço retorna o resultado de `buscarPorId`, inclusive `null` quando o usuário não existe. A dependência aceita também uma promessa, permitindo usar o mesmo serviço com um repositório assíncrono.

Os cinco testes usam `jest.fn()`, `mockReturnValue`, `mockResolvedValue`, `toHaveBeenCalled`, `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`, `toEqual` e `toBeNull`. O caso assíncrono usa `await`. Cada teste cria seu próprio mock, e `beforeEach` também chama `jest.clearAllMocks()` para limpar os históricos de chamadas.

### Respostas

1. Verificar o retorno confirma o resultado entregue ao chamador. Verificar a chamada confirma que o serviço consultou o repositório, com qual id e quantas vezes. As duas verificações observam aspectos diferentes do comportamento.
2. O serviço recebe o repositório para que possamos substituí-lo por um mock durante os testes. Assim, não precisamos conectar a um banco real.
3. O mock não garante que a consulta funciona em um banco real, que os dados são gravados corretamente ou que a conexão está configurada. Um teste de integração com o banco pode verificar essa comunicação.

`jest.clearAllMocks()` limpa as chamadas registradas, mas não apaga a implementação ou o retorno configurado do mock.

## Exercício 8: cobertura de código

### Medição antes e depois

A primeira medição foi feita antes de acrescentar o teste de texto vazio de `formatarNome` e antes de configurar o piso de cobertura. Todas as funções incluídas no relatório já tinham algum teste: oito funções foram executadas, contando a fábrica do serviço e seu método. Nenhuma função de produção incluída no cálculo estava completamente sem teste.

O arquivo com menor cobertura de ramos era `formatador.ts`, com 0% na medição gerada. A linha 5, que devolve texto vazio quando o nome está vazio, não tinha sido executada. Nesse arquivo, instruções e linhas estavam em 80%, e funções em 100%.

Acrescentei o teste `returns an empty name without throwing an error`, executei a cobertura novamente e obtive:

| Métrica global | Antes | Depois |
|---|---|---|
| Instruções | 96% | 100% |
| Ramos | 50% | 100% |
| Funções | 100% | 100% |
| Linhas | 96% | 100% |
| Testes aprovados | 31 | 32 |
| Suítes aprovadas | 7 | 7 |

Na medição final, todos os sete arquivos incluídos no relatório ficaram com 100% nas quatro métricas, sem linhas descobertas.

### Relatórios entregues

- [Relatório visual antes](relatorios/cobertura-antes/lcov-report/index.html).
- [Relatório visual depois](relatorios/cobertura-depois/lcov-report/index.html).
- [Saída do comando antes](relatorios/cobertura-antes.txt).
- [Saída do comando depois](relatorios/cobertura-depois.txt).
- [Resumo numérico antes](relatorios/cobertura-antes/coverage-summary.json).
- [Resumo numérico depois](relatorios/cobertura-depois/coverage-summary.json).

Em `formatador.ts`, o relatório inicial marca a linha 5 como não executada; o relatório final mostra essa linha coberta. Os relatórios HTML e seus arquivos de apoio foram gerados automaticamente pelo Jest.

O comando da primeira medição foi `npm test -- --coverage --runInBand --coverageDirectory=relatorios/cobertura-antes`. O comando final foi `npm test -- --coverage --runInBand`. Nessa etapa, o diretório padrão foi configurado como `relatorios/cobertura-depois` para preservar a medição inicial.

### Piso de cobertura

O arquivo `jest.config.js` exige no mínimo 80% de instruções, 70% de ramos, 80% de funções e 80% de linhas. Esses valores seguem a proposta do exercício e ajudam a detectar quedas importantes de cobertura neste projeto de aprendizado. A execução final passou com o piso habilitado.

O cálculo inclui os arquivos `.ts` de produção. Os testes e `server.ts` foram excluídos, pois o primeiro grupo contém as verificações, e o segundo apenas inicia o servidor. A aplicação e sua rota continuam incluídas por meio de `app.ts`.

### Respostas

1. Cobertura de instruções mede quais instruções foram executadas. Cobertura de ramos mede quais caminhos das decisões foram percorridos, como a condição de divisor zero e a de nome vazio.
2. Cem por cento de cobertura não significa ausência de defeitos porque executar uma linha não garante que o teste verificou corretamente seu resultado ou considerou todas as entradas relevantes.
3. A cobertura não aponta uma funcionalidade que deveria existir, mas não foi implementada, nem uma regra de negócio entendida de forma errada.
4. Excluir arquivos que apenas iniciam o programa, arquivos gerados e os próprios testes mantém o cálculo focado no código de produção que queremos verificar.
5. Para este projeto, definiria o piso de 80% de instruções, funções e linhas e 70% de ramos, mantendo a análise dos cenários junto com a métrica. O objetivo é evitar lacunas relevantes sem criar testes apenas para aumentar números.

## Resultado dos exercícios 4 a 8

O comando `npm test -- --coverage --runInBand` aprovou as sete suítes e os 32 testes, com 100% de cobertura de instruções, ramos, funções e linhas nos arquivos incluídos no cálculo. A compilação TypeScript foi aprovada com `npm run build`.

## Exercício 9: boas práticas de testes

### Problemas do teste original

| Problema | Consequência |
|---|---|
| Nome genérico `teste1` | A falha não identifica o comportamento esperado. |
| Vários cenários no mesmo teste | Uma falha interrompe a execução das asserções seguintes daquele teste. |
| Soma e subtração misturadas | O resultado não indica claramente qual função apresentou o problema. |
| Ausência de agrupamento por função | O relatório fica mais difícil de interpretar. |

As funções `sum` e `subtract`, já existentes no projeto, correspondem à soma e à subtração do exemplo. Cada uma tem seu próprio `describe`. Os três casos de soma foram escritos com `test.each`, usando os campos `a`, `b` e `esperado`. O título `deve retornar $esperado quando somar $a e $b` apresenta os valores na ordem correta no relatório. A subtração de 5 por 2 foi acrescentada à suíte de `subtract`.

Os nomes dos testes do projeto foram padronizados como `deve [resultado] quando [condição]`. A preparação dos dados, a chamada da função e a asserção ficam separadas por linhas em branco, seguindo AAA.

### Respostas

1. O nome faz parte da qualidade do teste porque explica o comportamento e ajuda a localizar o problema pelo relatório, sem precisar abrir o código.
2. Quando uma asserção falha, as seguintes no mesmo teste não são executadas. Outros testes continuam sendo avaliados.
3. O `describe` reúne os casos de uma função e acrescenta contexto aos nomes dos testes.
4. `test.each` é adequado quando vários conjuntos de dados verificam a mesma regra e usam a mesma preparação e asserção. Cada linha gera um caso independente.

A refatoração aprovou nove casos entre soma e subtração: [execução do exercício 9](relatorios/exercicios-9-a-17/09-calculos.txt). Como verificação adicional, a soma foi alterada temporariamente para subtração. Dois dos três testes falharam, e a implementação correta foi restaurada: [falha proposital detectada](relatorios/exercicios-9-a-17/09-funcao-alterada-propositalmente.txt).

## Exercício 10: projeto integrado

O app mantém `GET /ping` e acrescenta `GET /saudacao/:nome` e `POST /soma`. O servidor continua separado em `server.ts`. A rota de soma usa `sum` e verifica se os dois campos são números antes de calcular.

| Cenário pedido | Status verificado | Conteúdo verificado |
|---|---|---|
| `GET /saudacao/Maria` | 200 | `{ mensagem: 'Olá, Maria' }` |
| `GET /saudacao/Ana%20Paula` | 200 | `{ mensagem: 'Olá, Ana Paula' }` |
| `POST /soma` com `{ a: 2, b: 3 }` | 200 | `{ resultado: 5 }` |
| `POST /soma` com `{ a: -5, b: 2 }` | 200 | `{ resultado: -3 }` |
| `POST /soma` sem `b` | 400 | `{ erro: 'Os campos a e b devem ser números.' }` |
| `POST /soma` com `{ a: 'x', b: 3 }` | 400 | `{ erro: 'Os campos a e b devem ser números.' }` |
| `GET /rota-inexistente` | 404 | Texto `Cannot GET /rota-inexistente` na resposta padrão do Express. |

O nome com espaço é codificado com `encodeURIComponent` na requisição. O teste de rota inexistente já fazia parte da suíte anterior e foi mantido. Também foram testados o campo `a` ausente, o campo `b` com texto e a ausência do corpo da requisição. Todas as requisições usam `await`, e cada cenário confere status e conteúdo.

Os casos estão em `src/__tests__/api.spec.ts`. Os resultados das rotas constam na [execução da suíte completa](relatorios/exercicios-9-a-17/suite-completa.txt).

## Exercício 11: arrays

`filtrarPares` usa `filter` para manter os números divisíveis por dois, preservando a ordem original.

| Entrada | Verificação | Matcher |
|---|---|---|
| `[1, 2, 3, 4, 5, 6]` | Resultado `[2, 4, 6]` | `toEqual` |
| `[1, 3, 5]` | Resultado `[]` | `toEqual` |
| `[]` | Resultado `[]` | `toEqual` |
| `[-4, -3, 0, 7]` | Resultado `[-4, 0]` | `toEqual` |
| `[10, 11, 12]` | Resultado contém 12 | `toContain` |
| `[2, 4, 6, 8]` | Resultado tem quatro elementos | `toHaveLength` |
| `[1, 3, 5]` | Resultado não contém 2 | `not.toContain` |

O teste `expect(filtrarPares([1, 2, 3, 4])).toBe([2, 4])` foi executado e falhou. O Jest mostrou `Expected: [2, 4]` e `Received: serializes to the same string`: os arrays tinham o mesmo conteúdo, mas eram objetos diferentes na memória.

`toBe` compara a identidade dos arrays. `toEqual` compara seus elementos. `toContain` verifica a presença de um valor simples, e `toHaveLength` verifica a quantidade de elementos.

A [execução com o matcher incorreto](relatorios/exercicios-9-a-17/11-array-toBe.txt) registrou sete casos aprovados e um reprovado. Na versão final, o oitavo teste usa `toEqual` e também passa.

## Exercício 12: objetos

A primeira versão de `criarUsuario` devolvia somente `nome` e `idade`. Os cinco testes pediam a comparação completa com `toEqual`, a presença de `nome`, o valor de `idade`, a correspondência parcial com `toMatchObject` e um nome verdadeiro com `toBeTruthy`.

Na evolução da função, foi acrescentado um `id` gerado por `randomUUID`, do módulo nativo `node:crypto`.

| Etapa | Resultado |
|---|---|
| Objeto sem `id` | Cinco testes aprovados. |
| Objeto com `id`, mantendo a expectativa completa antiga | Um teste reprovado e quatro aprovados. |
| Expectativa completa atualizada e teste de ids diferentes | Seis testes aprovados na suíte final. |

O teste com `toEqual({ nome: 'Maria', idade: 30 })` passou a falhar porque o objeto recebido contém a propriedade adicional `id`. O teste com `toMatchObject` continuou passando porque compara somente os campos especificados.

`toEqual` é adequado quando todos os campos esperados fazem parte do contrato verificado. `toMatchObject` é adequado quando apenas parte do objeto interessa ao caso de teste. Na versão final, a comparação completa inclui `id: expect.any(String)`, e outro teste confirma que dois usuários recebem ids diferentes.

Evidências: [objeto sem id](relatorios/exercicios-9-a-17/12-objeto-sem-id.txt) e [falha da comparação antiga após incluir id](relatorios/exercicios-9-a-17/12-objeto-com-id-toEqual-antigo.txt).

## Exercício 13: beforeEach e afterEach

Sem os ganchos, o primeiro teste incrementou o contador de zero para um. O segundo recebeu esse estado e incrementou de um para dois, embora esperasse um. A [execução sem limpeza](relatorios/exercicios-9-a-17/13-contador-sem-gancho.txt) registrou um teste aprovado e um reprovado, com `Expected: 1` e `Received: 2`.

A correção chama `reiniciar` em `beforeEach`. O `afterEach` registra o valor final com `obterValor`. A suíte final verifica zero incrementos, um incremento e três incrementos.

| Execução | Valores registrados pelo `afterEach` | Resultado |
|---|---|---|
| Ordem inicial dos testes corrigidos | 1, 3, 0 | Três aprovados. |
| Blocos `it` invertidos no arquivo | 0, 3, 1 | Três aprovados. |
| Ordem aleatória com seed 42 | 0, 1, 3 | Três aprovados. |

Em cada caso, a ordem é `beforeEach`, corpo do teste e `afterEach`. As mensagens aparecem após a execução do respectivo teste.

| Gancho | Momento de execução |
|---|---|
| `beforeAll` | Uma vez, antes dos testes do bloco. |
| `beforeEach` | Antes de cada teste do bloco. |
| `afterEach` | Depois de cada teste do bloco. |
| `afterAll` | Uma vez, depois dos testes do bloco. |

### Respostas

1. O estado compartilhado é um problema quando um teste altera os dados que outro usa. Isso cria dependência da ordem de execução.
2. `beforeAll` prepara algo uma única vez para o grupo. `beforeEach` prepara novamente antes de cada caso, permitindo começar com um estado limpo.
3. Ao mudar a ordem, um teste dependente pode receber outro estado e falhar, mesmo sem mudança na função testada.
4. Um arquivo temporário criado durante um teste pode ser removido no `afterEach`. Outros exemplos são limpar registros de teste do banco e restaurar funções substituídas.

Evidências: [contador com ganchos](relatorios/exercicios-9-a-17/13-contador-com-ganchos.txt), [ordem invertida](relatorios/exercicios-9-a-17/13-contador-ordem-invertida.txt) e [ordem aleatória](relatorios/exercicios-9-a-17/13-contador-ordem-aleatoria.txt).

## Exercício 14: promises

A versão inicial de `buscarDados` retornava `Promise.resolve({ ok: true })`. O teste com `await expect(...).resolves.toEqual(...)` passou: [execução inicial](relatorios/exercicios-9-a-17/14-promessa-inicial.txt).

### Experiência sem await

A função foi alterada temporariamente para devolver `{ ok: false }`, e o teste foi executado sem `await`. Com Node 22.14.0 e Jest 29.7.0, a execução terminou com código 1 e `JestAssertionError`, mostrando a diferença entre `ok: true` e `ok: false`. Nesse caso, a rejeição da asserção não aguardada encerrou o processo; não ocorreu a aprovação incorreta descrita como possibilidade no enunciado.

O experimento foi repetido com `expect.assertions(1)` e também terminou com código 1. Esse comando exige que exatamente uma asserção seja executada durante o teste. Ele não aguarda promessas e não substitui `await` ou o retorno da promessa ao Jest.

Sem aguardar, o resultado depende do momento em que a operação assíncrona termina: uma verificação pode ocorrer depois do encerramento do teste ou provocar uma rejeição não tratada. A versão final aguarda as comparações assíncronas.

Evidências: [sem await](relatorios/exercicios-9-a-17/14-sem-await.txt) e [sem await, com contagem de asserções](relatorios/exercicios-9-a-17/14-sem-await-com-assertions.txt).

### Casos finais

| Verificação | Matcher |
|---|---|
| Objeto completo `{ ok: true }` | `resolves.toEqual` |
| Presença da propriedade `ok` | `resolves.toHaveProperty` |
| Campo `ok` verdadeiro | `resolves.toMatchObject` |
| Retorno é uma promessa | `toBeInstanceOf(Promise)` |

## Exercício 15: async e await

`buscarDados` foi adaptada para `async` e retorna `{ ok: true }`. A suíte mantém os casos do exercício 14 e acrescenta a comparação do objeto obtido com `const resultado = await buscarDados()`.

`buscarDadosComErro` lança `Error('falha ao buscar dados')` dentro de uma função `async`, produzindo uma promessa rejeitada. Os testes verificam a mensagem com `rejects.toThrow`, o tipo com `rejects.toBeInstanceOf(Error)` e as duas informações usando `try` e `catch`.

Na versão com `try/catch`, `expect.assertions(2)` exige a execução das duas asserções do `catch`. Se a função deixar de rejeitar, nenhuma delas será executada, e o teste falhará pela contagem. Sem essa verificação, o teste poderia terminar sem conferir nada. A forma com `rejects` já falha quando a promessa resolve em vez de rejeitar.

Os exercícios 14 e 15 compartilham `src/buscarDados.ts` e `src/__tests__/buscarDados.spec.ts`, que tem oito testes aprovados na execução final.

## Exercício 16: snapshot

A primeira execução gravou a mensagem `Olá, Maria! Bem-vindo à nossa plataforma.` em `src/__tests__/__snapshots__/mensagem.spec.ts.snap`.

Depois, a função foi alterada para incluir `Seja bem-vindo`. O teste falhou e o Jest apresentou a comparação:

```text
Snapshot: "Olá, Maria! Bem-vindo à nossa plataforma."
Received: "Olá, Maria! Seja bem-vindo à nossa plataforma."
```

A diferença entre os valores gravados é:

```diff
- "Olá, Maria! Bem-vindo à nossa plataforma."
+ "Olá, Maria! Seja bem-vindo à nossa plataforma."
```

O [diff completo dos arquivos de snapshot](relatorios/exercicios-9-a-17/16-snapshot-diff-unificado.txt) registra a alteração na entrada exportada. A [saída da falha no Jest](relatorios/exercicios-9-a-17/16-snapshot-diff.txt) preserva o resultado da comparação com a versão anterior.

A mudança de texto foi mantida, e `npm test -- mensagem --runInBand -u` atualizou o snapshot. A execução final compara a mensagem atual com essa referência atualizada e passa.

### Respostas

1. O snapshot compara a saída com uma referência salva em arquivo e mostra a diferença quando ela muda. Não verifica uma regra adicional que `toBe` seria incapaz de verificar: neste exemplo, um `toBe` com o texto completo também detectaria a mudança. A diferença é que o snapshot guarda e gerencia a referência fora do teste, o que é útil para saídas maiores e estáveis.
2. O arquivo `.snap` precisa ser versionado com o teste para que todas as máquinas e revisões usem a mesma saída esperada.
3. Usar `-u` sem revisar a mudança pode aceitar um defeito como novo comportamento correto, eliminando o alerta do teste.

Snapshots são adequados para textos e estruturas estáveis. Valores aleatórios, datas e horários variáveis tornam a comparação instável. Regras de negócio devem ter resultados esperados explícitos nos testes.

Evidências: [snapshot inicial](relatorios/exercicios-9-a-17/16-snapshot-inicial.txt), [referência atualizada](src/__tests__/__snapshots__/mensagem.spec.ts.snap) e [execução da atualização](relatorios/exercicios-9-a-17/16-snapshot-atualizado.txt).

## Exercício 17: mock de função

`criarEnviarEmail` recebe `apiEnviar` e devolve a função `enviarEmail`. A função repassa o email do usuário e o assunto `Bem-vindo!` à dependência. O retorno ou a rejeição da API é propagado ao chamador.

| Cenário | Verificação |
|---|---|
| Envio bem-sucedido | `mockReturnValue(true)`, chamada registrada, email e assunto corretos e retorno verdadeiro. |
| Chamada única | `toHaveBeenCalledTimes(1)`. |
| Dois usuários | `toHaveBeenNthCalledWith` confere o destinatário e o assunto de cada chamada. |
| Falha no envio | `mockRejectedValue` e `await expect(...).rejects.toThrow` verificam a propagação da falha. |
| Sucesso assíncrono | `mockResolvedValue(true)` e `await` verificam o retorno resolvido. |

Cada teste cria suas próprias funções simuladas. O `beforeEach` chama `jest.clearAllMocks()` para limpar o histórico de chamadas. Todos os envios são simulados.

### Respostas

1. Verificar o retorno confirma o resultado recebido por quem chamou a função. Verificar as chamadas confirma se a dependência foi acionada com os argumentos e a quantidade esperados.
2. Receber `apiEnviar` como parâmetro permite substituir a dependência por um mock, sem precisar configurar ou acessar um serviço externo.
3. O mock não garante que o serviço real aceita os dados, que a autenticação funciona ou que o envio é aceito pela API. Um teste de integração com esse serviço pode verificar a comunicação real.

## Resultado final dos exercícios 9 a 17

| Verificação | Resultado |
|---|---|
| Suítes | 13 aprovadas. |
| Testes | 75 aprovados. |
| Snapshots | Um aprovado. |
| Instruções, ramos, funções e linhas | 100% de cobertura nos arquivos incluídos. |
| Ordem aleatória da suíte completa | Aprovada com seed 20261111. |
| Ordem aleatória do contador | Aprovada com seed 42 e ordem diferente da original. |
| Compilação TypeScript | Aprovada com `npm run build`. |

Todos os testes finais contêm asserções e usam nomes descritivos. As versões com falhas propositais foram corrigidas após o registro dos resultados. Os relatórios dos exercícios anteriores foram preservados; a cobertura atual é gerada em `relatorios/exercicios-9-a-17/cobertura`, conforme `jest.config.js`, mantendo o piso de 80% de instruções, funções e linhas e 70% de ramos.

- [Saída da suíte completa](relatorios/exercicios-9-a-17/suite-completa.txt).
- [Execução aleatória com cobertura](relatorios/exercicios-9-a-17/suite-aleatoria-e-cobertura.txt).
