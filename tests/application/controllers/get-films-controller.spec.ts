import { GetFilmsController } from "@/application/controllers";
import { GetFilmsStub } from "@/tests/application/mocks";

const makeSut = () => {
  const getFilmsStub = new GetFilmsStub();
  const sut = new GetFilmsController(getFilmsStub);

  return {
    sut,
    getFilmsStub,
  };
};

describe("GetFilms Controller", () => {
  test("Should call getFilms use case", async () => {
    const { sut, getFilmsStub } = makeSut();
    const executeSpy = jest.spyOn(getFilmsStub, "execute");
    await sut.handle();

    expect(executeSpy).toBeCalled();
  });

  test("Should return serverError if getFilms throws", async () => {
    const { sut, getFilmsStub } = makeSut();
    const error = new Error("getFilms throws");
    jest.spyOn(getFilmsStub, "execute").mockRejectedValueOnce(error);
    const result = await sut.handle();

    expect(result).toMatchObject({
      statusCode: 500,
      data: {
        message: "getFilms throws",
      },
    });
  });

  test("Should return success with data on success", async () => {
    const { sut } = makeSut();
    const result = await sut.handle();

    expect(result).toMatchObject({
      statusCode: 200,
      data: [
        {
          id: "any_id_1",
          title: "any_title_1",
          description: "any_description_1",
          director: "any_director_1",
          producer: "any_producer_1",
        },
        {
          id: "any_id_2",
          title: "any_title_2",
          description: "any_description_2",
          director: "any_director_2",
          producer: "any_producer_2",
        },
      ],
    });
  });
});
