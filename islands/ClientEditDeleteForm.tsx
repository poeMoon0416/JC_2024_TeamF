import { Client } from "./../utils/Client.ts";

interface ClientEditDeleteFormProps {
    clients: Client[];
    hasError: boolean;
    isPost: boolean;
}

export default function ClientEditDeleteForm(
    {
        clients,
        hasError,
        isPost,
    }: ClientEditDeleteFormProps,
) {
    return (
        <>
            <ul>
                <h2 class="font-bold">顧客情報 検索結果</h2>
                {isPost && (
                    <p
                        class={hasError ? "text-red-500" : "text-green-500"}
                    >
                        {hasError
                            ? "更新・削除できませんでした。"
                            : "正常に更新・削除できました。"}
                    </p>
                )}
                <li class="flex flex-row flex-wrap *:p-2">
                    <p>顧客ID</p>
                    <p>苗字(かな)</p>
                    <p>氏名(かな)</p>
                    <p>苗字</p>
                    <p>氏名</p>
                    <p>電話番号</p>
                    <p>誕生日</p>
                    <p>住所</p>
                </li>
                {clients.map((client: Client) => (
                    <li class="flex flex-row flex-wrap *:p-2">
                        <div class="example2">
                            <form
                                id="clientEditForm"
                                action="/login/client-search"
                                method="POST"
                            >
                                <input
                                    type="hidden"
                                    name="method"
                                    value="PUT"
                                />
                                <button type="submit">
                                    更新
                                </button>
                                <form
                                    id="clientDeleteForm"
                                    action="/login/client-search"
                                    method="POST"
                                >
                                    <button type="submit">
                                        削除
                                    </button>
                                    <input
                                        type="hidden"
                                        name="method"
                                        value="DELETE"
                                    />
                                    <input
                                        type="hidden"
                                        id="name"
                                        name="id"
                                        placeholder="idが存在しません"
                                        value={client.id}
                                        required
                                    />
                                </form>
                                <input
                                    type="text"
                                    id="name"
                                    name="id"
                                    placeholder="idが存在しません"
                                    value={client.id}
                                    required
                                />
                                <input
                                    type="text"
                                    id="name"
                                    name="lastNameHiragana"
                                    placeholder="苗字(かな)が存在しません"
                                    value={client.lastNameHiragana}
                                    required
                                />
                                <input
                                    type="text"
                                    id="name"
                                    name="firstNameHiragana"
                                    placeholder="名前(かな)が存在しません"
                                    value={client.firstNameHiragana}
                                    required
                                />
                                <input
                                    type="text"
                                    id="name"
                                    name="lastName"
                                    placeholder="苗字が存在しません"
                                    value={client.lastName}
                                    required
                                />
                                <input
                                    type="text"
                                    id="name"
                                    name="firstName"
                                    placeholder="名前が存在しません"
                                    value={client.firstName}
                                    required
                                />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="tel"
                                    placeholder="電話番号が存在しません"
                                    value={client.tel}
                                    required
                                />
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    placeholder="誕生日が存在しません"
                                    value={String(client.birthday)}
                                    required
                                />
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="住所"
                                    value={client.address}
                                    required
                                />
                            </form>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
